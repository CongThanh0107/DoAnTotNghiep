import BaseRepository from './base.repository';

export default class ScheduleRepository extends BaseRepository {
	constructor() {
		super('schedules');
	}
}