import BaseController from '../base.controller';
import {INTERNAL_SERVER_ERROR, SUCCESS} from '../../constants/status.constant';
import {SOMETHING_WENT_WRONG} from '../../constants/error.constant';
import DepartmentService from '../../services/department.service';
import DepartmentValidate from '../../validators/department.validate';

export default class DepartmentController extends BaseController {
	private departmentService: DepartmentService;
	private departmentValidate: DepartmentValidate;

	constructor() {
		super();
		this.departmentService = new DepartmentService();
		this.departmentValidate = new DepartmentValidate();
	}

	getAllDepartments = async (req: any, res: any) => {
		try {
			const {limit, page} = req.query;
			const departments: object | null = await this.departmentService.getAllDepartments(limit, page);
			if (!departments) {
				return res.status(INTERNAL_SERVER_ERROR).json({error: SOMETHING_WENT_WRONG});
			}
			return res.status(SUCCESS).json(departments);
		} catch (error) {
			console.log(error);
			return res.status(INTERNAL_SERVER_ERROR).json({message: SOMETHING_WENT_WRONG});
		}
	};

	createDepartment = async (req: any, res: any) => {
		try {
			const data: object = req.body;
			const error: string | null = await this.departmentValidate.validate(data);
			if (error) {
				return res.status(INTERNAL_SERVER_ERROR).json({error});
			}
			const department: object | null = await this.departmentService.createDepartment(data);
			if (!department) {
				return res.status(INTERNAL_SERVER_ERROR).json({error: SOMETHING_WENT_WRONG});
			}
			return res.status(SUCCESS).json({message: 'Create success', data: department});
		} catch (error) {
			console.log(error);
			return res.status(INTERNAL_SERVER_ERROR).json({message: SOMETHING_WENT_WRONG});
		}
	};
}