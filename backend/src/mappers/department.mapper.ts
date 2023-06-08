import Department from '../models/department.model';
import uuid4 from '../utils/uuid4';

export default class DepartmentMapper {
	async map(data: object | any): Promise<Department> {
		return new Promise((resolve) => {
			const department = new Department();
			department.setId(uuid4());
			department.setName(data.name);
			department.setDescription(data.description);
			department.setHeadOfDepartment(data.manager);
			department.setLocation(data.location);
			department.setNumberOfEmployees(data.number_of_employees);
			department.setImage(data.image);
			resolve(department);
		});
	}
}