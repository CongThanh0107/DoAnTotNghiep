export type IDepartmentData = {
    id: string;
    name: string;
    description: string;
    location: string;
    head_of_department: string;
    number_of_employees: number;
    image: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}

export type IDepartmentState = {
    isLoading: boolean;
    error: string | null;
    departments: IDepartmentData[];
    department: IDepartmentData | null;
}

export type ICreateDepartmentData = {
    name: string;
    description: string;
    location: string;
    head_of_department: string;
    number_of_employees: number;
    image: string | null;
}