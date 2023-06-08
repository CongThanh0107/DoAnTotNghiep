import Date from '../models/date.model';
import uuid4 from '../utils/uuid4';

export default class DateMapper {
	async map(data: object | any): Promise<Date> {
		return new Promise((resolve) => {
			const date = new Date();
			date.setId(uuid4());
			date.setDate(data.date);
			date.setStartTime(data.start_time);
			date.setEndTime(data.end_time);
			date.setType(data.type);
			resolve(date);
		});
	}
}