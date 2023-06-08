import express from 'express';
import DepartmentController from '../controllers/manager/department.controller';

const router = express.Router();

const departmentController = new DepartmentController();

router.get('/', departmentController.getAllDepartments);

router.post('/', departmentController.createDepartment);

export default router;