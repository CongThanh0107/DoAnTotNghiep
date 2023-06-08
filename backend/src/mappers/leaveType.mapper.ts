import LeaveType from "../models/leaveType.model";
import uuid4 from "../utils/uuid4";

export default class LeaveTypeMapper {
    async map(data: object|any): Promise<object | null> {
        return new Promise((resolve) => {
            const leaveType = new LeaveType();
            leaveType.setId(uuid4());
            leaveType.setName(data.name);
            leaveType.setDescription(data.description);
            resolve(leaveType);
        });
    }
}