import express from 'express';
import {
  sendText,
  remove,
  sendFile,
  update,
  list,
  readFile,
} from '../controllers/messageController';
import multer from 'multer';
import { TEMP_FILES_DIR } from '@/constants';

const router = express.Router();

router.post('/text', sendText);
router.put('/text', update);
router.get('/:partnerId', list);
router.delete('/:id', remove);
router.get('/file/:messageId', readFile);
// router.get('/file-download/:id', ...implement it with readfile with downlod query);

const upload = multer({ dest: TEMP_FILES_DIR });
router.post('/file', upload.single('attachment'), sendFile);

export default router;
