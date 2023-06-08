import BaseRepository from './base.repository';

export default class JobTitleRepository extends BaseRepository {
	constructor() {
		super('job_titles');
	}
}