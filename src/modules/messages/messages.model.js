import pool from "../../config/db.js";

// get all message 
export async function getAllMessage () {
    const res = await pool.query("SELECT * FROM engagement.messages ORDER BY created_at DESC");
    return res.rows;
}

//post message 
export async function postMessage (nama, email , message) {
    const res = await pool.query (
        `INSERT INTO engagement.messages (nama, email, message, created_at)
         VALUES ($1, $2, $3, NOW())
         RETURNING *`,
         [nama, email, message]
    )
}