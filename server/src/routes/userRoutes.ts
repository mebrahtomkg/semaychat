import express from 'express';
import {
  updateMyAccount,
  readMyAccount,
  suggestions,
  readUser
} from '../controllers/userController';

const router = express.Router();

router.get('/me', readMyAccount);
router.put('/me', updateMyAccount);
router.get('/suggestions', suggestions);
router.get('/:userId', readUser);

export default router;
