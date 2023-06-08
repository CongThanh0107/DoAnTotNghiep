import LeaveTypeRepository from "../repositories/leaveType.repository";
import LeaveTypeMapper from '../mappers/leaveType.mapper';

export default class LeaveTypeService {
    private leaveTypeRepository: LeaveTypeRepository;
    private leaveTypeMapper: LeaveTypeMapper;

    constructor() {
        this.leaveTypeRepository = new LeaveTypeRepository();
        this.leaveTypeMapper = new LeaveTypeMapper();
    }

    async getAllLeaveTypes(limit: number, page: number): Promise<Array<object> | null> {
        const leaveTypes: Array<any> = await this.leaveTypeRepository.getAll(limit, page);
        if (!leaveTypes) {
            return null;
        }
        return leaveTypes;
    }

    async getLeaveTypeById(id: string): Promise<object | null> {
        const leaveType: object | any = await this.leaveTypeRepository.getById(id);
        if (!leaveType) {
            return null;
        }
        return leaveType;
    }

    async createLeaveType(data: object): Promise<object | null> {
        const leaveTypeData: object | any = await this.leaveTypeMapper.map(data);
        const leaveType = await this.leaveTypeRepository.create(leaveTypeData);
        if (!leaveType) {
            return null;
        }
        return leaveTypeData;
    }
}