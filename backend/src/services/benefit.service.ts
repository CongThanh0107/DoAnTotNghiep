import BenefitRepository from '../repositories/benefit.repository';
import BenefitMapper from '../mappers/benefit.mapper';

export default class BenefitService {
	private benefitRepository: BenefitRepository;
	private benefitMapper: BenefitMapper;

	constructor() {
		this.benefitRepository = new BenefitRepository();
		this.benefitMapper = new BenefitMapper();
	}

	async getAllBenefits(queries: object | any): Promise<object[]> {
		const benefits: object[] = await this.benefitRepository.getAll(queries.limit, queries.page);
		if (!benefits) {
			return [];
		}
		return benefits;
	}

	async createBenefit(data: object): Promise<object | null> {
		const benefitData: object = await this.benefitMapper.map(data);
		const benefit: object = await this.benefitRepository.create(benefitData);
		if (!benefit) {
			return null;
		}
		return benefitData;
	}
}