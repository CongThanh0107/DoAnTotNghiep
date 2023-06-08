import Joi from 'joi';

export default class ScheduleValidate {
	async validate(data: object | any): Promise<string | null> {
		const schema = Joi.object({
			employee_id: Joi.string().required(),
			department_id: Joi.string().required(),
			start_time: Joi.string().required(),
			end_time: Joi.string().required(),
			text_color: Joi.string().required(),
		});
		const {error} = schema.validate(data);
		if (error) {
			return error.details[0].message;
		}
		return null;
	}
}