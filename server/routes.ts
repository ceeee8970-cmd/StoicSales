import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
// import { setupAuth, isAuthenticated } from "./replitAuth";
import Stripe from "stripe";
import { storage } from "./storage";
import { createWriteStream, mkdir, existsSync } from "fs";
import { join, dirname } from "path";
import { promisify } from "util";
import multer from "multer";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { analyzeSalesResponse, transcribeAudio } from "./services/ai-analysis";
import { 
  insertUserSchema, 
  insertModuleSchema, 
  insertLessonSchema, 
  insertUserProgressSchema,
  insertJournalEntrySchema,
  insertJournalPromptSchema,
  insertPracticeScenarioSchema,
  insertUserRecordingSchema
} from "@shared/schema";

// Setup file storage for audio recordings
const upload = multer({ storage: multer.memoryStorage() });
const mkdirAsync = promisify(mkdir);

// Ensure uploads directory exists
const UPLOADS_DIR = join(process.cwd(), "uploads");
if (!existsSync(UPLOADS_DIR)) {
  mkdirAsync(UPLOADS_DIR, { recursive: true }).catch(console.error);
}

// Initialize Stripe
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export async function registerRoutes(app: Express): Promise<Server> {
  app.use((req, res, next) => next());
  // Auth middleware
  // await setupAuth(app);

  const httpServer = createServer(app);
  
  // API error handler
  const handleApiError = (err: any, res: Response) => {
    console.error("API Error:", err);
    
    if (err instanceof ZodError) {
      const validationError = fromZodError(err);
      return res.status(400).json({ 
        message: "Validation error", 
        errors: validationError.details 
      });
    }
    
    res.status(500).json({ 
      message: err.message || "Internal server error" 
    });
  };
  
  // ---------- Module Routes ----------
  
  // Auth routes
  app.get('/api/auth/user', async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Get all modules - all accessible to everyone
  app.get("/api/modules", async (req: Request, res: Response) => {
    try {
      const modules = await storage.getAllModules();
      
      // Enhance modules with basic data (no authentication needed)
      const modulesWithProgress = await Promise.all(modules.map(async module => {
        const lessons = await storage.getLessonsByModule(module.id);
        const totalLessons = lessons.length;
        
        return {
          ...module,
          status: 'available',
          progress: 0,
          isLocked: false, // All modules are accessible
          totalLessons,
          completedLessons: 0,
          isFullyAccessible: true // All modules fully accessible
        };
      }));
      
      res.json(modulesWithProgress);
    } catch (err) {
      handleApiError(err, res);
    }
  });
  
  // Get single module
  app.get("/api/modules/:id", async (req: Request, res: Response) => {
    try {
      const moduleId = parseInt(req.params.id);
      if (isNaN(moduleId)) {
        return res.status(400).json({ message: "Invalid module ID" });
      }
      
      const module = await storage.getModule(moduleId);
      if (!module) {
        return res.status(404).json({ message: "Module not found" });
      }
      
      res.json(module);
    } catch (err) {
      handleApiError(err, res);
    }
  });
  
  // Create module
  app.post("/api/modules", async (req: Request, res: Response) => {
    try {
      const moduleData = insertModuleSchema.parse(req.body);
      const newModule = await storage.createModule(moduleData);
      res.status(201).json(newModule);
    } catch (err) {
      handleApiError(err, res);
    }
  });
  
  // ---------- Lesson Routes ----------
  
  // Get all lessons for a module - all accessible to everyone
  app.get("/api/modules/:id/lessons", async (req: Request, res: Response) => {
    try {
      const moduleId = parseInt(req.params.id);
      if (isNaN(moduleId)) {
        return res.status(400).json({ message: "Invalid module ID" });
      }
      
      const module = await storage.getModule(moduleId);
      if (!module) {
        return res.status(404).json({ message: "Module not found" });
      }
      
      const lessons = await storage.getLessonsByModule(moduleId);
      // Return all lessons for everyone
      res.json(lessons);
    } catch (err) {
      handleApiError(err, res);
    }
  });
  
  // Get single lesson
  app.get("/api/lessons/:id", async (req: Request, res: Response) => {
    try {
      const lessonId = parseInt(req.params.id);
      if (isNaN(lessonId)) {
        return res.status(400).json({ message: "Invalid lesson ID" });
      }
      
      const lesson = await storage.getLesson(lessonId);
      if (!lesson) {
        return res.status(404).json({ message: "Lesson not found" });
      }
      
      res.json(lesson);
    } catch (err) {
      handleApiError(err, res);
    }
  });
  
  // Create lesson
  app.post("/api/lessons", async (req: Request, res: Response) => {
    try {
      const lessonData = insertLessonSchema.parse(req.body);
      const newLesson = await storage.createLesson(lessonData);
      res.status(201).json(newLesson);
    } catch (err) {
      handleApiError(err, res);
    }
  });
  
  // ---------- User Progress Routes ----------
  
  // Get all progress for a user
  app.get("/api/users/:userId/progress", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const progress = await storage.getUserProgress(userId);
      res.json(progress);
    } catch (err) {
      handleApiError(err, res);
    }
  });
  
  // Get user progress for a specific module
  app.get("/api/users/:userId/modules/:moduleId/progress", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      const moduleId = parseInt(req.params.moduleId);
      
      if (isNaN(userId) || isNaN(moduleId)) {
        return res.status(400).json({ message: "Invalid user ID or module ID" });
      }
      
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const module = await storage.getModule(moduleId);
      if (!module) {
        return res.status(404).json({ message: "Module not found" });
      }
      
      const progress = await storage.getUserModuleProgress(userId, moduleId);
      res.json(progress);
    } catch (err) {
      handleApiError(err, res);
    }
  });
  
  // Update user progress
  app.post("/api/progress", async (req: Request, res: Response) => {
    try {
      const progressData = insertUserProgressSchema.parse(req.body);
      const newProgress = await storage.updateUserProgress(progressData);
      
      // If completed, award points
      if (progressData.completed) {
        await storage.updateUserPoints(progressData.userId, 10);
      }
      
      res.status(201).json(newProgress);
    } catch (err) {
      handleApiError(err, res);
    }
  });
  
  // ---------- Journal Entry Routes ----------
  
  // Get all journal entries for a user
  app.get("/api/users/:userId/journal", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const entries = await storage.getJournalEntries(userId);
      res.json(entries);
    } catch (err) {
      handleApiError(err, res);
    }
  });
  
  // Get single journal entry
  app.get("/api/journal/:id", async (req: Request, res: Response) => {
    try {
      const entryId = parseInt(req.params.id);
      if (isNaN(entryId)) {
        return res.status(400).json({ message: "Invalid entry ID" });
      }
      
      const entry = await storage.getJournalEntry(entryId);
      if (!entry) {
        return res.status(404).json({ message: "Journal entry not found" });
      }
      
      res.json(entry);
    } catch (err) {
      handleApiError(err, res);
    }
  });
  
  // Create journal entry
  app.post("/api/journal", async (req: Request, res: Response) => {
    try {
      const entryData = insertJournalEntrySchema.parse(req.body);
      const newEntry = await storage.createJournalEntry(entryData);
      
      // Award points for creating a journal entry
      await storage.updateUserPoints(entryData.userId, 5);
      
      res.status(201).json(newEntry);
    } catch (err) {
      handleApiError(err, res);
    }
  });
  
  // ---------- Journal Prompt Routes ----------
  
  // Get all journal prompts
  app.get("/api/journal-prompts", async (req: Request, res: Response) => {
    try {
      const prompts = await storage.getAllJournalPrompts();
      res.json(prompts);
    } catch (err) {
      handleApiError(err, res);
    }
  });
  
  // Get single journal prompt
  app.get("/api/journal-prompts/:id", async (req: Request, res: Response) => {
    try {
      const promptId = parseInt(req.params.id);
      if (isNaN(promptId)) {
        return res.status(400).json({ message: "Invalid prompt ID" });
      }
      
      const prompt = await storage.getJournalPrompt(promptId);
      if (!prompt) {
        return res.status(404).json({ message: "Journal prompt not found" });
      }
      
      res.json(prompt);
    } catch (err) {
      handleApiError(err, res);
    }
  });
  
  // Create journal prompt
  app.post("/api/journal-prompts", async (req: Request, res: Response) => {
    try {
      const promptData = insertJournalPromptSchema.parse(req.body);
      const newPrompt = await storage.createJournalPrompt(promptData);
      res.status(201).json(newPrompt);
    } catch (err) {
      handleApiError(err, res);
    }
  });
  
  // ---------- Practice Scenario Routes ----------
  
  // Get all practice scenarios
  app.get("/api/practice-scenarios", async (req: Request, res: Response) => {
    try {
      const category = req.query.category as string | undefined;
      
      let scenarios;
      if (category) {
        scenarios = await storage.getPracticeScenariosByCategory(category);
      } else {
        scenarios = await storage.getAllPracticeScenarios();
      }
      
      res.json(scenarios);
    } catch (err) {
      handleApiError(err, res);
    }
  });
  
  // Get single practice scenario
  app.get("/api/practice-scenarios/:id", async (req: Request, res: Response) => {
    try {
      const scenarioId = parseInt(req.params.id);
      if (isNaN(scenarioId)) {
        return res.status(400).json({ message: "Invalid scenario ID" });
      }
      
      const scenario = await storage.getPracticeScenario(scenarioId);
      if (!scenario) {
        return res.status(404).json({ message: "Practice scenario not found" });
      }
      
      res.json(scenario);
    } catch (err) {
      handleApiError(err, res);
    }
  });
  
  // Create practice scenario
  app.post("/api/practice-scenarios", async (req: Request, res: Response) => {
    try {
      const scenarioData = insertPracticeScenarioSchema.parse(req.body);
      const newScenario = await storage.createPracticeScenario(scenarioData);
      res.status(201).json(newScenario);
    } catch (err) {
      handleApiError(err, res);
    }
  });
  
  // ---------- User Recording Routes ----------
  
  // Get all recordings for a user
  app.get("/api/users/:userId/recordings", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const recordings = await storage.getUserRecordings(userId);
      res.json(recordings);
    } catch (err) {
      handleApiError(err, res);
    }
  });
  
  // Get single recording
  app.get("/api/recordings/:id", async (req: Request, res: Response) => {
    try {
      const recordingId = parseInt(req.params.id);
      if (isNaN(recordingId)) {
        return res.status(400).json({ message: "Invalid recording ID" });
      }
      
      const recording = await storage.getUserRecording(recordingId);
      if (!recording) {
        return res.status(404).json({ message: "Recording not found" });
      }
      
      res.json(recording);
    } catch (err) {
      handleApiError(err, res);
    }
  });
  
  // Create recording with audio file upload
  app.post("/api/recordings", upload.single("audio"), async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No audio file provided" });
      }
      
      const { userId, scenarioId, title, duration } = req.body;
      
      if (!userId || !scenarioId || !title) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      
      // Save file to disk
      const timestamp = Date.now();
      const filename = `recording_${userId}_${timestamp}.webm`;
      const filePath = join(UPLOADS_DIR, filename);
      
      // Ensure directory exists
      await mkdirAsync(dirname(filePath), { recursive: true });
      
      // Create file stream
      const fileStream = createWriteStream(filePath);
      fileStream.write(req.file.buffer);
      fileStream.end();
      
      // Create recording entry
      const recordingData = {
        userId: parseInt(userId),
        scenarioId: parseInt(scenarioId),
        title,
        audioUrl: `/uploads/${filename}`,
        duration: duration || "0:00"
      };
      
      const validatedData = insertUserRecordingSchema.parse(recordingData);
      const newRecording = await storage.createUserRecording(validatedData);
      
      // Award points for creating a recording
      await storage.updateUserPoints(parseInt(userId), 5);
      
      res.status(201).json(newRecording);
    } catch (err) {
      handleApiError(err, res);
    }
  });
  
  // AI Analysis endpoint
  app.post("/api/analyze-recording", upload.single("audio"), async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No audio file provided" });
      }

      const { scenarioText, userTranscript } = req.body;
      
      if (!scenarioText) {
        return res.status(400).json({ message: "Scenario text is required" });
      }
      
      // Use user-provided transcript if available
      let transcript: string;
      if (userTranscript) {
        console.log("Using user-provided transcript:", userTranscript);
        transcript = userTranscript;
      } else {
        // For this demo, we use a mock transcription as fallback
        console.log("No user transcript provided, generating one");
        transcript = await transcribeAudio(req.file.buffer);
      }
      
      // Analyze the transcribed text using Claude
      const analysis = await analyzeSalesResponse(scenarioText, transcript);
      
      res.json({
        transcript,
        analysis
      });
    } catch (err: any) {
      handleApiError(err, res);
    }
  });

  // Serve static audio files
  app.use("/uploads", (req, res, next) => {
    const filePath = join(UPLOADS_DIR, req.path);
    res.sendFile(filePath, err => {
      if (err) {
        if ((err as any).code === "ENOENT") {
          return res.status(404).json({ message: "Recording file not found" });
        }
        return res.status(500).json({ message: "Error serving recording file" });
      }
    });
  });
  
  // ---------- User Routes ----------
  
  // Get user by ID
  app.get("/api/users/:id", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.id);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Don't return the password
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (err) {
      handleApiError(err, res);
    }
  });
  
  // Create user
  app.post("/api/users", async (req: Request, res: Response) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const newUser = await storage.createUser(userData);
      
      // Don't return the password
      const { password, ...userWithoutPassword } = newUser;
      res.status(201).json(userWithoutPassword);
    } catch (err) {
      handleApiError(err, res);
    }
  });
  
  // ---------- Mock Auth for Demo ----------
  
  // Simple login for demo purposes
  app.post("/api/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      
      // Check if user exists
      let user = await storage.getUserByUsername(username);
      
      // Create demo user if not exists
      if (!user) {
        user = await storage.createUser({
          username,
          password,
          displayName: username
        });
      } else {
        // Very simple password check
        if (user.password !== password) {
          return res.status(401).json({ message: "Invalid credentials" });
        }
      }
      
      // Don't return the password
      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (err) {
      handleApiError(err, res);
    }
  });
  
  // ---------- Stripe Payment Routes ----------
  
  // Create payment intent for ebook purchase
  app.post("/api/create-ebook-payment", async (req: Request, res: Response) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 1400, // $14.00 in cents
        currency: "usd",
        metadata: {
          type: "ebook_purchase",
          product: "stoic_seller_ebook"
        }
      });
      
      res.json({ 
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id
      });
    } catch (error: any) {
      console.error('Stripe payment error:', error);
      res.status(500).json({ 
        message: "Error creating payment intent: " + error.message 
      });
    }
  });
  
  // Verify payment and provide download
  app.post("/api/verify-ebook-payment", async (req: Request, res: Response) => {
    try {
      const { paymentIntentId } = req.body;
      
      if (!paymentIntentId) {
        return res.status(400).json({ message: "Payment intent ID required" });
      }
      
      // Retrieve payment intent from Stripe
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      
      if (paymentIntent.status === 'succeeded') {
        res.json({ 
          success: true, 
          message: "Payment verified. Ebook access granted.",
          canDownload: true
        });
      } else {
        res.status(400).json({ 
          success: false, 
          message: "Payment not completed" 
        });
      }
    } catch (error: any) {
      console.error('Payment verification error:', error);
      res.status(500).json({ 
        message: "Error verifying payment: " + error.message 
      });
    }
  });

  return httpServer;
}
