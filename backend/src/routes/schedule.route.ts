import express from 'express';
import ScheduleController from '../controllers/manager/schedule.controller';

const router = express.Router();

const scheduleController = new ScheduleController();

router.get('/', scheduleController.getAllSchedules);

router.post('/', scheduleController.createSchedule);

router.put('/:id', scheduleController.updateSchedule);

router.delete('/:id', scheduleController.deleteSchedule);

export default router;