import ModelAbstract from './model.abstract';

export default class Department extends ModelAbstract {
	private id: string;
	private name: string;
	private location: string;
	private head_of_department: string;
	private number_of_employees: number;
	private created_at: Date;
	private updated_at: Date;
	private deleted_at: Date | null;
	private image: string | null;
	private description: string;

	constructor() {
		super();
		this.id = '';
		this.name = '';
		this.location = '';
		this.head_of_department = '';
		this.number_of_employees = 0;
		this.created_at = new Date();
		this.updated_at = new Date();
		this.deleted_at = null;
		this.image = '';
		this.description = '';
	}

	public getId(): string {
		return this.id;
	}

	public getName(): string {
		return this.name;
	}

	public getLocation(): string {
		return this.location;
	}

	public getHeadOfDepartment(): string {
		return this.head_of_department;
	}

	public getNumberOfEmployees(): number {
		return this.number_of_employees;
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

	public getImage(): string | null {
		return this.image;
	}

	public getDescription(): string {
		return this.description;
	}

	public setId(id: string) {
		this.id = id;
	}

	public setName(name: string) {
		this.name = name;
	}

	public setLocation(location: string) {
		this.location = location;
	}

	public setHeadOfDepartment(head_of_department: string) {
		this.head_of_department = head_of_department;
	}

	public setNumberOfEmployees(number_of_employees: number) {
		this.number_of_employees = number_of_employees;
	}

	public setUpdatedAt(updated_at: Date) {
		this.updated_at = updated_at;
	}

	public setDeletedAt(deleted_at: Date | null) {
		this.deleted_at = deleted_at;
	}

	public setImage(image: string | null) {
		this.image = image;
	}

	public setDescription(description: string) {
		this.description = description;
	}
}