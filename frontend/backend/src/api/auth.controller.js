const prisma = require('../models/prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password - using 10 rounds is standard and fast enough for serverless
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create the user
    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        passwordHash,
        role: role || 'CLIENT',
      },
    });

    // Create JWT
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error('❌ CRITICAL: JWT_SECRET is missing in environment variables');
      return res.status(500).json({ message: 'Authentication configuration error (Missing JWT_SECRET)' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      secret,
      { expiresIn: '30d' }
    );

    res.status(201).json({
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('❌ Registration Error Detailed:', error);
    // Return the specific error message to the frontend for debugging
    res.status(500).json({ 
      message: 'Registration failed on server', 
      error: error.message,
      code: error.code // Prisma error codes are useful
    });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(`Attempting login for email: ${email}`);

    if (!prisma) {
      console.error('❌ Prisma client not initialized!');
      return res.status(500).json({ message: 'Database connection error' });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.log(`❌ User not found: ${email}`);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      console.log(`❌ Invalid password for: ${email}`);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error('❌ JWT_SECRET is missing in environment variables');
      return res.status(500).json({ message: 'Authentication configuration error' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      secret,
      { expiresIn: '30d' }
    );

    console.log(`✅ Login successful: ${email}`);
    res.status(200).json({
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('❌ Login Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get current user (Me)
exports.me = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
