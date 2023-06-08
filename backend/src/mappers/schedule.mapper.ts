import Schedule from '../models/schedule.model';
import uuid4 from '../utils/uuid4';

export default class ScheduleMapper {
	async map(data: object | any): Promise<Schedule> {
		return new Promise((resolve) => {
			const schedule = new Schedule();
			schedule.setId(uuid4());
			schedule.setEmployeeId(data.employee_id);
			schedule.setStartTime(data.start_time);
			schedule.setEndTime(data.end_time);
			schedule.setDepartmentId(data.department_id);
			schedule.setTextColor(data.text_color);
			resolve(schedule);
		});
	}
}