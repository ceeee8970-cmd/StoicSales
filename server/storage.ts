import { 
  users, 
  modules, 
  lessons, 
  userProgress, 
  journalEntries, 
  journalPrompts,
  practiceScenarios,
  userRecordings,
  type UpsertUser,
  type Module,
  type InsertModule,
  type Lesson,
  type InsertLesson,
  type UserProgressType,
  type InsertUserProgress,
  type JournalEntry,
  type InsertJournalEntry,
  type JournalPrompt,
  type InsertJournalPrompt,
  type PracticeScenario,
  type InsertPracticeScenario,
  type UserRecording,
  type InsertUserRecording
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations for Replit Auth
  getUser(id: string): Promise<any | undefined>;
  upsertUser(user: UpsertUser): Promise<any>;
  
  // Module methods
  getAllModules(): Promise<Module[]>;
  getModule(id: number): Promise<Module | undefined>;
  createModule(module: InsertModule): Promise<Module>;
  
  // Lesson methods
  getLessonsByModule(moduleId: number): Promise<Lesson[]>;
  getLesson(id: number): Promise<Lesson | undefined>;
  createLesson(lesson: InsertLesson): Promise<Lesson>;
  
  // User Progress methods
  getUserProgress(userId: string): Promise<UserProgressType[]>;
  getUserModuleProgress(userId: string, moduleId: number): Promise<UserProgressType[]>;
  updateUserProgress(progress: InsertUserProgress): Promise<UserProgressType>;
  
  // Journal methods
  getJournalEntries(userId: string): Promise<JournalEntry[]>;
  getJournalEntry(id: number): Promise<JournalEntry | undefined>;
  createJournalEntry(entry: InsertJournalEntry): Promise<JournalEntry>;
  
  // Journal Prompts methods
  getAllJournalPrompts(): Promise<JournalPrompt[]>;
  getJournalPrompt(id: number): Promise<JournalPrompt | undefined>;
  createJournalPrompt(prompt: InsertJournalPrompt): Promise<JournalPrompt>;
  
  // Practice Scenario methods
  getAllPracticeScenarios(): Promise<PracticeScenario[]>;
  getPracticeScenariosByCategory(category: string): Promise<PracticeScenario[]>;
  getPracticeScenario(id: number): Promise<PracticeScenario | undefined>;
  createPracticeScenario(scenario: InsertPracticeScenario): Promise<PracticeScenario>;
  
  // User Recording methods
  getUserRecordings(userId: string): Promise<UserRecording[]>;
  getUserRecording(id: number): Promise<UserRecording | undefined>;
  createUserRecording(recording: InsertUserRecording): Promise<UserRecording>;
}

export class DatabaseStorage implements IStorage {
  // User operations for Replit Auth
  async getUser(id: string): Promise<any | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<any> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Module methods
  async getAllModules(): Promise<Module[]> {
    return await db.select().from(modules).orderBy(modules.order);
  }

  async getModule(id: number): Promise<Module | undefined> {
    const [module] = await db.select().from(modules).where(eq(modules.id, id));
    return module;
  }

  async createModule(moduleData: InsertModule): Promise<Module> {
    const [module] = await db.insert(modules).values(moduleData).returning();
    return module;
  }

  // Lesson methods
  async getLessonsByModule(moduleId: number): Promise<Lesson[]> {
    return await db
      .select()
      .from(lessons)
      .where(eq(lessons.moduleId, moduleId))
      .orderBy(lessons.order);
  }

  async getLesson(id: number): Promise<Lesson | undefined> {
    const [lesson] = await db.select().from(lessons).where(eq(lessons.id, id));
    return lesson;
  }

  async createLesson(lessonData: InsertLesson): Promise<Lesson> {
    const [lesson] = await db.insert(lessons).values({
      ...lessonData,
      assignment: lessonData.assignment || null,
      reflection: lessonData.reflection || null
    }).returning();
    return lesson;
  }

