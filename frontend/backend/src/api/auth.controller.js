const prisma = require('../models/prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    // 1. Env Var Safety
    if (!process.env.JWT_SECRET) {
      console.error('❌ CRITICAL: JWT_SECRET is missing');
      return res.status(500).json({ message: 'Server configuration error: Authentication secret is missing.' });
    }

    // 2. Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'An account with this email already exists.' });
    }

    // 3. Hash the password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 4. Create the user
    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        passwordHash,
        role: role || 'CLIENT',
      },
    });

    // 5. MANDATORY: Create Client Profile (Linked to User)
    // This works for all users to ensure "No Profile Found" never occurs.
    try {
      await prisma.client.create({
        data: {
          userId: user.id,
          fullName: user.fullName,
          email: user.email,
          phone: 'Not Provided',
          caseType: 'OTHER',
          status: 'NEW',
        }
      });
      console.log(`✅ Profile created for: ${user.email}`);
    } catch (profileErr) {
      console.error('⚠️ Profile creation failed during registration:', profileErr.message);
      // We continue since the user is created, but login fallback will catch this.
    }

    // 6. Create JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.status(201).json({
      token,
      user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error('❌ Registration Error:', error);
    res.status(500).json({ 
      message: 'Registration failed due to a server error.', 
      details: error.message 
    });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'Server configuration error: Authentication secret is missing.' });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // 7. FALLBACK SAFETY: Ensure Profile exists on Login
    const existingProfile = await prisma.client.findFirst({ where: { userId: user.id } });
    
    if (!existingProfile) {
      console.log(`🔄 Creating missing profile for existing user: ${user.email}`);
      try {
        await prisma.client.create({
          data: {
            userId: user.id,
            fullName: user.fullName,
            email: user.email,
            phone: 'Not Provided',
            caseType: 'OTHER',
            status: 'NEW',
          }
        });
      } catch (err) {
        console.error('❌ Fallback profile creation failed:', err.message);
      }
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.status(200).json({
      token,
      user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error('❌ Login Error:', error);
    res.status(500).json({ message: 'Login failed due to a server error.' });
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
