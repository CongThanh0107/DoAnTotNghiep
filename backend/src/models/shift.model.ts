import ModelAbstract from './model.abstract';

export default class Shift extends ModelAbstract {
    private id: string;
    private name: string;
    private start_time: Date | null;
    private end_time: Date | null;
    private number_of_employees: number;
    private created_at: Date;
    private updated_at: Date;
    private deleted_at: Date | null;

    constructor() {
        super();
        this.id = '';
        this.name = '';
        this.start_time = null;
        this.end_time = null;
        this.number_of_employees = 0;
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

    public getStartTime(): Date | null {
        return this.start_time;
    }

    public getEndTime(): Date | null {
        return this.end_time;
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

    public setId(id: string) {
        this.id = id;
    }

    public setName(name: string) {
        this.name = name;
    }

    public setStartTime(start_time: Date | null) {
        this.start_time = start_time;
    }

    public setEndTime(end_time: Date | null) {
        this.end_time = end_time;
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
}