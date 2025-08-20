import express from 'express';
import { list } from '../controllers/chatController';

const router = express.Router();

router.get('/', list);

export default router;
