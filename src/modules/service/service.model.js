import pool from '../../config/db.js';

// Get all services
export async function getAllServices() {
  const result = await pool.query('SELECT * FROM core.services ORDER BY created_at DESC');
  return result.rows;
}

//  Create service
export async function createService({ serviceName, description, price }) {
  const query = `
    INSERT INTO core.services (service_name, description, price)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [serviceName, description, price];
  const result = await pool.query(query, values);
  return result.rows[0];
}

//  Get service by ID
export async function getServiceById(id) {
  const query = 'SELECT * FROM core.services WHERE service_id = $1';
  const result = await pool.query(query, [id]);
  return result.rows[0];
}

//  Update service
export async function updateService({ id, serviceName, description, price }) {
  const query = `
    UPDATE core.services
    SET service_name = COALESCE($1, service_name),
        description = COALESCE($2, description),
        price = COALESCE($3, price)
    WHERE service_id = $4
    RETURNING *;
  `;
  const values = [serviceName, description, price, id];
  const result = await pool.query(query, values);
  return result.rows[0];
}

// Delete service
export async function deleteService(id) {
  const query = 'DELETE FROM core.services WHERE service_id = $1 RETURNING *';
  const result = await pool.query(query, [id]);
  return result.rows[0];
}
