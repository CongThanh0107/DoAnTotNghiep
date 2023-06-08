import Joi from 'joi';

export default class LeaveValidate {
    async validate(data: object | any): Promise<string | null> {
        const schema = Joi.object({
            leave_type_id: Joi.string().required(),
            start_date: Joi.string().required(),
            end_date: Joi.string().required(),
            description: Joi.string().required(),
        });
        const { error } = schema.validate(data);
        if (error) {
            return error.details[0].message;
        }
        return null;
    }
}