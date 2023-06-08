import JobTitleRepository from '../repositories/jobTitle.repository';
import JobTitleMapper from '../mappers/jobTItle.mapper';

export default class JobTitleService {
	private jobTitleRepository: JobTitleRepository;
	private jobTitleMapper: JobTitleMapper;

	constructor() {
		this.jobTitleRepository = new JobTitleRepository();
		this.jobTitleMapper = new JobTitleMapper();
	}

	async getAllJobTitles(limit: number, page: number): Promise<object[] | null> {
		const jobTitles: object[] = await this.jobTitleRepository.getAll(limit, page);
		if (!jobTitles) {
			return null;
		}
		return jobTitles;
	}

	async createJobTitle(data: object): Promise<object | null> {
		const jobTitleData: object = await this.jobTitleMapper.map(data);
		const jobTitle: object = await this.jobTitleRepository.create(jobTitleData);
		if (!jobTitle) {
			return null;
		}
		return jobTitleData;
	}
}