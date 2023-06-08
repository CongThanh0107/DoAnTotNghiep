import BaseController from '../base.controller';
import PassportConfig from '../../config/passport';
import LoginValidate from '../../validators/login.validate';
import UserService from '../../services/user.service';
import {LOGIN_FAIL, LOGIN_SUCCESS} from '../../constants/auth.constant';
import {SOMETHING_WENT_WRONG} from '../../constants/error.constant';
import {INTERNAL_SERVER_ERROR, SUCCESS, UNAUTHORIZED} from '../../constants/status.constant';

export default class LoginController extends BaseController {
	private userService: UserService;
	private loginValidate: LoginValidate;

	constructor() {
		super();
		this.userService = new UserService();
		this.loginValidate = new LoginValidate();
	}

	login = async (req: object | any, res: object | any) => {
		try {
			const {email, password} = req.body;
			const errors = await this.loginValidate.validate(req.body);
			if (errors) {
				return res.status(UNAUTHORIZED).json({message: errors});
			}
			const user: object | null | any = await this.userService.login(email, password);
			if (!user) {
				return res.status(UNAUTHORIZED).json({message: LOGIN_FAIL});
			}
			const token: string = await PassportConfig.generateToken(user);
			delete user.id;
			return res.status(SUCCESS).json({
				message: LOGIN_SUCCESS,
				user,
				accessToken: token
			});
		} catch (error) {
			console.log(error);
			return res.status(INTERNAL_SERVER_ERROR).json({message: SOMETHING_WENT_WRONG});
		}
	};

	account = async (req: object | any, res: object | any) => {
		try {
			const token = req.headers.authorization;
			if (!token) {
				return res.status(UNAUTHORIZED).json({message: 'No token provided'});
			}
			const user: object | null = await this.userService.getAccount(token);
			if (!user) {
				return res.status(UNAUTHORIZED).json({message: 'Unauthorized'});
			}
			req.user = user;
			return res.status(SUCCESS).json({
				user,
				accessToken: token
			});
		} catch (error) {
			console.log(error);
			return res.status(INTERNAL_SERVER_ERROR).json({message: SOMETHING_WENT_WRONG});
		}
	};
}