import Leave from '../models/leave.model';
import uuid4 from "../utils/uuid4";

export default class LeaveMapper {
    async map(data: object | any): Promise<object> {
        return new Promise((resolve) => {
            const leave = new Leave();
            leave.setId(uuid4());
            leave.setEmployeeId(data.employee_id);
            leave.setLeaveTypeId(data.leave_type_id);
            leave.setStartDate(data.start_date);
            leave.setEndDate(data.end_date);
            leave.setDescription(data.description);
            leave.setStatus('pending');
            resolve(leave);
        });
    }
}