import LeaveRepository from "../repositories/leave.repository";
import LeaveTypeRepository from "../repositories/leaveType.repository";
import EmployeeRepository from "../repositories/employee.repository";
import LeaveMapper from "../mappers/leave.mapper";
import EmailService from "./email.service";
import {passParamsToHTML} from "../utils/file";
import path from 'path';

export default class LeaveService {
    private leaveRepository: LeaveRepository;
    private leaveTypeRepository: LeaveTypeRepository;
    private employeeRepository: EmployeeRepository;
    private leaveMapper: LeaveMapper;
    private emailService: EmailService;

    constructor() {
        this.leaveRepository = new LeaveRepository();
        this.leaveTypeRepository = new LeaveTypeRepository();
        this.employeeRepository = new EmployeeRepository();
        this.leaveMapper = new LeaveMapper();
        this.emailService = new EmailService();
    }

    async getAllLeaves(limit: number, page: number): Promise<Array<object> | null> {
        const leaves: Array<any> = await this.leaveRepository.where('status = ?', ['pending']).getAll(limit, page);
        if (!leaves) {
            return null;
        }
        for (const leave of leaves) {
            const employee: object | any = await this.employeeRepository.getById(leave.employee_id);
            leave.employee_id = employee.name;
            const leaveType: object | any = await this.leaveTypeRepository.getById(leave.leave_type_id);
            leave.leave_type_id = leaveType.name;
        }
        return leaves;
    }

    async getLeavesByEmployeeId(employeeId: string): Promise<Array<object> | null> {
        const query = this.leaveRepository.where('employee_id = ?', [employeeId]);
        const leaves: object | any = await query.getAll();
        if (!leaves) {
            return null;
        }
        return leaves;
    }

    async createLeave(employeeId: string, data: object | any): Promise<object | null> {
        data.employee_id = employeeId;
        const leaveData: object = await this.leaveMapper.map(data);
        const leave = await this.leaveRepository.create(leaveData);
        if (!leave) {
            return null;
        }
        return leave;
    }

    async approveLeave(id: string): Promise<object | null> {
        try{
            const leaveUpdated = await this.leaveRepository.update(id, {status: 'approved'});
            console.log(leaveUpdated, "leaveUpdated")
            if (!leaveUpdated) {
                return null;
            }
        } catch (e) {
            console.log(e, "eeeee")
        }
        const leave: object | any = await this.leaveRepository.getById(id);
        const employee: object | any = await this.employeeRepository.getById(leave.employee_id);

        const params = {
            employeeName: employee.name,
            startDate: leave.start_date,
            endDate: leave.end_date,
            status: leave.status,
        }

        const html = await passParamsToHTML(path.join(__dirname, '../templates/leaveEmail.html'), params);
        await this.emailService.sendEmail(employee.email, 'Leave Approved', html);
        return leave;
    }

    async rejectLeave(id: string): Promise<object | null> {
        try {
            console.log(id, {status: "rejected"}, "kiki")
            const leaveUpdated = await this.leaveRepository.update(id, {status: "rejected"});
            if (!leaveUpdated) {
                return null;
            }
        } catch(e ){
            // console.log(e, "eeeeexx")
        }
        const leave: object | any = await this.leaveRepository.getById(id);
        const employee: object | any = await this.employeeRepository.getById(leave.employee_id);
        const params = {
            employeeName: employee.name,
            startDate: leave.start_date,
            endDate: leave.end_date,
            status: leave.status,
        }
        const html = await passParamsToHTML(path.join(__dirname, '../templates/leaveEmail.html'), params);
        await this.emailService.sendEmail(employee.email, 'Leave Rejected', html);
        return leave;
    }
}