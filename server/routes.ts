import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSessionSchema } from "@shared/schema";
import { ZodError } from "zod";
import { 
  setupSessions, 
  isAuthenticated, 
  login, 
  register, 
  logout, 
  getCurrentUser 
} from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up session handling
  setupSessions(app);

  // Auth routes
  app.post('/api/auth/login', login);
  app.post('/api/auth/register', register);
  app.post('/api/auth/logout', logout);
  app.get('/api/auth/user', getCurrentUser);

  // Initialize affirmations if needed
  await (storage as any).initializeAffirmations();

  // Get all affirmations (public route)
  app.get("/api/affirmations", async (req, res) => {
    try {
      const affirmations = await storage.getAffirmations();
      res.json(affirmations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch affirmations" });
    }
  });

  // Get affirmations by category (public route)
  app.get("/api/affirmations/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const affirmations = await storage.getAffirmationsByCategory(category);
      res.json(affirmations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch affirmations" });
    }
  });

  // Get current user's sessions (protected route)
  app.get("/api/my/sessions", isAuthenticated, async (req, res) => {
    try {
      const userId = req.session.userId!;
      const sessions = await storage.getSessionsByUserId(userId);
      res.json(sessions);
    } catch (error) {
      console.error("Error fetching user sessions:", error);
      res.status(500).json({ message: "Failed to fetch sessions" });
    }
  });

  // Get all sessions (admin route - can be restricted further)
  app.get("/api/sessions", async (req, res) => {
    try {
      const sessions = await storage.getSessions();
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch sessions" });
    }
  });

  // Create new session (protected route)
  app.post("/api/sessions", isAuthenticated, async (req, res) => {
    try {
      const userId = req.session.userId;
      const sessionData = insertSessionSchema.parse({
        ...req.body,
        userId
      });
      
      const session = await storage.createSession(sessionData);
      res.status(201).json(session);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid session data", errors: error.errors });
      } else {
        console.error("Error creating session:", error);
        res.status(500).json({ message: "Failed to create session" });
      }
    }
  });

  // Complete a session (protected route)
  app.patch("/api/sessions/:id/complete", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const session = await storage.completeSession(Number(id));
      
      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }
      
      res.json(session);
    } catch (error) {
      console.error("Error completing session:", error);
      res.status(500).json({ message: "Failed to complete session" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
