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
import {createJobTitle} from '../../../redux/slices/jobTitle';
// @types
import {IJobTitleData, ICreateJobTitleData} from '../../../@types/jobTitle';
import {IBenefitData} from '../../../@types/benefit';
// components
import {useSnackbar} from '../../../components/snackbar';
import FormProvider, {
    RHFSelect,
    RHFTextField,
} from '../../../components/hook-form';

// ----------------------------------------------------------------------

type Props = {
    isEdit?: boolean;
    currentJobTitle?: IJobTitleData;
    benefits: IBenefitData[];
}

export default function JobTitleNewEditForm({isEdit, currentJobTitle, benefits}: Props) {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const {enqueueSnackbar} = useSnackbar();

    const NewBenefitSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        description: Yup.string().required('Description is required'),
        salary_range: Yup.string().required('Salary Range is required'),
        benefit: Yup.string().required('Benefit is required'),
    });

    const defaultValues = useMemo(
        () => ({
            name: currentJobTitle?.name || '',
            description: currentJobTitle?.description || '',
            salary_range: currentJobTitle?.salary_range || '',
            benefit: currentJobTitle?.benefit || '',
        }),
        [currentJobTitle]
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
        if (isEdit && currentJobTitle) {
            reset(defaultValues);
        }
        if (!isEdit) {
            reset(defaultValues);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEdit, currentJobTitle]);

    const onSubmit = async (data: ICreateJobTitleData) => {
        try {
            dispatch(createJobTitle(data)).then(() => {
                enqueueSnackbar('Create job title success', {variant: 'success'});
                navigate(PATH_DASHBOARD.jobTitle.list);
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
                                name="name"
                                label="Name"
                            />
                            <RHFTextField
                                name="description"
                                label="Description"
                            />
                            <RHFTextField
                                name="salary_range"
                                label="Salary Range"
                            />

                            <RHFSelect
                                native
                                name="benefit"
                                label="Benefit"

                            >
                                <optgroup key="benefit" label="Benefit">
                                    {benefits.map((benefit) => (
                                        <option key={benefit.id} value={benefit.id}>
                                            {benefit.id}
                                        </option>
                                    ))}
                                </optgroup>
                            </RHFSelect>
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
