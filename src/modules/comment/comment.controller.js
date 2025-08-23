import * as CommentModel from './comment.model.js';

export const CommentController = {
    // Ambil semua komentar
    getComments: async (req, res) => {
        try {
            const comments = await CommentModel.getAllComments();
            res.json(comments);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Tambah komentar
    addComment: async (req, res) => {
        try {
            const { user_name, content, likes } = req.body;
            if (!user_name || !content) {
                return res.status(400).json({ error: 'Username and content required' });
            }

            // Tambah komentar langsung (nggak perlu user_id)
            const newComment = await CommentModel.addComment(user_name, content, likes || 0);
            res.status(201).json(newComment);

        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Hapus komentar
    deleteComment: async (req, res) => {
        try {
            const { id } = req.params;
            const deleted = await CommentModel.deleteComment(id);
            res.status(200).json({
                isSuccess: true,
                message: `Comment with id ${id} deleted`,
                deleted
            });
        } catch (err) {
            console.error(err);
            if (err.message === 'Comment not found') {
                res.status(404).json({ error: 'Comment not found' });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    },

    // Tambah 1 like ke komentar
// Tambah atau kurang like
likeComment: async (req, res) => {
    try {
        const { id } = req.params;
        const { action } = req.body; // 'like' atau 'dislike'

        let isLiked;
        if (action === "like") {
            isLiked = true;
        } else if (action === "dislike") {
            isLiked = false;
        } else {
            return res.status(400).json({
                isSuccess: false,
                message: "Action must be 'like' or 'dislike'"
            });
        }

        const updated = await CommentModel.toggleLike(id, isLiked);

        res.status(200).json({
            isSuccess: true,
            message: `Comment with id ${id} ${action}d`,
            updated
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}
};
