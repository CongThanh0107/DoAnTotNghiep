import BaseRepository from './base.repository';

export default class DepartmentRepository extends BaseRepository {
	constructor() {
		super('departments');
	}
}