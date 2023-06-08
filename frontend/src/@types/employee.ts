export type IEmployeeData = {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    job_title: string;
    date_of_hire: Date;
    date_of_birth: Date;
    gender: string;
    salary: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}

export type IEmployeeState = {
    isLoading: boolean;
    error: string | null;
    employees: IEmployeeData[];
    employee: IEmployeeData | null;
}

export type ICreateEmployeeData = {
    name: string;
    email: string;
    phone: string;
    address: string;
    job_title: string;
    date_of_hire: Date | string;
    date_of_birth: Date | string;
    gender: string;
    salary: number;
}