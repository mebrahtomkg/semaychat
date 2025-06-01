import express from 'express';
import { noCacheImplementer } from '../middlewares';
import {
  listMyPhotos,
  listUserPhotos,
  servePhotoFile,
  uploadPhoto,
  deletePhoto
} from '../controllers/profilePhotoController';

const router = express.Router();

router.post('/me', uploadPhoto);
router.get('/me', listMyPhotos);
router.delete('/me/:photoId', deletePhoto);

router.get('/:photoId/file', noCacheImplementer, servePhotoFile);
router.get('/user/:userId', listUserPhotos);

export default router;
