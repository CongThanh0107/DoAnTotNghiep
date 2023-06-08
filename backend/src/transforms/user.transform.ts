import User from '../models/user.model';

export default class UserTransform {
	public transform(user: User): object {
		return {
			id: user.getId(),
			name: user.getName(),
			email: user.getEmail(),
			role: user.getRole(),
			created_at: user.getCreatedAt(),
			updated_at: user.getUpdatedAt(),
			deleted_at: user.getDeletedAt(),
		};
	}

	public transformCollection(users: User[]): object[] {
		return users.map(user => this.transform(user));
	}

	public transformObject(user:object|any): object {
		return {
			id: user['id'],
			name: user['name'],
			email: user['email'],
			avatar: user['avatar'],
			role: user['role'],
			createdAt: user['created_at'],
			updatedAt: user['updated_at'],
			deletedAt: user['deleted_at'],
		};
	}

	public transformCollectionObject(users: object[]): object[] {
		return users.map(user => this.transformObject(user));
	}
}