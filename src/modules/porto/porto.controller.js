import fs from "fs";
import { success, error } from "../../utils/response.js"
import { getAllPortfolios, getPortfolioById, createPortfolio, updatePortfolio, deletePortfolio } from "./porto.model.js";

// GET all
export async function getPortfolios(req, res) {
  try {
    const data = await getAllPortfolios();
    return success(res, data, "Succesfuly get portofolio", 200)
  } catch (err) {
    console.error(err);
    return error(res, "Failed to get portofolio", 500, err.message)
  }
}

// GET by ID
export async function getPortfolio(req, res) {
  try {
    const data = await getPortfolioById(req.params.id);
    if (!data) return res.status(404).json({ message: "Portfolio not found" });
    return success(res, data, "Get porto by id is success", 200) 
  } catch (err) {
    console.error(err);
    return error(res, "Failed to get portofolio  by Id", 500, err.message)
  }
}

// CREATE
export async function createPorto(req, res) {
  try {
    const { owner_type, owner_id, website_name, website_url, description } = req.body;
    const certificate = req.file ? req.file.filename : null; // ✅ cek file dulu
    const newItem = await createPortfolio({ owner_type, owner_id, website_name, website_url, description, certificate });
    return success(res, newItem, "Successfully create portofolio", 200);
  } catch (err) {
    console.error(err);
    return error(res, "Failed to create portofolio", 500, err.message);
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
    return success(res, updated, "Successfully to update portofolio", 200)
  } catch (err) {
    console.error(err);
    return error(req, "Failed to update portofolio", 500, err.message);
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
    return success(res, "Succesfully to deleted portofolio", 200)
  } catch (err) {
    console.error(err);
    return error(res, "Failed to deleted portofolio", 500, err.message);
  }
}
