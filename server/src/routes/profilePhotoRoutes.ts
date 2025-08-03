import express from 'express';
import { noCacheImplementer } from '../middlewares';
import {
  listMyPhotos,
  listUserPhotos,
  servePhotoFile,
  uploadPhoto,
  deletePhoto
} from '../controllers/profilePhotoController';
import multer from 'multer';
import { TEMP_FILES_DIR } from '@/constants';

const router = express.Router();

const upload = multer({ dest: TEMP_FILES_DIR });

router.post('/me', upload.single('profilePhoto'), uploadPhoto);

router.get('/me', listMyPhotos);
router.delete('/me/:photoId', deletePhoto);

router.get('/:photoId/file', noCacheImplementer, servePhotoFile);
router.get('/user/:userId', listUserPhotos);

export default router;
