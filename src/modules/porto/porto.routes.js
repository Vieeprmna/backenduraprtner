import express from "express";
import multer from "multer";
import { getPortfolios, getPortfolio, createPorto, updatePorto, deletePorto } from "./porto.controller.js";
import { verifySuperAdmin } from "../../middleware/auth.js";
const router = express.Router();

// multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// Public routes
router.get("/", getPortfolios);
router.get("/:id", getPortfolio);

// Routes super admin
router.post("/", verifySuperAdmin, upload.single("certificate"), createPorto);
router.put("/:id", verifySuperAdmin, upload.single("certificate"), updatePorto);
router.delete("/:id", verifySuperAdmin, deletePorto);

export default router;
