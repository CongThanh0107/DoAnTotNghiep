import DepartmentRepository from '../repositories/department.repository';
import DepartmentMapper from '../mappers/department.mapper';
import EmployeeRepository from '../repositories/employee.repository';

export default class DepartmentService {
	private departmentRepository: DepartmentRepository;
	private departmentMapper: DepartmentMapper;
	private employeeRepository: EmployeeRepository;

	constructor() {
		this.departmentRepository = new DepartmentRepository();
		this.departmentMapper = new DepartmentMapper();
		this.employeeRepository = new EmployeeRepository();
	}

	async getAllDepartments(limit: number, page: number): Promise<Array<object> | null> {
		const departments: Array<any> = await this.departmentRepository.getAll(limit, page);
		if (!departments) {
			return null;
		}
		// covert department.manager to managerName
		for (const department of departments) {
			const manager: any = await this.employeeRepository.getById(department.head_of_department);
			department.head_of_department = manager.name;
		}
		return departments;
	}

	async createDepartment(data: object): Promise<object | null> {
		const departmentData: object | any = await this.departmentMapper.map(data);
		console.log('DATA: ', data);
		console.log('DEPARTMENT DATA: ', departmentData);
		const department = await this.departmentRepository.create(departmentData);
		if (!department) {
			return null;
		}
		return departmentData;
	}
}