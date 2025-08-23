import express from 'express';
import { verifySuperAdmin } from '../../middleware/auth.js';
import { CommentController } from './comment.controller.js';

const router = express.Router();

router.get('/comments', verifySuperAdmin ,CommentController.getComments);
router.post('/comments', CommentController.addComment);
router.delete('/comments/:id', CommentController.deleteComment);

export default router;
