import * as Yup from 'yup';
import {useEffect, useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
// form
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
// @mui
import {DatePicker} from '@mui/x-date-pickers';
import {LoadingButton} from '@mui/lab';
import {Card, Divider, Grid, Stack, TextField, MenuItem} from '@mui/material';
// routes
import {fDate} from 'src/utils/formatTime';
import {PATH_DASHBOARD} from '../../../routes/paths';
// redux
import {useDispatch, useSelector} from '../../../redux/store';
import {createEmployee} from '../../../redux/slices/employee';
import {getJobTitles} from '../../../redux/slices/jobTitle';
// @types
import {IEmployeeData, ICreateEmployeeData} from '../../../@types/employee';
// components
import {useSnackbar} from '../../../components/snackbar';
import FormProvider, {
    RHFSelect,
    RHFTextField,
    RHFAutocomplete,
} from '../../../components/hook-form';

// ----------------------------------------------------------------------

type Props = {
    isEdit?: boolean;
    currentEmployee?: IEmployeeData;
};

const GENDER_TABS = ['Nam', 'Nữ'];

export default function EmployeeNewEditForm({isEdit, currentEmployee}: Props) {
    const {control} = useForm();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const {enqueueSnackbar} = useSnackbar();

    const {jobTitles} = useSelector((state) => state.jobTitle);

    const phoneRegExp =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const NewEmployeeSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().required('Email is required').email('Email must be a valid email address'),
        phone: Yup.string().matches(phoneRegExp).required('Phone Number is required'),
        address: Yup.string().required('Address is required'),
        job_title: Yup.string().required('Job title is required'),
        date_of_hire: Yup.date().required('Date of hire is required'),
        date_of_birth: Yup.date().required('Date of birth is required'),
        gender: Yup.string().oneOf(GENDER_TABS).required('Gender is required'),
        salary: Yup.number().min(100, 'Salary can not less than 100').required('Salary is required'),
    });

    const defaultValues = useMemo(
        () => ({
            name: currentEmployee?.name || '',
            email: currentEmployee?.email || '',
            phone: currentEmployee?.phone || '',
            address: currentEmployee?.address || '',
            job_title: currentEmployee?.job_title || '',
            date_of_hire: currentEmployee?.date_of_hire || new Date(),
            date_of_birth: currentEmployee?.date_of_birth || new Date(),
            gender: currentEmployee?.gender || '',
            salary: currentEmployee?.salary || 0,
        }),
        [currentEmployee]
    );

    const methods = useForm({
        resolver: yupResolver(NewEmployeeSchema),
        defaultValues,
    });

    const {
        reset,
        handleSubmit,
        formState: {isSubmitting},
    } = methods;

    useEffect(() => {
        if (isEdit && currentEmployee) {
            reset(defaultValues);
        }
        if (!isEdit) {
            reset(defaultValues);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEdit, currentEmployee]);

    useEffect(() => {
        dispatch(getJobTitles(100, 1));
    }, [dispatch]);

    const onSubmit = async (data: ICreateEmployeeData) => {
        try {
            data = {
                ...data,
                date_of_hire: fDate(data.date_of_hire, 'yyyy/MM/dd'),
                date_of_birth: fDate(data.date_of_birth, 'yyyy/MM/dd')
            }
            console.log(data);
            dispatch(createEmployee(data)).then(() => {
                enqueueSnackbar('Create employee success', {variant: 'success'});
                navigate(PATH_DASHBOARD.employee.list);
            });
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <Card sx={{p: 3}}>
                        <Stack spacing={3}>
                            <RHFTextField name="name" label="Employee name"/>
                            <RHFTextField name="email" label="Email"/>
                            <RHFTextField name="phone" label="Phone Number"/>
                            <RHFTextField name="address" label="Address"/>
                            <RHFSelect name="job_title" label="Job Title">
                                <MenuItem value="">None</MenuItem>
                                <Divider sx={{borderStyle: 'dashed'}}/>
                                {jobTitles.map((jobTitle) => (
                                    <MenuItem key={jobTitle.id} value={jobTitle.id}>
                                        {jobTitle.name}
                                    </MenuItem>
                                ))}
                            </RHFSelect>

                            <RHFAutocomplete
                                name="gender"
                                label="Gender"
                                options={GENDER_TABS.map((option) => option)}
                            />
                            <RHFTextField type="number" name="salary" label="Salary"/>
                            <Controller
                                name="date_of_hire"
                                control={control}
                                render={({field, fieldState: {error}}) => (
                                    <DatePicker
                                        label="Date of hire"
                                        inputFormat='dd/MM/yyyy'
                                        value={field.value}
                                        onChange={(newValue) => {
                                            field.onChange(newValue);
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                fullWidth
                                                error={!!error}
                                                helperText={error?.message}
                                            />
                                        )}
                                    />
                                )}
                            />
                            <Controller
                                name="date_of_birth"
                                control={control}
                                render={({field, fieldState: {error}}) => (
                                    <DatePicker
                                        label="Date of birth"
                                        inputFormat='dd/MM/yyyy'
                                        value={field.value}
                                        onChange={(newValue) => {
                                            field.onChange(newValue);
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                fullWidth
                                                error={!!error}
                                                helperText={error?.message}
                                            />
                                        )}
                                    />
                                )}
                            />
                            <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                                {!isEdit ? 'Create Employee' : 'Save Changes'}
                            </LoadingButton>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </FormProvider>
    );
}
