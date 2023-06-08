import ModelAbstract from './model.abstract';

export default class User extends ModelAbstract {
    private id: string;
    private name: string;
    private email: string;
    private avatar: string;
    private password: string;
    private role: string;
    private employee_id: string;
    private created_at: Date;
    private updated_at: Date;
    private deleted_at: Date | null;

    constructor() {
        super();
        this.id = '';
        this.name = '';
        this.email = '';
        this.avatar = '';
        this.password = '';
        this.role = '';
        this.employee_id = '';
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

    public getAvatar(): string {
        return this.avatar;
    }

    public getPassword(): string {
        return this.password;
    }

    public getRole(): string {
        return this.role;
    }

    public getEmployeeId(): string {
        return this.employee_id;
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

    public setAvatar(avatar: string) {
        this.avatar = avatar;
    }

    public setPassword(password: string) {
        this.password = password;
    }

    public setRole(role: string) {
        this.role = role;
    }

    public setEmployeeId(employeeId: string) {
        this.employee_id = employeeId;
    }

    public setCreatedAt(createdAt: Date) {
        this.created_at = createdAt;
    }

    public setUpdatedAt(updatedAt: Date) {
        this.updated_at = updatedAt;
    }

    public setDeletedAt(deletedAt: Date) {
        this.deleted_at = deletedAt;
    }
}