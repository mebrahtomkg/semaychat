import express from 'express';
import { resetDb } from '@/controllers/adminController';

const router = express.Router();

router.post('/reset-db', resetDb);

export default router;
