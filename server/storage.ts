import { 
  users, 
  type User, 
  type InsertUser,
  affirmations,
  type Affirmation,
  type InsertAffirmation,
  userSessions,
  type Session,
  type InsertSession
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Affirmation methods
  getAffirmations(): Promise<Affirmation[]>;
  getAffirmationsByCategory(category: string): Promise<Affirmation[]>;
  createAffirmation(affirmation: InsertAffirmation): Promise<Affirmation>;
  
  // Session methods
  getSessions(): Promise<Session[]>;
  getSessionsByUserId(userId: string): Promise<Session[]>;
  getSessionById(id: number): Promise<Session | undefined>;
  createSession(session: InsertSession): Promise<Session>;
  completeSession(id: number): Promise<Session | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(userData: InsertUser): Promise<User> {
    // Hash the password
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    // Create a random string ID if not provided
    const id = userData.id || Math.floor(Math.random() * 10000000).toString();
    
    const [user] = await db
      .insert(users)
      .values({
        id,
        username: userData.username,
        password: hashedPassword,
        email: userData.email || null,
        firstName: userData.firstName || null,
        lastName: userData.lastName || null,
        profileImageUrl: userData.profileImageUrl || null,
      })
      .returning();
    return user;
  }
  
  async getSessionsByUserId(userId: string): Promise<Session[]> {
    try {
      return await db.select().from(userSessions).where(eq(userSessions.userId, userId));
    } catch (error) {
      console.error('Error getting sessions by user ID:', error);
      return [];
    }
  }
  
  // Affirmation methods
  async getAffirmations(): Promise<Affirmation[]> {
    return await db.select().from(affirmations);
  }
  
  async getAffirmationsByCategory(category: string): Promise<Affirmation[]> {
    return await db.select().from(affirmations).where(eq(affirmations.category, category));
  }
  
  async createAffirmation(insertAffirmation: InsertAffirmation): Promise<Affirmation> {
    const [affirmation] = await db
      .insert(affirmations)
      .values(insertAffirmation)
      .returning();
    return affirmation;
  }
  
  // Session methods
  async getSessions(): Promise<Session[]> {
    return await db.select().from(userSessions);
  }
  
  async getSessionById(id: number): Promise<Session | undefined> {
    const [session] = await db.select().from(userSessions).where(eq(userSessions.id, id));
    return session;
  }
  
  async createSession(insertSession: InsertSession): Promise<Session> {
    const [session] = await db
      .insert(userSessions)
      .values(insertSession)
      .returning();
    return session;
  }
  
  async completeSession(id: number): Promise<Session | undefined> {
    const [session] = await db
      .update(userSessions)
      .set({ completed: true })
      .where(eq(userSessions.id, id))
      .returning();
    return session;
  }
  
  // Initialize default affirmations
  async initializeAffirmations() {
    const existingAffirmations = await this.getAffirmations();
    
    // Only initialize if there are no existing affirmations
    if (existingAffirmations.length === 0) {
      // Training affirmations
      const trainingAffirmations = [
        "Each practice is an opportunity to improve my technique.",
        "I am focused on learning from every partner I train with.",
        "My mind and body work together in harmony.",
        "I embrace challenges as opportunities to grow stronger.",
        "With each ukemi (fall), I become more resilient."
      ];
      
      // Grading affirmations
      const gradingAffirmations = [
        "I have prepared thoroughly and am ready for this grading.",
        "I execute each technique with precision and confidence.",
        "I remain composed and focused throughout my demonstration.",
        "My breathing remains steady and controlled even when challenged.",
        "I have earned this opportunity through consistent practice."
      ];
      
      // Competition affirmations
      const competitionAffirmations = [
        "I am calm, confident, and ready to compete at my best.",
        "I transform nervous energy into powerful performance.",
        "I adapt quickly to my opponent's movements and find opportunities.",
        "Win or lose, I represent the principles of judo with honor.",
        "My strength lies in both my technique and my mindset."
      ];
      
      // Add all affirmations
      const allAffirmations = [
        ...trainingAffirmations.map(text => ({ text, category: "training" })),
        ...gradingAffirmations.map(text => ({ text, category: "grading" })),
        ...competitionAffirmations.map(text => ({ text, category: "competition" }))
      ];
      
      await db.insert(affirmations).values(allAffirmations);
    }
  }
}

export const storage = new DatabaseStorage();
