const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
require("dotenv").config();

// Ensure the server doesn't crash if Google Auth is not configured
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_REDIRECT_URI || "/api/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails && profile.emails.length > 0
            ? profile.emails[0].value
            : null;

          if (!email) {
            return done(new Error("Google did not provide an email"), null);
          }

          const fullName = profile.displayName;

          // Sync with User model in Prisma
          const user = await prisma.user.upsert({
            where: { email },
            update: {
              fullName: fullName,
            },
            create: {
              email,
              fullName,
              passwordHash: "GOOGLE_AUTH", // Placeholder for required field
              role: "CLIENT",
            },
          });

          return done(null, user);
        } catch (error) {
          console.error("Google Auth Error:", error.message);
          return done(error, null);
        }
      }
    )
  );
} else {
  console.warn("⚠️ Google Auth: Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET. Google login disabled.");
}

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
