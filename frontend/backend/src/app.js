
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('./googleAuth');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();

/**
 * STATIC FILES
 */
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

/**
 * GOOGLE SESSION SETUP
 */
app.use(
  session({
    secret: 'lexis_secret_key',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

/**
 * SECURITY: TRUST PROXY
 */
app.set('trust proxy', 1);

/**
 * SECURITY: HELMET
 */
// app.use(helmet());

/**
 * AUDIT: MORGAN LOGGING
 */
app.use(morgan('combined'));

/**
 * SECURITY: CORS
 */
app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

/**
 * RATE LIMITING
 */
/*
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use(generalLimiter);

const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: 'Too many authentication attempts, please try again after an hour'
});
app.use('/api/auth', authLimiter);
*/

/**
 * GOOGLE AUTH ROUTES
 */
app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.send('Google Login Successful ✅');
  }
);

// --- EXISTING ROUTES ---
const authRoutes = require('./api/auth.routes');
const clientRoutes = require('./api/client.routes');
const appointmentRoutes = require('./api/appointment.routes');
const aiRoutes = require('./api/ai.routes');
const paymentRoutes = require('./api/payment.routes');
const googleRoutes = require('./api/google.routes');
const dashboardRoutes = require('./api/dashboard.routes');
const caseRoutes = require('./api/case.routes');
const noteRoutes = require('./api/note.routes');
const documentRoutes = require('./api/document.routes');
const consultationRoutes = require('./api/consultation.routes');

app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/google', googleRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/cases', caseRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/consultations', consultationRoutes);

// --- HEALTH CHECK ---
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Nisar Hussain Virtual Law Chamber Secure Backend is Live' 
  });
});

/**
 * ERROR HANDLER
 */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500
    }
  });
});

/**
 * START SERVER
 */
const PORT = process.env.PORT || 5000;

// Export the app so it can be used by the Vercel function in api/index.js
module.exports = app;

if (require.main === module) {
  // Only start a listening server if this file is run directly (local dev)
  const PORT = process.env.PORT || 5000;
  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();
  
  prisma.$connect().then(() => {
    console.log('✅ Database connection stable');
    app.listen(PORT, () => {
      console.log(`Server running securely on port ${PORT}`);
    });
  }).catch(err => {
    console.error('❌ Database connection failed during local start.');
    console.error(err);
  });
}