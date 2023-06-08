import express from "express";
import LeaveTypeController from "../controllers/manager/leaveType.controller";

const router = express.Router();

const leaveTypeController = new LeaveTypeController();

router.get('/', leaveTypeController.getAllLeaveTypes);

router.post('/', leaveTypeController.createLeaveType);

export default router;