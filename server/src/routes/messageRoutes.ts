import express from 'express';
import {
  send,
  remove,
  upload,
  update,
  list,
  readFile,
  download
} from '../controllers/messageController';

const router = express.Router();

router.post('/', send);
router.put('/', update);
router.get('/:partnerId', list);
router.delete('/:id', remove);
router.post('/file', upload);
router.get('/file/:id', readFile);
router.get('/file-download/:id', download);

export default router;
