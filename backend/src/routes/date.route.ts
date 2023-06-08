import express from 'express';
import DateController from '../controllers/manager/date.controller';

const router = express.Router();

const dateController = new DateController();

router.get('/', dateController.getAllDates);

router.post('/', dateController.createDate);

export default router;