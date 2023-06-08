import BaseController from '../base.controller';
import UserService from '../../services/user.service';
import RegisterValidate from '../../validators/register.validate';
import {REGISTER_FAIL, REGISTER_SUCCESS} from '../../constants/auth.constant';
import {BAD_REQUEST, CREATED} from '../../constants/status.constant';
import {SOMETHING_WENT_WRONG} from '../../constants/error.constant';
import PassportConfig from '../../config/passport';

export default class RegisterController extends BaseController {
	private registerValidate: RegisterValidate;
	private userService: UserService;

	constructor() {
		super();
		this.registerValidate = new RegisterValidate();
		this.userService = new UserService();
	}

	register = async (req: object | any, res: object | any) => {
		try {
			const data: object = req.body;
			const error: string | null = await this.registerValidate.validate(data);
			if (error) {
				return res.status(BAD_REQUEST).json({
					message: REGISTER_FAIL,
					error
				});
			}

			const user: object | null = await this.userService.createUser(data);
			if (!user) {
				return res.status(BAD_REQUEST).json({
					message: REGISTER_FAIL,
					error: SOMETHING_WENT_WRONG
				});
			}

			const token: string = await PassportConfig.generateToken(user);

			return res.status(CREATED).json({
				message: REGISTER_SUCCESS,
				user,
				accessToken: token
			});
		} catch (error) {
			console.log(error);
			return res.status(BAD_REQUEST).json({
				message: REGISTER_FAIL,
				error: SOMETHING_WENT_WRONG
			});
		}
	};
}
