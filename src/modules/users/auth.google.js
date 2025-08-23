import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { getUserByEmail, createUser } from "./users.model.js";

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value;
      let user = await getUserByEmail(email);

      if (!user) {
        const dummyPassword = await bcrypt.hash(
          Math.random().toString(36).slice(-8),
          10
        );

        user = await createUser({
          username: email,
          passwordHash: dummyPassword,
          email: email,
          role: "client",
          fullName: profile.displayName,
        });
      }

      done(null, user);
    } catch (err) {
      done(err, null);
    }
  }
));

export default passport;
