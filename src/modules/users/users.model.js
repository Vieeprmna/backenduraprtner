import pool from '../../config/db.js';
import bcrypt from 'bcrypt';

export async function getAllUsers() {
  const result = await pool.query('SELECT * FROM core.users');
  return result.rows;
}

export async function createUser({ username, passwordHash, email, role, fullName }) {
  const query = `
    INSERT INTO core.users (username, password_hash, email, role, full_name)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const values = [username, passwordHash, email, role, fullName];
  const result = await pool.query(query, values);
  return result.rows[0];
}

export async function getUserByUsername(username) {
  const query = 'SELECT * FROM core.users WHERE username = $1';
  const result = await pool.query(query, [username]);
  return result.rows[0];
}

export async function getUserByEmail(email) {
  const query = 'SELECT * FROM core.users WHERE email = $1';
  const result = await pool.query(query, [email]);
  return result.rows[0];
}

export async function updateUserRole(id, role) {
  const result = await pool.query(
    'UPDATE core.users SET role = $1 WHERE user_id = $2 RETURNING user_id, username, email, role, full_name',
    [role, id]
  );
  return result.rows[0];
}

export async function deleteUser(id) {
  const query = 'DELETE FROM core.users WHERE user_id = $1 RETURNING user_id, username';
  const result = await pool.query(query, [id]);
  return result.rows[0];
}

export async function getUserByUsernameOrEmail(identifier) {
  const query = `
    SELECT * FROM core.users
    WHERE username = $1 OR email = $1
    LIMIT 1
  `;
  const result = await pool.query(query, [identifier]);
  return result.rows[0] || null;
}

//users changee useername and pass

export async function updateUser({ userId, username, fullName, email }) {
  const query = `
    UPDATE core.users
    SET username = COALESCE($1, username),
        full_name = COALESCE($2, full_name),
        email = COALESCE($3, email)
    WHERE user_id = $4
    RETURNING user_id, username, email, role, full_name;
  `;
  const values = [username, fullName, email, userId];
  const result = await pool.query(query, values);
  return result.rows[0];
}

export async function updateUserPassword({ userId, oldPassword, newPassword }) {
  // cek password lama dulu
  const userRes = await pool.query("SELECT password_hash FROM core.users WHERE user_id = $1", [userId]);
  const user = userRes.rows[0];
  if (!user) throw new Error("User not found");

  const match = await bcrypt.compare(oldPassword, user.password_hash);
  if (!match) throw new Error("Password lama salah");

  const newHash = await bcrypt.hash(newPassword, 10);
  const updateRes = await pool.query(
    "UPDATE core.users SET password_hash = $1 WHERE user_id = $2 RETURNING user_id, username, email, role, full_name",
    [newHash, userId]
  );
  return updateRes.rows[0];
}