import Joi from 'joi';

export default class DateValidate {
	async validate(data: any): Promise<string | null> {
		const schema = Joi.object({
			date: Joi.string().required(),
			start_time: Joi.string().required(),
			end_time: Joi.string().required(),
			type: Joi.string().required(),
		});
		const {error} = schema.validate(data);
		if (error) {
			return error.details[0].message;
		}
		return null;
	}
}