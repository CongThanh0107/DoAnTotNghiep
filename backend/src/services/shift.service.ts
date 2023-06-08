import ShiftRepository from '../repositories/shift.repository';
import ShiftMapper from '../mappers/shift.mapper';

export default class ShiftService {
    private shiftRepository: ShiftRepository;
    private shiftMapper: ShiftMapper;

    constructor() {
        this.shiftRepository = new ShiftRepository();
        this.shiftMapper = new ShiftMapper();
    }

    getAllShifts = async (limit: number, page: number): Promise<object | null> => {
        const shifts = await this.shiftRepository.getAll(limit, page);
        if (!shifts) {
            return null;
        }
        return shifts;
    }

    createShift = async (data: object): Promise<object | null> => {
        const shiftData = await this.shiftMapper.map(data);
        const shift = await this.shiftRepository.create(shiftData);

        if (!shift) {
            return null;
        }

        return shift;
    }
}