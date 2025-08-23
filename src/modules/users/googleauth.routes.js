import express from "express";
import passport from "./auth.google.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Login pakai Google
router.get("/auth/google",
  passport.authenticate("google", { 
    scope: ["profile", "email"], 
    session: false 
  })
);

// Callback setelah login
router.get("/auth/google/callback",
  passport.authenticate("google", { 
    failureRedirect: "/login",
    session: false 
  }),
  (req, res) => {
    // Pastikan req.user ada
    if (!req.user) {
      return res.status(401).json({ message: "Autentikasi gagal" });
    }

    const token = jwt.sign(
      { userId: req.user.user_id, role: req.user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login Google berhasil", token });
  }
);

export default router;
