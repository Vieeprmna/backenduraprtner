import pool from "../../config/db.js";

// Ambil semua komentar
export async function getAllComments() {
    const result = await pool.query(
        `SELECT comment_id, user_name, content, likes, created_at
         FROM engagement.comments
         ORDER BY created_at DESC`
    );
    return result.rows;
}

// Tambah komentar (cukup username, content, likes)
export async function addComment(user_name, content, likes = 0) {
    const result = await pool.query(
        `INSERT INTO engagement.comments (user_name, content, likes, created_at)
         VALUES ($1, $2, $3, NOW())
         RETURNING *`,
        [user_name, content, likes]
    );
    return result.rows[0];
}

// Hapus komentar by comment_id
export async function deleteComment(comment_id) {
    const result = await pool.query(
        `DELETE FROM engagement.comments
         WHERE comment_id = $1
         RETURNING *`,
        [comment_id]
    );

    if (result.rows.length === 0) {
        throw new Error('Comment not found');
    }

    return result.rows[0];
}

// Tambah like ke komentar
export async function toggleLike(comment_id, isLiked) {
    const change = isLiked ? 1 : -1;

    const result = await pool.query(
        `UPDATE engagement.comments
         SET likes = GREATEST(likes + $1, 0) -- biar ga minus
         WHERE comment_id = $2
         RETURNING *`,
        [change, comment_id]
    );

    if (result.rows.length === 0) {
        throw new Error("Comment not found");
    }

    return result.rows[0];
}
