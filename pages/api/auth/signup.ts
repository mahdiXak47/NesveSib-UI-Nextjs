import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

// In a real application, you would use a database
const users: any[] = [];

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { username, password, firstName, lastName } = req.body;

    // Validate input
    if (!username || !password || !firstName || !lastName) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    if (users.find(user => user.username === username)) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // In a real application, you would hash the password
    const user = {
      username,
      password, // In production, store hashed password
      firstName,
      lastName,
    };

    // Add user to "database"
    users.push(user);

    // Create JWT token
    const token = jwt.sign(
      { username, firstName, lastName },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Return user data and token
    res.status(201).json({
      token,
      user: {
        username,
        firstName,
        lastName,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
} 