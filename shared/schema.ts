import { pgTable, text, serial, integer, boolean, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User table matching existing database (from Replit Auth setup)
export const users = pgTable("users", {
  id: varchar("id").primaryKey(),
  email: varchar("email"),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  // Add missing fields needed for our app
  username: varchar("username"),
  password: varchar("password")
});

export const insertUserSchema = z.object({
  id: z.string().optional(),
  username: z.string().min(3),
  password: z.string().min(6),
  email: z.string().email().optional().nullable(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  profileImageUrl: z.string().optional().nullable()
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Affirmations for different scenarios
export const affirmations = pgTable("affirmations", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  category: text("category").notNull(), // 'training', 'grading', or 'competition'
});

export const insertAffirmationSchema = createInsertSchema(affirmations).pick({
  text: true,
  category: true,
});

export type InsertAffirmation = z.infer<typeof insertAffirmationSchema>;
export type Affirmation = typeof affirmations.$inferSelect;

// Session tracking with user reference
export const userSessions = pgTable("user_sessions", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id),
  type: text("type").notNull(), // 'training', 'competition', 'grading', 'custom'
  name: text("name").notNull(),
  duration: integer("duration").notNull(), // in minutes
  notes: text("notes"),
  completed: boolean("completed").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertSessionSchema = createInsertSchema(userSessions).omit({
  id: true,
  createdAt: true,
});

export type InsertSession = z.infer<typeof insertSessionSchema>;
export type Session = typeof userSessions.$inferSelect;
