import Joi from 'joi';

export default class ShiftValidate {
    async validate(data: any) {
        const schema = Joi.object({
            name: Joi.string().required(),
            start_time: Joi.string().required(),
            end_time: Joi.string().required(),
            number_of_employees: Joi.number().required(),
        });
        const validate = await schema.validate(data);
        if (validate.error) {
            return validate.error.details[0].message;
        }
        return null;
    }
}