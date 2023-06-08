import passport from 'passport';
import {ExtractJwt, Strategy as JwtStrategy} from 'passport-jwt';
import UserRepository from '../repositories/user.repository';
import {sign, verify} from '../utils/jwt';
import {app} from './vars';

class PassportConfig {
	private userRepository: UserRepository;

	constructor() {
		this.userRepository = new UserRepository();
	}

	public initialize() {
		const options = {
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: app.jwtSecret,
		};

		passport.use(
			new JwtStrategy(options, async (jwtPayload, done) => {
				try {
					const user = await this.userRepository.getById(jwtPayload.sub);

					if (!user) {
						return done(null, false);
					}
					return done(null, user);
				} catch (error) {
					return done(error, false);
				}
			})
		);

		passport.serializeUser((user: object | null | any, done) => {
			done(null, user.id);
		});

		passport.deserializeUser(async (id: string, done) => {
			try {
				const user = await this.userRepository.getById(id);
				if (!user) {
					return done(null, false);
				}
				return done(null, user);
			} catch (error) {
				return done(error, false);
			}
		});
	}

	public authenticate() {
		return passport.authenticate('jwt', {session: false});
	}

	public generateToken(user: object | any) {
		const payload = {
			sub: user.id,
			iat: Date.now(),
			exp: Date.now() + parseInt(String(app.jwtExpirationInterval), 10),
		};
		return sign(payload);
	}

	public verifyToken(token: string) {
		return verify(token.split(' ')[1].trim());
	}
}

export default new PassportConfig();
