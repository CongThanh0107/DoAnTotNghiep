import ScheduleRepository from '../repositories/schedule.repository';
import EmployeeRepository from "../repositories/employee.repository";
import ScheduleMapper from '../mappers/schedule.mapper';

export default class ScheduleService {
    private scheduleRepository: ScheduleRepository;
    private scheduleMapper: ScheduleMapper;
    private employeeRepository: EmployeeRepository;

    constructor() {
        this.scheduleRepository = new ScheduleRepository();
        this.scheduleMapper = new ScheduleMapper();
        this.employeeRepository = new EmployeeRepository();
    }

    async getAllSchedules(limit: number, page: number): Promise<Array<object> | null> {
        const schedules: Array<any> = await this.scheduleRepository.getAll(limit, page);
        if (!schedules) {
            return null;
        }
        // convert schedules.employee_id to employee name
        for (let i = 0; i < schedules.length; i++) {
            const employee: object | any = await this.employeeRepository.getById(schedules[i].employee_id);
            schedules[i].employee_name = employee.name;
        }

        return schedules;
    }

    async getSchedulesByEmployeeId(employeeId: string): Promise<Array<object> | null> {
        const query = this.scheduleRepository.where('employee_id = ?', [employeeId]);
        const schedules: object | any = await query.getAll();
        if (!schedules) {
            return null;
        }

        for (let i = 0; i < schedules.length; i++) {
            const employee: object | any = await this.employeeRepository.getById(schedules[i].employee_id);
            schedules[i].employee_name = employee.name;
        }

        return schedules;
    }

    async createSchedule(data: object): Promise<object | null> {
        const scheduleData: object | any = await this.scheduleMapper.map(data);
        const schedule = await this.scheduleRepository.create(scheduleData);
        if (!schedule) {
            return null;
        }
        return scheduleData;
    }

    async updateSchedule(id: string, data: object): Promise<object | null> {
        const schedule = await this.scheduleRepository.update(id, data);
        if (!schedule) {
            return null;
        }
        return schedule;
    }

    async deleteSchedule(id: string): Promise<object | null> {
        const schedule = await this.scheduleRepository.delete(id);
        if (!schedule) {
            return null;
        }
        return schedule;
    }
}