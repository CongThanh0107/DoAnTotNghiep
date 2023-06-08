import ModelAbstract from './model.abstract';

export default class Benefit extends ModelAbstract {
	private id: string;
	private health_insurance: string;
	private dental_insurance: string;
	private vision_insurance: string;
	private retirement_plan: string;
	private vacation_days: string;
	private created_at: Date;
	private updated_at: Date;
	private deleted_at: Date | null;

	constructor() {
		super();
		this.id = '';
		this.health_insurance = '';
		this.dental_insurance = '';
		this.vision_insurance = '';
		this.retirement_plan = '';
		this.vacation_days = '';
		this.created_at = new Date();
		this.updated_at = new Date();
		this.deleted_at = null;
	}

	public getId(): string {
		return this.id;
	}

	public getHealthInsurance(): string {
		return this.health_insurance;
	}

	public getDentalInsurance(): string {
		return this.dental_insurance;
	}

	public getVisionInsurance(): string {
		return this.vision_insurance;
	}

	public getRetirementPlan(): string {
		return this.retirement_plan;
	}

	public getVacationDays(): string {
		return this.vacation_days;
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

	public setHealthInsurance(health_insurance: string) {
		this.health_insurance = health_insurance;
	}

	public setDentalInsurance(dental_insurance: string) {
		this.dental_insurance = dental_insurance;
	}

	public setVisionInsurance(vision_insurance: string) {
		this.vision_insurance = vision_insurance;
	}

	public setRetirementPlan(retirement_plan: string) {
		this.retirement_plan = retirement_plan;
	}

	public setVacationDays(vacation_days: string) {
		this.vacation_days = vacation_days;
	}

	public setUpdatedAt(updated_at: Date) {
		this.updated_at = updated_at;
	}

	public setDeletedAt(deleted_at: Date | null) {
		this.deleted_at = deleted_at;
	}
}