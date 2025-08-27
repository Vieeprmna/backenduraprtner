import pool from "../../config/db.js";

// Get all partner services
export async function getAllPartnerServices() {
  const result = await pool.query(`
    SELECT ps.partner_service_id, u.username AS partner_name, s.service_name, ps.created_at
    FROM core.partner_services ps
    JOIN core.users u ON ps.partner_id = u.user_id
    JOIN core.services s ON ps.service_id = s.service_id
    ORDER BY ps.created_at DESC
  `);
  return result.rows;
}

// Assign partner to service
export async function assignPartnerService({ partnerId, serviceId }) {
  const query = `
    INSERT INTO core.partner_services (partner_id, service_id)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const result = await pool.query(query, [partnerId, serviceId]);
  return result.rows[0];
}

// Unassign partner from service
export async function deletePartnerService(id) {
  const query = `DELETE FROM core.partner_services WHERE partner_service_id = $1 RETURNING *`;
  const result = await pool.query(query, [id]);
  return result.rows[0];
}
