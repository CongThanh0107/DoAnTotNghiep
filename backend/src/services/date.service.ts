import DateRepository from '../repositories/date.repository';
import DateMapper from '../mappers/date.mapper';

export default class DateService {
	private dateRepository: DateRepository;
	private dateMapper: DateMapper;

	constructor() {
		this.dateRepository = new DateRepository();
		this.dateMapper = new DateMapper();
	}

	async getAllDates(limit: number, page: number): Promise<object | null> {
		const dates = await this.dateRepository.getAll(limit, page);
		if (!dates) {
			return null;
		}
		return dates;
	}

	async createDate(data: any): Promise<object | null> {
		const dateData = await this.dateMapper.map(data);
		const date = await this.dateRepository.create(dateData);
		if (!date) {
			return null;
		}
		return dateData;
	}
}