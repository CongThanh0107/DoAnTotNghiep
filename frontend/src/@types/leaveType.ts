export type ILeaveTypeData = {
    id: string;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}

export type ILeaveTypeState = {
    isLoading: boolean;
    error: string | null;
    leaveTypes: ILeaveTypeData[];
    leaveType: ILeaveTypeData | null;
}