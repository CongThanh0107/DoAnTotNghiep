import ModelAbstract from './model.abstract';

export default class Schedule extends ModelAbstract {
	private id: string;
	private employee_id: string;
	private department_id: string;
	private start_time: string | null;
	private end_time: string | null;
	private created_at: Date;
	private updated_at: Date;
	private deleted_at: Date | null;
	private text_color: string | null;

	constructor() {
		super();
		this.id = '';
		this.employee_id = '';
		this.department_id = '';
		this.start_time = null;
		this.end_time = null;
		this.created_at = new Date();
		this.updated_at = new Date();
		this.deleted_at = null;
		this.text_color = null;
	}

	public getId(): string {
		return this.id;
	}

	public getEmployeeId(): string {
		return this.employee_id;
	}

	public getDepartmentId(): string {
		return this.department_id;
	}

	public getStartTime(): string | null {
		return this.start_time;
	}

	public getEndTime(): string | null {
		return this.end_time;
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

	public getTextColor(): string | null {
		return this.text_color;
	}

	public setId(id: string) {
		this.id = id;
	}

	public setEmployeeId(employee_id: string) {
		this.employee_id = employee_id;
	}

	public setDepartmentId(department_id: string) {
		this.department_id = department_id;
	}

	public setStartTime(start_time: string) {
		this.start_time = start_time;
	}

	public setEndTime(end_time: string) {
		this.end_time = end_time;
	}

	public setUpdatedAt(updated_at: Date) {
		this.updated_at = updated_at;
	}

	public setDeletedAt(deleted_at: Date) {
		this.deleted_at = deleted_at;
	}

	public setTextColor(text_color: string) {
		this.text_color = text_color;
	}
}