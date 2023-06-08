import ModelAbstract from './model.abstract';

export default class Training extends ModelAbstract {
	private id: string;
	private description: string;
	private trainer: string;
	private duration: number;
	private location: string;
	private cost: number;
	private number_of_attendees: number;
	private created_at: Date;
	private updated_at: Date;
	private deleted_at: Date | null;

	constructor() {
		super();
		this.id = '';
		this.description = '';
		this.trainer = '';
		this.duration = 0;
		this.location = '';
		this.cost = 0;
		this.number_of_attendees = 0;
		this.created_at = new Date();
		this.updated_at = new Date();
		this.deleted_at = null;
	}

	public getId(): string {
		return this.id;
	}

	public getDescription(): string {
		return this.description;
	}

	public getTrainer(): string {
		return this.trainer;
	}

	public getDuration(): number {
		return this.duration;
	}

	public getLocation(): string {
		return this.location;
	}

	public getCost(): number {
		return this.cost;
	}

	public getNumberOfAttendees(): number {
		return this.number_of_attendees;
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

	public setDescription(description: string) {
		this.description = description;
	}

	public setTrainer(trainer: string) {
		this.trainer = trainer;
	}

	public setDuration(duration: number) {
		this.duration = duration;
	}

	public setLocation(location: string) {
		this.location = location;
	}

	public setCost(cost: number) {
		this.cost = cost;
	}

	public setNumberOfAttendees(number_of_attendees: number) {
		this.number_of_attendees = number_of_attendees;
	}

	public setUpdatedAt(updated_at: Date) {
		this.updated_at = updated_at;
	}

	public setDeletedAt(deleted_at: Date | null) {
		this.deleted_at = deleted_at;
	}
}