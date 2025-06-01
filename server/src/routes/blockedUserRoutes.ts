import express from 'express';
import {
  blockUser,
  listAll,
  unBlockUser
} from '../controllers/blockedUserController';

const router = express.Router();

router.post('/', blockUser);
router.get('/', listAll);
router.delete('/:userId', unBlockUser);

export default router;
