import Joi from 'joi';

export default class DepartmentValidate {
	async validate(data: object | any): Promise<string | null> {
		const schema = Joi.object({
			name: Joi.string().required(),
			location: Joi.string().required(),
			manager: Joi.string().required(),
			number_of_employees: Joi.number().min(10).required(),
			image: Joi.string().required(),
			description: Joi.string().required()
		});
		const {error} = schema.validate(data);
		if (error) {
			return error.details[0].message;
		}
		return null;
	}
}