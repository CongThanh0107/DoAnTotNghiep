import User from '../models/user.model';
import uuid4 from '../utils/uuid4';
import {hashPassword} from '../helpers/password';

export default class RegisterMapper {
	async map(data: object | any): Promise<User> {
		return new Promise((resolve) => {
			const user = new User();
			user.setId(uuid4());
			user.setName(data.name);
			user.setEmail(data.email);
			user.setAvatar(data.avatar);
			user.setPassword(hashPassword(data.password));
			user.setRole(data.role);
			user.setEmployeeId(data.employee_id);
			resolve(user);
		});
	}
}