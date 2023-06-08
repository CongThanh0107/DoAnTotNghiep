import Joi from 'joi';

export default class BenefitValidate {
	async validate(data: object | any): Promise<string | null> {
		const schema = Joi.object({
			health_insurance: Joi.string().required(),
			dental_insurance: Joi.string().required(),
			vision_insurance: Joi.string().required(),
			retirement_plan: Joi.string().required(),
			vacation_days: Joi.string().required(),
		});
		const { error } = schema.validate(data);
		if (error) {
			return error.details[0].message;
		}
		return null;
	}
}