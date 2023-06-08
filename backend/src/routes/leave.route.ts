import express from 'express';
import LeaveController from "../controllers/manager/leave.controller";

const router = express.Router();

const leaveController = new LeaveController();

router.get('/', leaveController.getAllLeaves);

router.put('/approve/:id', leaveController.approveLeave);

router.put('/reject/:id', leaveController.rejectLeave);

export default router;