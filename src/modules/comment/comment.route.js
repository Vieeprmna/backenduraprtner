import express from 'express';
import { CommentController } from './comment.controller.js';

const router = express.Router();

router.get('/comments',CommentController.getComments);
router.post('/comments', CommentController.addComment);
router.delete('/comments/:id', CommentController.deleteComment);

//likess
router.post('/comments/:id/like', CommentController.likeComment);

export default router;
