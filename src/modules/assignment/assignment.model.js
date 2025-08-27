import pool from "../../config/db.js";

// ✅ Get all assignments
export async function getAllAssignments() {
  const result = await pool.query(`
    SELECT 
      a.assignment_id, 
      u.username AS partner_name, 
      p.website_name AS portfolio_name, -- ✅ ganti portfolio_name jadi website_name
      a.role,                           -- ✅ ikutkan role
      a.assigned_at, 
      a.ended_at
    FROM core.partner_assignments a
    JOIN core.users u ON a.partner_id = u.user_id
    JOIN core.portfolios p ON a.portfolio_id = p.portfolio_id
    ORDER BY a.assigned_at DESC
  `);
  return result.rows;
}

// ✅ Assign partner to portfolio
export async function createAssignment({ partnerId, portfolioId, role }) {
  const query = `
    INSERT INTO core.partner_assignments (partner_id, portfolio_id, role)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const result = await pool.query(query, [partnerId, portfolioId, role]);
  return result.rows[0];
}

// ✅ End assignment (update ended_at)
export async function endAssignment({ id, endedAt }) {
  const query = `
    UPDATE core.partner_assignments
    SET ended_at = $1
    WHERE assignment_id = $2
    RETURNING *;
  `;
  const result = await pool.query(query, [endedAt, id]);
  return result.rows[0];
}

// ✅ Delete assignment
export async function deleteAssignment(id) {
  const query = `
    DELETE FROM core.partner_assignments 
    WHERE assignment_id = $1 
    RETURNING *;
  `;
  const result = await pool.query(query, [id]);
  return result.rows[0];
}
