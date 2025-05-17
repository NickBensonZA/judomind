import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import { pool } from './db';
import { storage } from './storage';

declare module 'express-session' {
  interface SessionData {
    userId: string;
    username: string;
  }
}

// Configure session middleware with PostgreSQL store
export function setupSessions(app: any) {
  const PgSession = connectPgSimple(session);
  
  app.use(
    session({
      store: new PgSession({
        pool,
        tableName: 'sessions', // Use existing sessions table
      }),
      secret: process.env.SESSION_SECRET || 'judomind-session-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      },
    })
  );
}

// Authentication middleware
export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.session.userId) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
}

// Login handler
export async function login(req: Request, res: Response) {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }
  
  try {
    // Find user by username
    const user = await storage.getUserByUsername(username);
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    
    // Make sure user has a password (in case we're using migrated accounts from Replit Auth)
    if (!user.password) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    
    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    
    // Set session
    req.session.userId = user.id;
    req.session.username = user.username || '';
    
    // Return user (excluding password)
    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
}

// Register handler
export async function register(req: Request, res: Response) {
  const { username, password, email, firstName, lastName } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }
  
  try {
    // Check if username already exists
    const existingUser = await storage.getUserByUsername(username);
    
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }
    
    // Create new user
    const newUser = await storage.createUser({
      username,
      password,
      email: email || null,
      firstName: firstName || null,
      lastName: lastName || null,
      profileImageUrl: null
    });
    
    // Set session
    req.session.userId = newUser.id;
    req.session.username = newUser.username;
    
    // Return user (excluding password)
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
}

// Logout handler
export async function logout(req: Request, res: Response) {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    res.json({ message: 'Logged out successfully' });
  });
}

// Get current user
export async function getCurrentUser(req: Request, res: Response) {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  try {
    const user = await storage.getUser(req.session.userId);
    
    if (!user) {
      req.session.destroy(() => {});
      return res.status(401).json({ message: 'User not found' });
    }
    
    // Don't send password to client
    const userWithoutPassword = { ...user };
    if (userWithoutPassword.password) {
      delete userWithoutPassword.password;
    }
    
    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}