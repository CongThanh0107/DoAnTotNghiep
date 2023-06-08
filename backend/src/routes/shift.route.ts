import express from 'express';
import ShiftController from '../controllers/manager/shift.controller';

const router = express.Router();

const shiftController = new ShiftController();

router.get('/', shiftController.getAllShifts);

router.post('/', shiftController.createShift);

export default router;