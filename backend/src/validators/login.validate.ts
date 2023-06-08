import Joi from 'joi';

export default class LoginValidate {
	async validate(data: object): Promise<string | null> {
		return new Promise((resolve) => {
			const schema = Joi.object({
				email: Joi.string().email().required(),
				password: Joi.string().required(),
			});

			const {error} = schema.validate(data);

			if (error) {
				resolve(error.details[0].message);
			}

			resolve(null);
		});
	}
}