  // User Progress methods
  async getUserProgress(userId: string): Promise<UserProgressType[]> {
    return await db
      .select()
      .from(userProgress)
      .where(eq(userProgress.userId, userId));
  }

  async getUserModuleProgress(userId: string, moduleId: number): Promise<UserProgressType[]> {
    return await db
      .select()
      .from(userProgress)
      .where(eq(userProgress.userId, userId) && eq(userProgress.moduleId, moduleId));
  }

  async updateUserProgress(progressData: InsertUserProgress): Promise<UserProgressType> {
    const [progress] = await db
      .insert(userProgress)
      .values({
        ...progressData,
        completed: progressData.completed || null,
        completedAt: progressData.completed ? new Date() : null
      })
      .onConflictDoUpdate({
        target: [userProgress.userId, userProgress.moduleId, userProgress.lessonId],
        set: {
          completed: progressData.completed || null,
          completedAt: progressData.completed ? new Date() : null
        }
      })
      .returning();
    return progress;
  }

  // Journal methods
  async getJournalEntries(userId: string): Promise<JournalEntry[]> {
    return await db
      .select()
      .from(journalEntries)
      .where(eq(journalEntries.userId, parseInt(userId)))
      .orderBy(journalEntries.createdAt);
  }

  async getJournalEntry(id: number): Promise<JournalEntry | undefined> {
    const [entry] = await db.select().from(journalEntries).where(eq(journalEntries.id, id));
    return entry;
  }

  async createJournalEntry(entryData: InsertJournalEntry): Promise<JournalEntry> {
    const [entry] = await db.insert(journalEntries).values({
      ...entryData,
      createdAt: new Date(),
      promptId: entryData.promptId || null
    }).returning();
    return entry;
  }

  // Journal Prompts methods
  async getAllJournalPrompts(): Promise<JournalPrompt[]> {
    return await db.select().from(journalPrompts);
  }

  async getJournalPrompt(id: number): Promise<JournalPrompt | undefined> {
    const [prompt] = await db.select().from(journalPrompts).where(eq(journalPrompts.id, id));
    return prompt;
  }

  async createJournalPrompt(promptData: InsertJournalPrompt): Promise<JournalPrompt> {
    const [prompt] = await db.insert(journalPrompts).values(promptData).returning();
    return prompt;
  }

  // Practice Scenario methods
  async getAllPracticeScenarios(): Promise<PracticeScenario[]> {
    return await db.select().from(practiceScenarios);
  }

  async getPracticeScenariosByCategory(category: string): Promise<PracticeScenario[]> {
    return await db
      .select()
      .from(practiceScenarios)
      .where(eq(practiceScenarios.category, category));
  }

  async getPracticeScenario(id: number): Promise<PracticeScenario | undefined> {
    const [scenario] = await db.select().from(practiceScenarios).where(eq(practiceScenarios.id, id));
    return scenario;
  }

  async createPracticeScenario(scenarioData: InsertPracticeScenario): Promise<PracticeScenario> {
    const [scenario] = await db.insert(practiceScenarios).values({
      ...scenarioData,
      exampleResponses: scenarioData.exampleResponses || null
    }).returning();
    return scenario;
  }

  // User Recording methods
  async getUserRecordings(userId: string): Promise<UserRecording[]> {
    return await db
      .select()
      .from(userRecordings)
      .where(eq(userRecordings.userId, parseInt(userId)))
      .orderBy(userRecordings.createdAt);
  }

  async getUserRecording(id: number): Promise<UserRecording | undefined> {
    const [recording] = await db.select().from(userRecordings).where(eq(userRecordings.id, id));
    return recording;
  }

  async createUserRecording(recordingData: InsertUserRecording): Promise<UserRecording> {
    const [recording] = await db.insert(userRecordings).values({
      ...recordingData,
      createdAt: new Date(),
      duration: recordingData.duration || null
    }).returning();
    return recording;
  }
}

export const storage = new DatabaseStorage();