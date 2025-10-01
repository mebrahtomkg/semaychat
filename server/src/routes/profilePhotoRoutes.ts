import express from 'express';
import {
  listMyPhotos,
  listUserPhotos,
  servePhotoFile,
  uploadPhoto,
  deletePhoto,
} from '@/controllers/profilePhotoController';

const router = express.Router();

router.post('/me', uploadPhoto);

router.get('/me', listMyPhotos);
router.delete('/me/:photoId', deletePhoto);

router.get('/file/:photoName', servePhotoFile);
router.get('/user/:userId', listUserPhotos);

export default router;
