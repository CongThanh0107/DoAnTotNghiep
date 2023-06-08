
export type IShiftData = {
    id: string;
    name: string;
    start_time: string;
    end_time: string;
    number_of_employees: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}

export type IShiftDatatate = {
    isLoading: boolean;
    error: string | null;
    shifts: IShiftData[];
    shift: IShiftData | null;
}

export type ICreateShiftData = {
    name: string;
    start_time: string | Date | null;
    end_time: string | Date | null;
    number_of_employees: number;
}