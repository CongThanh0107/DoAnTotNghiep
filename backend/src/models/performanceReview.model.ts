import ModelAbstract from './model.abstract';

export default class PerformanceReview extends ModelAbstract {
	private id: string;
	private employee_id: string;
	private manager_id: string;
	private job_title_id: string;
	private date: Date | null;
	private overall_rating: number;
	private comments: string;
	private created_at: Date;
	private updated_at: Date;
	private deleted_at: Date | null;

	constructor() {
		super();
		this.id = '';
		this.employee_id = '';
		this.manager_id = '';
		this.job_title_id = '';
		this.date = null;
		this.overall_rating = 0;
		this.comments = '';
		this.created_at = new Date();
		this.updated_at = new Date();
		this.deleted_at = null;
	}

	public getId(): string {
		return this.id;
	}

	public getEmployeeId(): string {
		return this.employee_id;
	}

	public getManagerId(): string {
		return this.manager_id;
	}

	public getJobTitleId(): string {
		return this.job_title_id;
	}

	public getDate(): Date | null {
		return this.date;
	}

	public getOverallRating(): number {
		return this.overall_rating;
	}

	public getComments(): string {
		return this.comments;
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

	public setEmployeeId(employee_id: string) {
		this.employee_id = employee_id;
	}

	public setManagerId(manager_id: string) {
		this.manager_id = manager_id;
	}

	public setJobTitleId(job_title_id: string) {
		this.job_title_id = job_title_id;
	}

	public setDate(date: Date | null) {
		this.date = date;
	}

	public setOverallRating(overall_rating: number) {
		this.overall_rating = overall_rating;
	}

	public setComments(comments: string) {
		this.comments = comments;
	}

	public setCreatedAt(created_at: Date) {
		this.created_at = created_at;
	}

	public setUpdatedAt(updated_at: Date) {
		this.updated_at = updated_at;
	}

	public setDeletedAt(deleted_at: Date | null) {
		this.deleted_at = deleted_at;
	}
}