import pool from "../../config/db.js";

// GET all portfolios
export async function getAllPortfolios() {
  const res = await pool.query("SELECT * FROM core.portfolios ORDER BY created_at DESC");
  return res.rows;
}

// GET portfolio by ID
export async function getPortfolioById(id) {
  const res = await pool.query("SELECT * FROM core.portfolios WHERE portfolio_id = $1", [id]);
  return res.rows[0];
}

// CREATE portfolio
export async function createPortfolio({ owner_type, owner_id, website_name, website_url, description, certificate }) {
  const res = await pool.query(
    `INSERT INTO core.portfolios (owner_type, owner_id, website_name, website_url, description, certificate)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [owner_type, owner_id, website_name, website_url, description, certificate]
  );
  return res.rows[0];
}

// UPDATE portfolio
export async function updatePortfolio(id, { owner_type, owner_id, website_name, website_url, description, certificate }) {
  const res = await pool.query(
    `UPDATE core.portfolios SET 
      owner_type=$1, owner_id=$2, website_name=$3, website_url=$4, description=$5, certificate=$6
      WHERE portfolio_id=$7 RETURNING *`,
    [owner_type, owner_id, website_name, website_url, description, certificate, id]
  );
  return res.rows[0];
}

// DELETE portfolio
export async function deletePortfolio(id) {
  await pool.query("DELETE FROM core.portfolios WHERE portfolio_id=$1", [id]);
}
