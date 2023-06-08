import BaseController from '../base.controller';
import UserService from '../../services/user.service';

export default class UserController extends BaseController {
	private userService: UserService;

	constructor() {
		super();
		this.userService = new UserService();
	}

	getAll = async (req: object | any, res: object | any) => {
		try {
			const {limit, page} = req.query;
			const users = await this.userService.getAll(limit, page);
			return res.status(200).json(
				users
			);
		} catch (error) {
			console.log(error);
			return res.status(500).json({message: 'Something went wrong'});
		}
	};

	getOne = async (req: object | any, res: object | any) => {
		try {
			const {email} = req.params;
			const user = await this.userService.getUserByEmail(email);
			if (!user) {
				return res.status(404).json({message: 'User not found'});
			}
			return res.status(200).json({
				message: 'Get user success',
				user
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({message: 'Something went wrong'});
		}
	};
}