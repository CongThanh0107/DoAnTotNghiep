import express from 'express';
import EmployeeController from '../controllers/manager/employee.controller';

const router = express.Router();

const employeeController = new EmployeeController();

router.get('/', employeeController.getEmployees);

router.get('/:id', employeeController.getEmployee);

router.post('/', employeeController.createEmployee);

router.put('/:id', employeeController.updateEmployee);

router.delete('/:id', employeeController.deleteEmployee);

export default router;