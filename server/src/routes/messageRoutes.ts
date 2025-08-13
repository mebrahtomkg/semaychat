import express from 'express';
import { sendFile, list, readFile } from '../controllers/messageController';
import multer from 'multer';
import { TEMP_FILES_STORAGE_DIR } from '@/config/storage';

const router = express.Router();

router.get('/:partnerId', list);
router.get('/file/:messageId', readFile);
// router.get('/file-download/:id', ...implement it with readfile with downlod query);

const upload = multer({ dest: TEMP_FILES_STORAGE_DIR });
router.post('/file', upload.single('attachment'), sendFile);

export default router;
