import * as Yup from 'yup';
import {useEffect, useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
// form
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
// @mui
import {LoadingButton} from '@mui/lab';
import {Card, Grid, Stack} from '@mui/material';
// routes
import {PATH_DASHBOARD} from '../../../routes/paths';
// redux
import {useDispatch} from '../../../redux/store';
import {createBenefit} from '../../../redux/slices/benefit';
// @types
import {IBenefitData, ICreateBenefitData} from '../../../@types/benefit';
// components
import {useSnackbar} from '../../../components/snackbar';
import FormProvider, {
    RHFTextField,
} from '../../../components/hook-form';

// ----------------------------------------------------------------------

type Props = {
    isEdit?: boolean;
    currentBenefit?: IBenefitData;
}

export default function BenefitNewEditForm({isEdit, currentBenefit}: Props) {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const {enqueueSnackbar} = useSnackbar();

    const NewBenefitSchema = Yup.object().shape({
        health_insurance: Yup.string().required('Health insurance is required'),
        dental_insurance: Yup.string().required('Dental insurance is required'),
        vision_insurance: Yup.string().required('Vision insurance is required'),
        retirement_plan: Yup.string().required('Retirement plan is required'),
        vacation_days: Yup.string().required('Vacation days is required'),
    });

    const defaultValues = useMemo(
        () => ({
            health_insurance: currentBenefit?.health_insurance || '',
            dental_insurance: currentBenefit?.dental_insurance || '',
            vision_insurance: currentBenefit?.vision_insurance || '',
            retirement_plan: currentBenefit?.retirement_plan || '',
            vacation_days: currentBenefit?.vacation_days || '',
        }),
        [currentBenefit]
    );

    const methods = useForm({
        resolver: yupResolver(NewBenefitSchema),
        defaultValues,
    });

    const {
        reset,
        handleSubmit,
        formState: {isSubmitting},
    } = methods;


    useEffect(() => {
        if (isEdit && currentBenefit) {
            reset(defaultValues);
        }
        if (!isEdit) {
            reset(defaultValues);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEdit, currentBenefit]);

    const onSubmit = async (data: ICreateBenefitData) => {
        try {
            dispatch(createBenefit(data)).then(() => {
                enqueueSnackbar('Create benefit success', {variant: 'success'});
                navigate(PATH_DASHBOARD.benefit.list);
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <Card sx={{p: 3}}>
                        <Stack spacing={3}>
                            <RHFTextField
                                name="health_insurance"
                                label="Health insurance"
                            />
                            <RHFTextField
                                name="dental_insurance"
                                label="Dental insurance"
                            />
                            <RHFTextField
                                name="vision_insurance"
                                label="Vision insurance"
                            />
                            <RHFTextField
                                name="retirement_plan"
                                label="Retirement plan"
                            />
                            <RHFTextField
                                name="vacation_days"
                                label="Vacation days"
                            />

                            <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                                {!isEdit ? 'Create Benefit' : 'Save Changes'}
                            </LoadingButton>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </FormProvider>
    )
}
