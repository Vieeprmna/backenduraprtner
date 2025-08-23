import { Router } from 'express';
import { getFaqHandler, chatHandler } from './chatbot.controller.js';

const router = Router();

router.get('/faq', getFaqHandler);
router.post('/api/chat', chatHandler);

export default router;
