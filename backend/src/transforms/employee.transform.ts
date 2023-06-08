import Employee from '../models/employee.model';

export default class EmployeeTransform {
	public transform(employee: Employee): object {
		return {
			id: employee.getId(),
			name: employee.getName(),
			email: employee.getEmail(),
			phone: employee.getPhone(),
			address: employee.getAddress(),
			job_title: employee.getJobTitle(),
			date_of_hire: employee.getDateOfHire(),
			date_of_birth: employee.getDateOfBirth(),
			gender: employee.getGender(),
			salary: employee.getSalary(),
			created_at: employee.getCreatedAt(),
			updated_at: employee.getUpdatedAt(),
			deleted_at: employee.getDeletedAt(),
		};
	}

	public transformCollection(employees: Employee[]): object[] {
		return employees.map(employee => this.transform(employee));
	}

	public transformObject(employee:object|any): object {
		return {
			id: employee['id'],
			name: employee['name'],
			email: employee['email'],
			phone: employee['phone'],
			address: employee['address'],
			job_title: employee['job_title'],
			date_of_hire: employee['date_of_hire'],
			date_of_birth: employee['date_of_birth'],

		};
	}

	public transformCollectionObject(employees: object[]): object[] {
		return employees.map(employee => this.transformObject(employee));
	}
}