import Employee from '../models/employee.model';
import uuid4 from '../utils/uuid4';

export default class EmployeeMapper {
	async map(data: object | any): Promise<Employee> {
		return new Promise((resolve) => {
			const employee = new Employee();
			employee.setId(uuid4());
			employee.setName(data.name);
			employee.setEmail(data.email);
			employee.setPhone(data.phone);
			employee.setAddress(data.address);
			employee.setJobTitle(data.job_title);
			employee.setDateOfHire(data.date_of_hire);
			employee.setDateOfBirth(data.date_of_birth);
			employee.setGender(data.gender);
			employee.setSalary(data.salary);
			resolve(employee);
		});
	}
}