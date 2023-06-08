import express from 'express';
import UserController from "../../controllers/auth/user.controller";

const router = express.Router();

const userController = new UserController();

router.get('/schedules', userController.getSchedules);

router.put('/', userController.update);

router.post('/leave', userController.createLeave);

export default router;