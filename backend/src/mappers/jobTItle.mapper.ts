import JobTitle from '../models/jobTitle.model';
import uuid4 from '../utils/uuid4';

export default class JobTitleMapper {
	async map(data: object | any): Promise<JobTitle> {
		return new Promise((resolve) => {
			const jobTitle = new JobTitle();
			jobTitle.setId(uuid4());
			jobTitle.setName(data.name);
			jobTitle.setDescription(data.description);
			jobTitle.setSalaryRange(data.salary_range);
			jobTitle.setBenefit(data.benefit);
			resolve(jobTitle);
		});
	}
}