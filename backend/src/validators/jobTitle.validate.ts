import Joi from 'joi';

export default class JobTitleValidate {
	async validate(data: object | any): Promise<string | null> {
		const schema = Joi.object({
			name: Joi.string().required(),
			description: Joi.string().required(),
			salary_range: Joi.string().required(),
			benefit: Joi.string().required()
		});
		const {error} = schema.validate(data);
		if (error) {
			return error.details[0].message;
		}
		return null;
	}
}