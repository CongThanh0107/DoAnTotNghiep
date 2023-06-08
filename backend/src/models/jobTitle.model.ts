import ModelAbstract from './model.abstract';

export default class JobTitle extends ModelAbstract {
	private id: string;
	private name: string;
	private description: string;
	private salary_range: string;
	private benefit: string;
	private created_at: Date;
	private updated_at: Date;
	private deleted_at: Date | null;

	constructor() {
		super();
		this.id = '';
		this.name = '';
		this.description = '';
		this.salary_range = '';
		this.benefit = '';
		this.created_at = new Date();
		this.updated_at = new Date();
		this.deleted_at = null;
	}

	public getId(): string {
		return this.id;
	}

	public getName(): string {
		return this.name;
	}

	public getDescription(): string {
		return this.description;
	}

	public getSalaryRange(): string {
		return this.salary_range;
	}

	public getBenefit(): string {
		return this.benefit;
	}

	public getCreatedAt(): Date {
		return this.created_at;
	}

	public getUpdatedAt(): Date {
		return this.updated_at;
	}

	public getDeletedAt(): Date | null {
		return this.deleted_at;
	}

	public setId(id: string) {
		this.id = id;
	}

	public setName(name: string) {
		this.name = name;
	}

	public setDescription(description: string) {
		this.description = description;
	}

	public setSalaryRange(salary_range: string) {
		this.salary_range = salary_range;
	}

	public setBenefit(benefit: string) {
		this.benefit = benefit;
	}

	public setUpdatedAt(updated_at: Date) {
		this.updated_at = updated_at;
	}

	public setDeletedAt(deleted_at: Date) {
		this.deleted_at = deleted_at;
	}
}