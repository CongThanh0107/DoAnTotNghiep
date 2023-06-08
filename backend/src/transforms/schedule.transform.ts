import Schedule from '../models/schedule.model';


export default class ScheduleTransform {
    public transform(schedule: Schedule): object {
        return {
            id: schedule.getId(),
            employee_id: schedule.getEmployeeId(),
            start_time: schedule.getStartTime(),
            end_time: schedule.getEndTime(),
            created_at: schedule.getCreatedAt(),
            updated_at: schedule.getUpdatedAt(),
            deleted_at: schedule.getDeletedAt(),
        };
    }
}