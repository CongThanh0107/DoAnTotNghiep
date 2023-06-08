import ModelAbstract from './model.abstract';

export default class Leave extends ModelAbstract {
    private id: string;
    private employee_id: string;
    private leave_type_id: string;
    private start_date: Date | null;
    private end_date: Date | null;
    private description: string;
    private status: string;
    private created_at: Date;
    private updated_at: Date;
    private deleted_at: Date | null;

    constructor() {
        super();
        this.id = '';
        this.employee_id = '';
        this.leave_type_id = '';
        this.start_date = null;
        this.end_date = null;
        this.description = '';
        this.status = '';
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

    public getLeaveTypeId(): string {
        return this.leave_type_id;
    }

    public getStartDate(): Date | null {
        return this.start_date;
    }

    public getEndDate(): Date | null {
        return this.end_date;
    }

    public getDescription(): string {
        return this.description;
    }

    public getStatus(): string {
        return this.status;
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

    public setLeaveTypeId(leave_type_id: string) {
        this.leave_type_id = leave_type_id;
    }

    public setStartDate(start_date: Date | null) {
        this.start_date = start_date;
    }

    public setEndDate(end_date: Date | null) {
        this.end_date = end_date;
    }

    public setDescription(description: string) {
        this.description = description;
    }

    public setStatus(status: string) {
        this.status = status;
    }

    public setUpdatedAt(updated_at: Date) {
        this.updated_at = updated_at;
    }

    public setDeletedAt(deleted_at: Date | null) {
        this.deleted_at = deleted_at;
    }
}