import UserRepository from '../repositories/user.repository';
import RegisterMapper from '../mappers/register.mapper';
import UserTransform from '../transforms/user.transform';
import {comparePassword} from '../helpers/password';
import PassportConfig from '../config/passport';


export default class UserService {
	private userRepository: UserRepository;
	private registerMapper: RegisterMapper;
	private userTransform: UserTransform;

	constructor() {
		this.userRepository = new UserRepository();
		this.registerMapper = new RegisterMapper();
		this.userTransform = new UserTransform();
	}

	async getAll(limit: number, page: number): Promise<object | null> {
		const users: object | any = await this.userRepository.getAll(limit, page);
		if (!users) {
			return null;
		}
		return this.userTransform.transformCollectionObject(users);
	}

	async getUserByEmail(email: string): Promise<object | null> {
		const user: object | any = await this.userRepository.getByEmail(email);
		if (!user) {
			return null;
		}
		return this.userTransform.transformObject(user);
	}


	async getAccount(token: string): Promise<object | null> {
		const payload: object | null | any = await PassportConfig.verifyToken(token);
		if (!payload) {
			return null;
		}
		const user: object | any = await this.userRepository.getById(payload.sub);
		if (!user) {
			return null;
		}

		this.userTransform.transformObject(user);

		return {
			user,
			accessToken: token
		};
	}

	async createUser(data: object): Promise<object | null> {
		const userData: object | any = await this.registerMapper.map(data);
		const user = await this.userRepository.create(userData);
		if (!user) {
			return null;
		}

		return this.userTransform.transform(userData);
	}

	async updateUser(id: string, data: object|any): Promise<object | null> {
		const user = await this.userRepository.update(id, data);
		console.log(id, data, "check ch")
		if (!user) {
			return null;
		}

		return user;
	}

	async login(email: string, password: string): Promise<object | null> {
		const user: object | any = await this.userRepository.getByEmail(email);
		if (!user) {
			return null;
		}
		const isPasswordMatch = comparePassword(password, user.password);
		if (!isPasswordMatch) {
			return null;
		}
		delete user.password;
		delete user.created_at;
		delete user.updated_at;
		delete user.deleted_at;

		return user;
	}
}