import { 
  users, 
  modules, 
  lessons, 
  userProgress, 
  journalEntries, 
  journalPrompts,
  practiceScenarios,
  userRecordings,
  type User, 
  type InsertUser,
  type Module,
  type InsertModule,
  type Lesson,
  type InsertLesson,
  type UserProgress,
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

// Interface with CRUD methods for all models
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserPoints(userId: number, points: number): Promise<User | undefined>;
  
  // Module methods
  getAllModules(): Promise<Module[]>;
  getModule(id: number): Promise<Module | undefined>;
  createModule(module: InsertModule): Promise<Module>;
  
  // Lesson methods
  getLessonsByModule(moduleId: number): Promise<Lesson[]>;
  getLesson(id: number): Promise<Lesson | undefined>;
  createLesson(lesson: InsertLesson): Promise<Lesson>;
  
  // User Progress methods
  getUserProgress(userId: number): Promise<UserProgress[]>;
  getUserModuleProgress(userId: number, moduleId: number): Promise<UserProgress[]>;
  updateUserProgress(progress: InsertUserProgress): Promise<UserProgress>;
  
  // Journal methods
  getJournalEntries(userId: number): Promise<JournalEntry[]>;
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
  getUserRecordings(userId: number): Promise<UserRecording[]>;
  getUserRecording(id: number): Promise<UserRecording | undefined>;
  createUserRecording(recording: InsertUserRecording): Promise<UserRecording>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private modules: Map<number, Module>;
  private lessons: Map<number, Lesson>;
  private userProgress: Map<number, UserProgress>;
  private journalEntries: Map<number, JournalEntry>;
  private journalPrompts: Map<number, JournalPrompt>;
  private practiceScenarios: Map<number, PracticeScenario>;
  private userRecordings: Map<number, UserRecording>;
  
  private currentIds: {
    user: number;
    module: number;
    lesson: number;
    userProgress: number;
    journalEntry: number;
    journalPrompt: number;
    practiceScenario: number;
    userRecording: number;
  };

  constructor() {
    this.users = new Map();
    this.modules = new Map();
    this.lessons = new Map();
    this.userProgress = new Map();
    this.journalEntries = new Map();
    this.journalPrompts = new Map();
    this.practiceScenarios = new Map();
    this.userRecordings = new Map();
    
    this.currentIds = {
      user: 1,
      module: 1,
      lesson: 1,
      userProgress: 1,
      journalEntry: 1,
      journalPrompt: 1,
      practiceScenario: 1,
      userRecording: 1
    };
    
    // Initialize with default data
    this.initializeData();
  }
  
  private initializeData() {
    // Initialize with sample modules and lessons from the document
    const module1: Module = {
      id: this.currentIds.module++,
      title: "Module 1: Introduction to Stoic Selling",
      description: "Understand the philosophy behind a more intentional approach to sales.",
      order: 1,
      imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=300"
    };
    
    const module2: Module = {
      id: this.currentIds.module++,
      title: "Module 2: Core Stoic Principles for Sales",
      description: "Master the four key stoic principles that transform how you approach sales conversations.",
      order: 2,
      imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=300"
    };
    
    const module3: Module = {
      id: this.currentIds.module++,
      title: "Module 3: Human-Centered Sales Techniques",
      description: "Learn to sell with presence and permission rather than pressure and persuasion.",
      order: 3,
      imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=300"
    };
    
    const module4: Module = {
      id: this.currentIds.module++,
      title: "Module 4: Mindfulness Practices",
      description: "Specific mindfulness exercises and rituals for before, during, and after sales interactions.",
      order: 4,
      imageUrl: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=300"
    };
    
    const module5: Module = {
      id: this.currentIds.module++,
      title: "Module 5: Real-World Language & Messaging",
      description: "Practical application of stoic principles in your communication and messaging.",
      order: 5,
      imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=300"
    };
    
    const module6: Module = {
      id: this.currentIds.module++,
      title: "Module 6: Stoic Journaling for Sales Professionals",
      description: "Daily reflection practices to improve your sales approach and mindset.",
      order: 6,
      imageUrl: "https://images.unsplash.com/photo-1517971071642-34a2d3ecc9cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=300"
    };
    
    this.modules.set(module1.id, module1);
    this.modules.set(module2.id, module2);
    this.modules.set(module3.id, module3);
    this.modules.set(module4.id, module4);
    this.modules.set(module5.id, module5);
    this.modules.set(module6.id, module6);
    
    // Add lessons for Module 1
    const module1Lessons = [
      {
        id: this.currentIds.lesson++,
        moduleId: module1.id,
        title: "What is The Stoic Seller?",
        content: "The Stoic Seller is a new way of approaching sales, not as manipulation, pressure, or process, but as presence, practice, and philosophy. It's about replacing anxiety with clarity, desperation with discipline, and ego with empathy. Rooted in ancient Stoic principles and refined by over a decade of real-world sales experience, this guide is for anyone who wants to sell with intention, not just ambition.\n\nThis isn't a method. It's a mindset.\n\nAfter 10+ years in sales, I've seen what happens when the system prioritizes speed over substance. Salespeople are overwhelmed, prospects feel unheard, and conversations become mechanical. It's all pressure, numbers, and playbooks, with no room for human nuance.\n\nToo often, sales feels like a performance where we're pretending to care, asking scripted questions, and pushing toward our own goals without truly understanding the other person. Even as a buyer, I often feel like I'm talking to a chatbot, not a human being.\n\nWe've drifted too far from what sales was meant to be: a human exchange based on curiosity, service, and alignment.",
        reflection: "When was the last time you had a sales conversation that felt real, not rehearsed, rushed, or rigid?\n\nWhat if that became your standard, not the exception?",
        order: 1
      },
      {
        id: this.currentIds.lesson++,
        moduleId: module1.id,
        title: "Reframing Sales: From Persuasion to Service",
        content: "This guide isn't about tricks or hacks. It's about seeing sales as an opportunity to serve, to help others make decisions that benefit them, even if the decision is \"no.\"\n\nThe Stoic Seller is:\n\n- Calm, not reactive\n- Curious, not assumptive\n- Present, not performative\n- Clear, not clever\n\nIf we can embody these principles, in our mindset, language, and presence, we can start building something that's both effective and ethical. This is sales with soul.",
        assignment: "Draw a line down the center of a page or digital document. On the left side, list 5 traditional sales behaviors or attitudes you've observed or been taught. On the right side, reframe each one through the lens of service rather than persuasion.\n\nFor example:\nTraditional: Overcome objections → Service-oriented: Explore concerns to understand if there's a genuine fit",
        order: 2
      },
      {
        id: this.currentIds.lesson++,
        moduleId: module1.id,
        title: "What to Expect",
        content: "In the following modules, we'll explore key Stoic principles that can ground your sales approach, practical techniques rooted in empathy and clarity, mindful practices to regulate your state before calls or meetings, and real-world language to use in your outreach. It's a journey of unlearning, relearning, and reconnecting to the human side of selling.\n\nOr as Epictetus wrote, \"We have two ears and one mouth so that we can listen twice as much as we speak.\"\n\nLet this be a quiet revolution, in how you sell, and how you show up.",
        reflection: "What aspects of your current sales approach feel most misaligned with how you'd like to show up as a person? What would a more authentic approach look like for you?",
        order: 3
      }
    ];
    
    // Add lessons for Module 2
    const module2Lessons = [
      {
        id: this.currentIds.lesson++,
        moduleId: module2.id,
        title: "The Dichotomy of Control",
        content: "\"Some things are up to us and some things are not.\" – Epictetus\n\nIn sales, we often obsess over what we cannot control: a prospect's budget, their decision timeline, the market, our quota. The Stoic Seller learns to let go of what is not theirs to carry, and to double down on what is: effort, attitude, preparation, clarity, and presence.",
        assignment: "Draw a line down the center of a page. On the left, list everything about your current pipeline or process that feels stressful or uncertain. On the right, next to each item, write either \"within my control\" or \"not within my control.\" Then highlight the ones you can influence, and commit to a small action on each this week.\n\nShift your energy to where it matters most. That's the Stoic way.",
        reflection: "What parts of your sales process create stress because you're trying to control what you cannot?",
        order: 1
      },
      {
        id: this.currentIds.lesson++,
        moduleId: module2.id,
        title: "Premeditatio Malorum (Pre-meditation of Evils)",
        content: "\"The wise man looks ahead and prepares.\" – Seneca\n\nSales rarely goes exactly as planned. No-shows, objections, pricing pushback, tech failures, they're all part of the game. Instead of fearing these outcomes, the Stoic Seller mentally rehearses them. Not to dwell on failure, but to build resilience.\n\nPremeditatio Malorum means picturing what could go wrong, so you're less surprised, more composed, and better prepared when it happens. This isn't negative thinking. It's strategic preparation.\n\nThe Stoics saw this as a strength, not weakness. Seneca himself would regularly reflect on potential setbacks not to become paranoid, but to maintain emotional composure and reduce the element of surprise. By rehearsing adversity in advance, he created a kind of psychological shock-absorber.\n\nIn today's terms, think of it like pre-installing an emotional buffer. You're not hoping for failure, you're preparing for how to meet it if it shows up.",
        assignment: "Before your next sales call, take two minutes to visualize three things that could go wrong, and how you'll respond with calm, clarity, and control. Write them down. For example:\n\nIf they challenge my price, I will respond: \"Totally fair question. Can I ask what you're comparing it to so I can better understand where you're coming from?\"\n\nIf they show up distracted or impatient, I will say: \"You've probably had a full day. Want to pause for a breath before we dive in?\"\n\nIf I feel nervous or thrown off, I will ground myself with a breath and silently repeat: \"Be present, not perfect.\"\n\nRepeat this practice before each call for one week. Track how you feel after each one. Notice where you stayed composed, and where there's room to adapt further.",
        reflection: "What's one recurring obstacle in your sales calls that always catches you off guard? How do you usually respond, and how would you like to respond?",
        order: 2
      }
    ];
    
    for (const lesson of module1Lessons) {
      this.lessons.set(lesson.id, lesson);
    }
    
    for (const lesson of module2Lessons) {
      this.lessons.set(lesson.id, lesson);
    }
    
    // Initialize practice scenarios
    const practiceScenarios = [
      {
        id: this.currentIds.practiceScenario++,
        title: "Scenario #1",
        type: "Price objection",
        scenario: "I appreciate the presentation, but honestly, your solution is priced way above what we were expecting to invest. Can you do better on the price?",
        exampleResponses: [
          "I understand price is an important factor. Before we discuss that, I'd like to make sure we're aligned on the value this solution would bring to your business. Can you share what specific outcomes you're hoping to achieve?",
          "That's fair feedback. Can I ask what you were expecting to invest, so I better understand your perspective?"
        ],
        category: "objections"
      },
      {
        id: this.currentIds.practiceScenario++,
        title: "Scenario #2",
        type: "Need more time",
        scenario: "This all sounds interesting, but I need to think about it and discuss with my team. Can we reconnect in a few weeks?",
        exampleResponses: [
          "Of course, I respect that you need to discuss this internally. To help make that conversation productive, what specific aspects would be most valuable to focus on with your team?",
          "I completely understand. What concerns or questions do you anticipate your team might have? Perhaps I can provide some information that would be helpful for your discussion."
        ],
        category: "objections"
      },
      {
        id: this.currentIds.practiceScenario++,
        title: "Scenario #3",
        type: "Budget objection",
        scenario: "I like what you're offering, but honestly, it's just outside our budget right now. We need to go with something more affordable.",
        exampleResponses: [
          "I appreciate your transparency about the budget constraints. Would it be helpful to explore some alternative options or packages that might better align with your current budget while still addressing your core needs?",
          "Thank you for sharing that. Budget constraints are completely understandable. Could you help me understand which aspects of the solution are most important to you? That way, we might be able to find a more tailored approach."
        ],
        category: "objections"
      },
      {
        id: this.currentIds.practiceScenario++,
        title: "Scenario #4",
        type: "Competitor comparison",
        scenario: "We're already talking to your competitor and their solution seems pretty similar but at a lower price point. Why should we go with you?",
        exampleResponses: [
          "That's a completely fair question. While I can't speak to their specific offering, I'd be curious to know which aspects of their solution you find most compelling, so I can better address how we might differ or provide additional value.",
          "I understand you're evaluating options carefully, which is exactly what you should do. Rather than making direct comparisons, I'd prefer to understand what success looks like for you, and then show you how our approach might uniquely address those needs."
        ],
        category: "objections"
      }
    ];
    
    for (const scenario of practiceScenarios) {
      this.practiceScenarios.set(scenario.id, scenario);
    }
    
    // Initialize journal prompts
    const journalPrompts = [
      {
        id: this.currentIds.journalPrompt++,
        title: "Reflect on Rejection",
        prompt: "Think about a recent rejection or 'no' you received from a prospect. How did you respond emotionally? How could the principle of Amor Fati (loving what happens) change your relationship with rejection?",
        quote: "The impediment to action advances action. What stands in the way becomes the way.",
        author: "Marcus Aurelius"
      },
      {
        id: this.currentIds.journalPrompt++,
        title: "The Dichotomy of Control",
        prompt: "List three elements of your sales process that cause you stress. For each one, identify what aspects are within your control and what aspects aren't. How could you refocus your energy on the controllable elements?",
        quote: "Make the best use of what is in your power, and take the rest as it happens.",
        author: "Epictetus"
      },
      {
        id: this.currentIds.journalPrompt++,
        title: "Premeditation of Difficulties",
        prompt: "Before your next important sales call, what are three challenging scenarios that might arise? How will you respond with composure rather than reaction?",
        quote: "He who suffers before it is necessary suffers more than is necessary.",
        author: "Seneca"
      }
    ];
    
    for (const prompt of journalPrompts) {
      this.journalPrompts.set(prompt.id, prompt);
    }
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentIds.user++;
    const now = new Date();
    const user: User = { 
      ...insertUser, 
      id, 
      points: 0, 
      level: 1, 
      createdAt: now 
    };
    this.users.set(id, user);
    return user;
  }
  
  async updateUserPoints(userId: number, points: number): Promise<User | undefined> {
    const user = await this.getUser(userId);
    if (!user) return undefined;
    
    const updatedUser = { ...user, points: user.points + points };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }
  
  // Module methods
  async getAllModules(): Promise<Module[]> {
    return Array.from(this.modules.values()).sort((a, b) => a.order - b.order);
  }
  
  async getModule(id: number): Promise<Module | undefined> {
    return this.modules.get(id);
  }
  
  async createModule(module: InsertModule): Promise<Module> {
    const id = this.currentIds.module++;
    const newModule: Module = { ...module, id };
    this.modules.set(id, newModule);
    return newModule;
  }
  
  // Lesson methods
  async getLessonsByModule(moduleId: number): Promise<Lesson[]> {
    return Array.from(this.lessons.values())
      .filter(lesson => lesson.moduleId === moduleId)
      .sort((a, b) => a.order - b.order);
  }
  
  async getLesson(id: number): Promise<Lesson | undefined> {
    return this.lessons.get(id);
  }
  
  async createLesson(lesson: InsertLesson): Promise<Lesson> {
    const id = this.currentIds.lesson++;
    const newLesson: Lesson = { ...lesson, id };
    this.lessons.set(id, newLesson);
    return newLesson;
  }
  
  // User Progress methods
  async getUserProgress(userId: number): Promise<UserProgress[]> {
    return Array.from(this.userProgress.values())
      .filter(progress => progress.userId === userId);
  }
  
  async getUserModuleProgress(userId: number, moduleId: number): Promise<UserProgress[]> {
    return Array.from(this.userProgress.values())
      .filter(progress => progress.userId === userId && progress.moduleId === moduleId);
  }
  
  async updateUserProgress(progress: InsertUserProgress): Promise<UserProgress> {
    const id = this.currentIds.userProgress++;
    const now = new Date();
    const newProgress: UserProgress = { 
      ...progress, 
      id,
      completedAt: progress.completed ? now : null 
    };
    this.userProgress.set(id, newProgress);
    return newProgress;
  }
  
  // Journal methods
  async getJournalEntries(userId: number): Promise<JournalEntry[]> {
    return Array.from(this.journalEntries.values())
      .filter(entry => entry.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  
  async getJournalEntry(id: number): Promise<JournalEntry | undefined> {
    return this.journalEntries.get(id);
  }
  
  async createJournalEntry(entry: InsertJournalEntry): Promise<JournalEntry> {
    const id = this.currentIds.journalEntry++;
    const now = new Date();
    const newEntry: JournalEntry = { ...entry, id, createdAt: now };
    this.journalEntries.set(id, newEntry);
    return newEntry;
  }
  
  // Journal Prompts methods
  async getAllJournalPrompts(): Promise<JournalPrompt[]> {
    return Array.from(this.journalPrompts.values());
  }
  
  async getJournalPrompt(id: number): Promise<JournalPrompt | undefined> {
    return this.journalPrompts.get(id);
  }
  
  async createJournalPrompt(prompt: InsertJournalPrompt): Promise<JournalPrompt> {
    const id = this.currentIds.journalPrompt++;
    const newPrompt: JournalPrompt = { ...prompt, id };
    this.journalPrompts.set(id, newPrompt);
    return newPrompt;
  }
  
  // Practice Scenario methods
  async getAllPracticeScenarios(): Promise<PracticeScenario[]> {
    return Array.from(this.practiceScenarios.values());
  }
  
  async getPracticeScenariosByCategory(category: string): Promise<PracticeScenario[]> {
    return Array.from(this.practiceScenarios.values())
      .filter(scenario => scenario.category === category);
  }
  
  async getPracticeScenario(id: number): Promise<PracticeScenario | undefined> {
    return this.practiceScenarios.get(id);
  }
  
  async createPracticeScenario(scenario: InsertPracticeScenario): Promise<PracticeScenario> {
    const id = this.currentIds.practiceScenario++;
    const newScenario: PracticeScenario = { ...scenario, id };
    this.practiceScenarios.set(id, newScenario);
    return newScenario;
  }
  
  // User Recording methods
  async getUserRecordings(userId: number): Promise<UserRecording[]> {
    return Array.from(this.userRecordings.values())
      .filter(recording => recording.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  
  async getUserRecording(id: number): Promise<UserRecording | undefined> {
    return this.userRecordings.get(id);
  }
  
  async createUserRecording(recording: InsertUserRecording): Promise<UserRecording> {
    const id = this.currentIds.userRecording++;
    const now = new Date();
    const newRecording: UserRecording = { ...recording, id, createdAt: now };
    this.userRecordings.set(id, newRecording);
    return newRecording;
  }
}

export const storage = new MemStorage();
