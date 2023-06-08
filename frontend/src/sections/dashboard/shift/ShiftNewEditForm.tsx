import * as Yup from 'yup';
import {useEffect, useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
// form
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
// @mui
import {LoadingButton} from '@mui/lab';
import {Card, Grid, Stack, TextField} from '@mui/material';
// routes
import {DatePicker} from "@mui/x-date-pickers";
import {PATH_DASHBOARD} from '../../../routes/paths';
// redux
import {useDispatch} from '../../../redux/store';
import {createShift} from '../../../redux/slices/shift';
// @types
import {IShiftData, ICreateShiftData} from '../../../@types/shift';
// components
import {useSnackbar} from '../../../components/snackbar';
import FormProvider, {
    RHFTextField,
} from '../../../components/hook-form';

// ----------------------------------------------------------------------

type Props = {
    isEdit?: boolean;
    currentShift?: IShiftData;
}

export default function ShiftNewEditForm({isEdit, currentShift}: Props) {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const {enqueueSnackbar} = useSnackbar();

    const NewShiftSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        start_time: Yup.string().required('Start time is required'),
        end_time: Yup.string().required('End time is required'),
        number_of_employees: Yup.number().required('Number of employee is required'),
    });

    const defaultValues = useMemo(
        () => ({
            name: currentShift?.name || '',
            start_time: currentShift?.start_time || '',
            end_time: currentShift?.end_time || '',
            number_of_employees: currentShift?.number_of_employees || 0,
        }),
        [currentShift]
    );

    const methods = useForm({
        resolver: yupResolver(NewShiftSchema),
        defaultValues,
    });

    const {
        reset,
        handleSubmit,
        formState: {isSubmitting},
    } = methods;


    useEffect(() => {
        if (isEdit && currentShift) {
            reset(defaultValues);
        }
        if (!isEdit) {
            reset(defaultValues);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEdit, currentShift]);
    const onSubmit = async (data: ICreateShiftData) => {
        try {
            dispatch(createShift(data)).then(() => {
                enqueueSnackbar('Create shift success', {variant: 'success'});
                navigate(PATH_DASHBOARD.shift.list);
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit, (errors) => {
            console.log(errors)
        })}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <Card sx={{p: 3}}>
                        <Stack spacing={3}>
                            <RHFTextField
                                name="name"
                                label="Name"
                            />
                            <RHFTextField
                                name="start_time"
                                type="time"
                            />
                            <RHFTextField
                                name="end_time"
                                type="time"
                            />
                            <RHFTextField
                                name="number_of_employees"
                                label="Number of Employees"
                                type="number"
                                variant="outlined"
                            />
                            <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                                {!isEdit ? 'Create Shift' : 'Save Changes'}
                            </LoadingButton>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </FormProvider>
    )
}
