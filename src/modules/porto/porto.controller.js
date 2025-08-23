import fs from "fs";
import { getAllPortfolios, getPortfolioById, createPortfolio, updatePortfolio, deletePortfolio } from "./porto.model.js";

// GET all
export async function getPortfolios(req, res) {
  try {
    const data = await getAllPortfolios();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
}

// GET by ID
export async function getPortfolio(req, res) {
  try {
    const data = await getPortfolioById(req.params.id);
    if (!data) return res.status(404).json({ message: "Portfolio not found" });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
}

// CREATE
export async function createPorto(req, res) {
  try {
    const { owner_type, owner_id, website_name, website_url, description } = req.body;
    const certificate = req.file ? req.file.filename : null; // ✅ cek file dulu
    const newItem = await createPortfolio({ owner_type, owner_id, website_name, website_url, description, certificate });
    res.json(newItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
}

// UPDATE (super admin only)
export async function updatePorto(req, res) {
  try {
    const { owner_type, owner_id, website_name, website_url, description } = req.body;

    const oldItem = await getPortfolioById(req.params.id);
    if (!oldItem) return res.status(404).json({ message: "Portfolio not found" });

    let certificate = oldItem.certificate;
    if (req.file) {
      // hapus file lama kalau ada
      if (oldItem.certificate && fs.existsSync("uploads/" + oldItem.certificate)) {
        fs.unlinkSync("uploads/" + oldItem.certificate);
      }
      certificate = req.file.filename;
    }

    const updated = await updatePortfolio(req.params.id, { owner_type, owner_id, website_name, website_url, description, certificate });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
}

// DELETE (super admin only)
export async function deletePorto(req, res) {
  try {
    const item = await getPortfolioById(req.params.id);
    if (!item) return res.status(404).json({ message: "Portfolio not found" });

    // hapus file lama kalau ada
    if (item.certificate && fs.existsSync("uploads/" + item.certificate)) {
      fs.unlinkSync("uploads/" + item.certificate);
    }

    await deletePortfolio(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
}
