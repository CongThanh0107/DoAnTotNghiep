import EmployeeRepository from '../repositories/employee.repository';
import JobTitleRepository from '../repositories/jobTitle.repository';
import EmployeeMapper from '../mappers/employeee.mapper';

export default class EmployeeService {
	private employeeRepository: EmployeeRepository;
	private jobTitleRepository: JobTitleRepository;
	private employeeMapper: EmployeeMapper;

	constructor() {
		this.employeeRepository = new EmployeeRepository();
		this.jobTitleRepository = new JobTitleRepository();
		this.employeeMapper = new EmployeeMapper();
	}

	async getAllEmployees(limit: number, page: number): Promise<Array<object> | null> {
		const employees: Array<any> = await this.employeeRepository.getAll(limit, page);
		if (!employees) {
			return null;
		}
		// covert employee.job_title to jobTitleName
		for (const employee of employees) {
			const jobTitle: any = await this.jobTitleRepository.getById(employee.job_title);
			employee.job_title = jobTitle.name;
		}
		return employees;
	}

	async createEmployee(data: object): Promise<object | null> {
		const employeeData: object | any = await this.employeeMapper.map(data);
		const employee = await this.employeeRepository.create(employeeData);
		if (!employee) {
			return null;
		}
		return employeeData;
	}
}