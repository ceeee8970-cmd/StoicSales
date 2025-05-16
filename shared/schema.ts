import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  displayName: text("display_name"),
  points: integer("points").default(0),
  level: integer("level").default(1),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  displayName: true,
});

// Modules
export const modules = pgTable("modules", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  order: integer("order").notNull(),
  imageUrl: text("image_url"),
});

export const insertModuleSchema = createInsertSchema(modules).pick({
  title: true,
  description: true,
  order: true,
  imageUrl: true,
});

// Lessons
export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  moduleId: integer("module_id").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  assignment: text("assignment"),
  reflection: text("reflection"),
  order: integer("order").notNull(),
});

export const insertLessonSchema = createInsertSchema(lessons).pick({
  moduleId: true,
  title: true,
  content: true,
  assignment: true,
  reflection: true,
  order: true,
});

// User Progress
export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  moduleId: integer("module_id").notNull(),
  lessonId: integer("lesson_id").notNull(),
  completed: boolean("completed").default(false),
  completedAt: timestamp("completed_at"),
});

export const insertUserProgressSchema = createInsertSchema(userProgress).pick({
  userId: true,
  moduleId: true,
  lessonId: true,
  completed: true,
});

// Journal Entries
export const journalEntries = pgTable("journal_entries", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  promptId: integer("prompt_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertJournalEntrySchema = createInsertSchema(journalEntries).pick({
  userId: true,
  title: true,
  content: true,
  promptId: true,
});

// Journal Prompts
export const journalPrompts = pgTable("journal_prompts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  prompt: text("prompt").notNull(),
  quote: text("quote").notNull(),
  author: text("author").notNull(),
});

export const insertJournalPromptSchema = createInsertSchema(journalPrompts).pick({
  title: true,
  prompt: true,
  quote: true,
  author: true,
});

// Practice Scenarios
export const practiceScenarios = pgTable("practice_scenarios", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type").notNull(),
  scenario: text("scenario").notNull(),
  exampleResponses: json("example_responses").default([]),
  category: text("category").notNull(),
});

export const insertPracticeScenarioSchema = createInsertSchema(practiceScenarios).pick({
  title: true,
  type: true,
  scenario: true,
  exampleResponses: true,
  category: true,
});

// User Recordings
export const userRecordings = pgTable("user_recordings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  scenarioId: integer("scenario_id").notNull(),
  audioUrl: text("audio_url").notNull(),
  title: text("title").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  duration: text("duration"),
});

export const insertUserRecordingSchema = createInsertSchema(userRecordings).pick({
  userId: true,
  scenarioId: true,
  audioUrl: true,
  title: true,
  duration: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertModule = z.infer<typeof insertModuleSchema>;
export type Module = typeof modules.$inferSelect;

export type InsertLesson = z.infer<typeof insertLessonSchema>;
export type Lesson = typeof lessons.$inferSelect;

export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;
export type UserProgress = typeof userProgress.$inferSelect;

export type InsertJournalEntry = z.infer<typeof insertJournalEntrySchema>;
export type JournalEntry = typeof journalEntries.$inferSelect;

export type InsertJournalPrompt = z.infer<typeof insertJournalPromptSchema>;
export type JournalPrompt = typeof journalPrompts.$inferSelect;

export type InsertPracticeScenario = z.infer<typeof insertPracticeScenarioSchema>;
export type PracticeScenario = typeof practiceScenarios.$inferSelect;

export type InsertUserRecording = z.infer<typeof insertUserRecordingSchema>;
export type UserRecording = typeof userRecordings.$inferSelect;
