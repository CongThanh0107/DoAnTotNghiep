export type ILeaveData = {
    id: string;
    employee_id: string;
    leave_type_id: string;
    start_date: string;
    end_date: string;
    description: string;
    status: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}

export type ILeaveState = {
    isLoading: boolean;
    error: string | null;
    leaves: ILeaveData[];
    leave: ILeaveData | null;
}

export type ICreateLeaveData = {
    leave_type_id: string;
    start_date: string | Date;
    end_date: string | Date;
    description: string;
}