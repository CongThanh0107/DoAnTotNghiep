import BaseRepository from './base.repository';

export default class UserRepository extends BaseRepository {
	constructor() {
		super('users');
	}

	async getByEmail(email: string): Promise<object | any> {
		this.where('email = ?', [email]);
		const user: object | any = await this.getOne();
		if (!user) {
			return null;
		}
		return user;
	}
}