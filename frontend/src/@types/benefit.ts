// ----------------------------------------------------------------

export type IBenefitData = {
    id: string;
    health_insurance: string;
    dental_insurance: string;
    vision_insurance: string;
    retirement_plan: string;
    vacation_days: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
};

export type IBenefitState = {
    isLoading: boolean;
    error: string | null;
    benefits: IBenefitData[];
    benefit: IBenefitData | null;
}

export type ICreateBenefitData = {
    health_insurance: string;
    dental_insurance: string;
    vision_insurance: string;
    retirement_plan: string;
    vacation_days: string;
}