import ModelAbstract from './model.abstract';

export default class Date extends ModelAbstract {
	private id: string;
	private date: Date;
	private start_time: Date;
	private end_time: Date;
	private type: string;
	private created_at: Date;
	private updated_at: Date;
	private deleted_at: Date | null;

	constructor() {
		super();
		this.id = '';
		this.date = new Date();
		this.start_time = new Date();
		this.end_time = new Date();
		this.type = '';
		this.created_at = new Date();
		this.updated_at = new Date();
		this.deleted_at = null;
	}

	public getId(): string {
		return this.id;
	}

	public getDate(): Date {
		return this.date;
	}

	public getStartTime(): Date {
		return this.start_time;
	}

	public getEndTime(): Date {
		return this.end_time;
	}

	public getType(): string {
		return this.type;
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

	public setDate(date: Date) {
		this.date = date;
	}

	public setStartTime(start_time: Date) {
		this.start_time = start_time;
	}

	public setEndTime(end_time: Date) {
		this.end_time = end_time;
	}

	public setType(type: string) {
		this.type = type;
	}

	public setUpdatedAt(updated_at: Date) {
		this.updated_at = updated_at;
	}

	public setDeletedAt(deleted_at: Date | null) {
		this.deleted_at = deleted_at;
	}
}