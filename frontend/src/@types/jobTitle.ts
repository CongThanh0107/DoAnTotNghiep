// ----------------------------------------------------------------

export type IJobTitleData = {
    id: string;
    name: string;
    description: string;
    salary_range: string;
    benefit: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}

export type IJobTitleState = {
    isLoading: boolean;
    error: string | null;
    jobTitles: IJobTitleData[];
    jobTitle: IJobTitleData | null;
}

export type ICreateJobTitleData = {
    name: string;
    description: string;
    salary_range: string;
    benefit: string;
}