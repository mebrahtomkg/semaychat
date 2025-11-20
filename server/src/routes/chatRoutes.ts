import { listChats } from '@/controllers/chatController';
import express from 'express';

const router = express.Router();

router.get('/', listChats);

export default router;
