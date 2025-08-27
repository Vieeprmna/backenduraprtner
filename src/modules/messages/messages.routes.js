import express from 'express';
import { MessagesController } from './messages.controller.js'; // perhatiin nama

const router = express.Router();

router.get('/messages', MessagesController.getMessage);
router.post('/messages', MessagesController.postMessage);
router.delete('/messages/:id', MessagesController.deleteMessage);

export default router;
