import express from 'express';
import {
  sendFile,
  listChatMessages,
  readFile,
} from '@/controllers/messageController';

const router = express.Router();

router.get('/:chatPartnerId', listChatMessages);
router.get('/file/:fileName', readFile);
// router.get('/file-download/:id', ...implement it with readfile with downlod query);

router.post('/file', sendFile);

export default router;
