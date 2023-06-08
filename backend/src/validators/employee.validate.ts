import JoiBase from 'joi';
import JoiDate from '@joi/date';

const Joi = JoiBase.extend(JoiDate);

export default class EmployeeValidate {
	async validate(data: object | any): Promise<string | null> {
		const schema = Joi.object({
			name: Joi.string().required(),
			email: Joi.string().email().required(),
			phone: Joi.string().required(),
			address: Joi.string().required(),
			job_title: Joi.string().required(),
			date_of_hire: Joi.date()
				.required(),
			date_of_birth: Joi.date()
				.required(),
			gender: Joi.string().required(),
			salary: Joi.number().required().min(0)
		});
		const {error} = schema.validate(data);
		if (error) {
			return error.details[0].message;
		}
		return null;
	}
}