import express from 'express';
import ImageController from '../controllers/image.controller';

const router = express.Router();

const imageController = new ImageController();

router.post('/upload', imageController.upload);

export default router;