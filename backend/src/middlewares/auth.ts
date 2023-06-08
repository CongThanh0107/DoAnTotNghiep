import PassportConfig from '../config/passport';
import {UNAUTHORIZED} from '../constants/auth.constant';
import {UNAUTHORIZED as UNAUTHORIZED_STATUS} from '../constants/status.constant';

class AuthMiddleware {
	public authenticate = PassportConfig.authenticate();

	public authorize = (roles: string[]) => {
		return (req: object | any, res: object | any, next: object | any) => {
			if (roles.includes(req.user.role)) {
				return next();
			}
			return res.status(UNAUTHORIZED_STATUS).json({message: UNAUTHORIZED});
		};
	};
}

export default new AuthMiddleware();