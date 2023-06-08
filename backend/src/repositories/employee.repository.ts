import BaseRepository from './base.repository';

export default class EmployeeRepository extends BaseRepository {
	constructor() {
		super('employees');
	}
}