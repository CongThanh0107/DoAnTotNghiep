import Joi from 'joi';

export default class RegisterValidate {
	async validate(data: object): Promise<string | null> {
		return new Promise((resolve) => {
			const schema = Joi.object({
				name: Joi.string().required(),
				email: Joi.string().email().required(),
				avatar: Joi.string().allow(null, ''),
				role: Joi.string().valid('manager', 'user').required(),
				password: Joi.string().required(),
				confirmPassword: Joi.string().required().valid(Joi.ref('password')),
				employee_id: Joi.string().required(),
			});

			const {error} = schema.validate(data);

			if (error) {
				resolve(error.details[0].message);
			}

			resolve(null);
		});
	}
}