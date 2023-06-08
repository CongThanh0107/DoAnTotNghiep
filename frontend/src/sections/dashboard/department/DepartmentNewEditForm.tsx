import * as Yup from 'yup';
import {useNavigate} from 'react-router-dom';
import {useMemo, useCallback, useEffect} from 'react';
// form
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
// @mui
import {LoadingButton} from '@mui/lab';
import {Grid, Card, Stack, Typography, MenuItem, Divider} from '@mui/material';
// routes
import {AxiosResponse} from "axios";
import {PATH_DASHBOARD} from '../../../routes/paths';
// @types
import {IDepartmentData, ICreateDepartmentData} from '../../../@types/department';
// redux
import {useDispatch, useSelector} from "../../../redux/store";
import {createDepartment} from "../../../redux/slices/department";
import {getEmployees} from "../../../redux/slices/employee";
// components
import {useSnackbar} from '../../../components/snackbar';
import FormProvider, {
    RHFEditor,
    RHFUpload,
    RHFTextField,
    RHFSelect,
} from '../../../components/hook-form';
import axios from "../../../utils/axios";


// ----------------------------------------------------------------------

export type FormValuesProps = ICreateDepartmentData;

type Props = {
    isEdit?: boolean;
    currentDepartment?: IDepartmentData;
}

export default function DepartmentNewEditForm({isEdit, currentDepartment}: Props) {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const {enqueueSnackbar} = useSnackbar();

    const {employees} = useSelector((state) => state.employee);

    const NewDepartmentSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        description: Yup.string().required('Description is required'),
        location: Yup.string().required('Location is required'),
        number_of_employees: Yup.number().min(10).required('Number of employee is required'),
        manager: Yup.string().required('Manager is required'),
        image: Yup.string().required('Image is required')
    });

    const defaultValues = useMemo(() => ({
        name: currentDepartment?.name || '',
        description: currentDepartment?.description || '',
        location: currentDepartment?.location || '',
        number_of_employees: currentDepartment?.number_of_employees || 0,
        manager: currentDepartment?.head_of_department || '',
        image: currentDepartment?.image || '',
    }), [currentDepartment]);

    const methods = useForm<FormValuesProps>({
        resolver: yupResolver(NewDepartmentSchema),
        defaultValues,
    });

    const {
        reset,
        setValue,
        handleSubmit,
        formState: {isSubmitting},
    } = methods;

    useEffect(() => {
        if (isEdit && currentDepartment) {
            reset(defaultValues);
        }
        if (!isEdit) {
            reset(defaultValues);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEdit, currentDepartment]);

    useEffect(() => {
        dispatch(getEmployees());
    }, [dispatch]);


    const onSubmit = async (data: FormValuesProps) => {
        try {
            dispatch(createDepartment(data)).then(() => {
                enqueueSnackbar('Department has been created', {variant: 'success'});
                navigate(PATH_DASHBOARD.department.list);
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleDrop = useCallback(
        (acceptedFiles: File[]) => {
            const file = acceptedFiles[0];

            axios.post('/api/images/upload', {file}, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                }
            }).then((res: AxiosResponse) => {
                setValue('image', res.data.photoUrl, {shouldValidate: true});
            })
        },
        [setValue]
    );

    const handleRemoveFile = () => {
        setValue('image', null);
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <Card sx={{p: 3}}>
                        <Stack spacing={3}>
                            <RHFTextField name="name" label="Department Name"/>

                            <RHFTextField name="location" label="Location" multiline rows={3}/>

                            <RHFTextField type="number" name="number_of_employees" label="Number of Employees"/>

                            <RHFSelect
                                name="manager"
                                label="Manager"
                            >
                                <Divider sx={{borderStyle: 'dashed'}}/>
                                {employees.map((employee) => (
                                    <MenuItem key={employee.id} value={employee.id}>
                                        {employee.name}
                                    </MenuItem>
                                ))}
                            </RHFSelect>
                            <Stack spacing={1}>
                                <Typography variant="subtitle2" sx={{color: 'text.secondary'}}>
                                    Description
                                </Typography>

                                <RHFEditor simple name="description"/>
                            </Stack>

                            <Stack spacing={1}>
                                <Typography variant="subtitle2" sx={{color: 'text.secondary'}}>
                                    Cover
                                </Typography>

                                <RHFUpload
                                    name="image"
                                    maxSize={3145728}
                                    onDrop={handleDrop}
                                    onDelete={handleRemoveFile}
                                />
                            </Stack>
                            <Stack spacing={3}>
                                <Stack
                                    direction={{xs: 'column', sm: 'row'}}
                                    spacing={{xs: 3, sm: 2}}
                                    sx={{
                                        mb: 3,
                                        // align end
                                        textAlign: 'right',
                                    }}
                                >
                                    <LoadingButton
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        loading={isSubmitting}
                                    >
                                        {!isEdit ? 'Create Department' : 'Save Changes'}
                                    </LoadingButton>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </FormProvider>
    );
}
