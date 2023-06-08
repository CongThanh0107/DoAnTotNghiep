import BaseController from '../base.controller';
import EmployeeService from '../../services/employee.service';
import EmployeeValidate from '../../validators/employee.validate';
import {CREATE_FAIL, CREATE_SUCCESS, SOMETHING_WENT_WRONG} from '../../constants/error.constant';
import {BAD_REQUEST, INTERNAL_SERVER_ERROR, SUCCESS} from '../../constants/status.constant';

export default class EmployeeController extends BaseController {
	private employeeService: EmployeeService;
	private employeeValidate: EmployeeValidate;

	constructor() {
		super();
		this.employeeService = new EmployeeService();
		this.employeeValidate = new EmployeeValidate();
	}

	getEmployees = async (_req: object | any, res: object | any) => {
		try {
			const {limit, page} = _req.query;
			const employees: Array<object> | null = await this.employeeService.getAllEmployees(limit, page);
			if (!employees) {
				return res.status(500).json({
					message: 'Something went wrong'
				});
			}
			return res.status(200).json(employees);
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				message: 'Something went wrong'
			});
		}
	};

	getEmployee = async (_req: object | any, res: object | any) => {
		try {
			return res.status(200).json({
				message: 'Get Employee'
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				message: 'Something went wrong'
			});
		}
	};

	createEmployee = async (req: object | any, res: object | any) => {
		try {
			const data: object = req.body;
			const error = await this.employeeValidate.validate(data);
			if (error) {
				return res.status(BAD_REQUEST).json({
					message: error
				});
			}
			const employee = await this.employeeService.createEmployee(data);
			if (!employee) {
				res.status(BAD_REQUEST).json({
					message: CREATE_FAIL
				});
			}
			return res.status(SUCCESS).json({
				message: CREATE_SUCCESS,
				data: employee
			});
		} catch (error) {
			console.log(error);
			return res.status(INTERNAL_SERVER_ERROR).json({
				message: SOMETHING_WENT_WRONG
			});
		}
	};

	updateEmployee = async (_req: object | any, res: object | any) => {
		try {
			return res.status(200).json({
				message: 'Update Employee'
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				message: 'Something went wrong'
			});
		}
	};

	deleteEmployee = async (_req: object | any, res: object | any) => {
		try {
			return res.status(200).json({
				message: 'Delete Employee'
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				message: 'Something went wrong'
			});
		}
	};
}