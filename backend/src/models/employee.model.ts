import ModelAbstract from './model.abstract';

export default class Employee extends ModelAbstract {
	private id: string;
	private name: string;
	private email: string;
	private phone: string;
	private address: string;
	private job_title: string;
	private date_of_hire: Date;
	private date_of_birth: Date;
	private gender: string;
	private salary: number;
	private created_at: Date;
	private updated_at: Date;
	private deleted_at: Date | null;

	constructor() {
		super();
		this.id = '';
		this.name = '';
		this.email = '';
		this.phone = '';
		this.address = '';
		this.job_title = '';
		this.date_of_hire = new Date();
		this.date_of_birth = new Date();
		this.gender = '';
		this.salary = 0;
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

	public getEmail(): string {
		return this.email;
	}

	public getPhone(): string {
		return this.phone;
	}

	public getAddress(): string {
		return this.address;
	}

	public getJobTitle(): string {
		return this.job_title;
	}

	public getDateOfHire(): Date {
		return this.date_of_hire;
	}

	public getDateOfBirth(): Date {
		return this.date_of_birth;
	}

	public getGender(): string {
		return this.gender;
	}

	public getSalary(): number {
		return this.salary;
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

	public setEmail(email: string) {
		this.email = email;
	}

	public setPhone(phone: string) {
		this.phone = phone;
	}

	public setAddress(address: string) {
		this.address = address;
	}

	public setJobTitle(job_title: string) {
		this.job_title = job_title;
	}

	public setDateOfHire(date_of_hire: Date) {
		this.date_of_hire = date_of_hire;
	}

	public setDateOfBirth(date_of_birth: Date) {
		this.date_of_birth = date_of_birth;
	}

	public setGender(gender: string) {
		this.gender = gender;
	}

	public setSalary(salary: number) {
		this.salary = salary;
	}

	public setUpdatedAt(updated_at: Date) {
		this.updated_at = updated_at;
	}

	public setDeletedAt(deleted_at: Date | null) {
		this.deleted_at = deleted_at;
	}

}
