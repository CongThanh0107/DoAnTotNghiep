import Shift from "../models/shift.model";
import uuid4 from '../utils/uuid4';

export default class ShiftMapper {
    async map(data: object | any): Promise<Shift> {
        const shift = new Shift();
        shift.setId(uuid4());
        shift.setName(data.name);
        shift.setStartTime(data.start_time);
        shift.setEndTime(data.end_time);
        shift.setNumberOfEmployees(data.number_of_employees);
        return shift;
    }
}