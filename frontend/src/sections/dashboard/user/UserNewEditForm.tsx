import * as Yup from 'yup';
import {useCallback, useEffect, useMemo, useState} from 'react';
// import {useNavigate} from 'react-router-dom';
// form
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
// @mui
import {LoadingButton} from '@mui/lab';
import {Box, Card, FormControlLabel, Grid, IconButton, InputAdornment, Stack, Switch, Typography} from '@mui/material';
// utils
import {AxiosResponse} from "axios";
import axios from "../../../utils/axios";
import {fData} from '../../../utils/formatNumber';
// redux
import {useDispatch, useSelector} from '../../../redux/store';
import {getEmployees} from '../../../redux/slices/employee';
// @types
import {IUserData} from '../../../@types/user';
// components
import Label from '../../../components/label';
import {useSnackbar} from '../../../components/snackbar';
import FormProvider, {RHFSelect, RHFTextField, RHFUploadAvatar,} from '../../../components/hook-form';
import Iconify from "../../../components/iconify";
import {useAuthContext} from "../../../auth/useAuthContext";

// ----------------------------------------------------------------------

interface FormValuesProps extends Omit<IUserData, 'avatar'> {
    avatar: string;
    password: string;
    confirmPassword: string;
}

type Props = {
    isEdit?: boolean;
    currentUser?: IUserData;
};

export default function UserNewEditForm({isEdit = false, currentUser}: Props) {
    // const navigate = useNavigate();
    const {register} = useAuthContext();

    const dispatch = useDispatch();

    const {employees} = useSelector((state) => state.employee);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const {enqueueSnackbar} = useSnackbar();

    const NewUserSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().required('Email is required').email('Email must be a valid email address'),
        role: Yup.string().required('Role is required'),
        avatar: Yup.string().required('Avatar is required').nullable(true),
        employee_id: Yup.string().required('Employee ID is required'),
        password: Yup.string().required('Password is required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required(),
    });

    const defaultValues = useMemo(
        () => ({
            name: currentUser?.name || '',
            email: currentUser?.email || '',
            role: currentUser?.role || '',
            employee_id: currentUser?.employee_id || '',
            password: '',
            confirmPassword: '',
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [currentUser]
    );

    const methods = useForm<FormValuesProps>({
        resolver: yupResolver(NewUserSchema),
        defaultValues,
    });

    const {
        reset,
        watch,
        control,
        setValue,
        handleSubmit,
        formState: {isSubmitting},
    } = methods;

    const values = watch();

    useEffect(() => {
        if (isEdit && currentUser) {
            reset(defaultValues);
        }
        if (!isEdit) {
            reset(defaultValues);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEdit, currentUser]);

    useEffect(() => {
        dispatch(getEmployees());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const onSubmit = async (data: FormValuesProps) => {
        try {
            await register(data.name, data.email, data.avatar, data.role, data.password, data.confirmPassword, data.employee_id);
            reset();
            enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
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
                setValue('avatar', res.data.photoUrl, {shouldValidate: true});
            })
        },
        [setValue]
    );

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Card sx={{pt: 10, pb: 5, px: 3}}>
                        {isEdit && (
                            <Label
                                color={values.status === 'active' ? 'success' : 'error'}
                                sx={{textTransform: 'uppercase', position: 'absolute', top: 24, right: 24}}
                            >
                                {values.status}
                            </Label>
                        )}

                        <Box sx={{mb: 5}}>
                            <RHFUploadAvatar
                                name="avatar"
                                maxSize={3145728}
                                onDrop={handleDrop}
                                helperText={
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            mt: 2,
                                            mx: 'auto',
                                            display: 'block',
                                            textAlign: 'center',
                                            color: 'text.secondary',
                                        }}
                                    >
                                        Allowed *.jpeg, *.jpg, *.png, *.gif
                                        <br/> max size of {fData(3145728)}
                                    </Typography>
                                }
                            />
                        </Box>

                        {isEdit && (
                            <FormControlLabel
                                labelPlacement="start"
                                control={
                                    <Controller
                                        name="status"
                                        control={control}
                                        render={({field}) => (
                                            <Switch
                                                {...field}
                                                checked={field.value !== 'active'}
                                                onChange={(event) =>
                                                    field.onChange(event.target.checked ? 'banned' : 'active')
                                                }
                                            />
                                        )}
                                    />
                                }
                                label={
                                    <>
                                        <Typography variant="subtitle2" sx={{mb: 0.5}}>
                                            Banned
                                        </Typography>
                                        <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                            Apply disable account
                                        </Typography>
                                    </>
                                }
                                sx={{mx: 0, mb: 3, width: 1, justifyContent: 'space-between'}}
                            />
                        )}
                    </Card>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Card sx={{p: 3}}>
                        <Box
                            rowGap={3}
                            columnGap={2}
                            display="grid"
                            gridTemplateColumns={{
                                xs: 'repeat(1, 1fr)',
                                sm: 'repeat(2, 1fr)',
                            }}
                        >
                            <RHFTextField name="name" label="Full Name"/>
                            <RHFTextField name="email" label="Email Address"/>

                            <RHFTextField
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}/>
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <RHFTextField
                                name="confirmPassword"
                                label="Confirm password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        edge="end">
                                                <Iconify
                                                    icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}/>
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <RHFSelect native name="role" label="Role" placeholder="Role">
                                <option value=""/>
                                <option value="user">
                                    User
                                </option>
                                <option value="manager">
                                    Manager
                                </option>
                            </RHFSelect>
                            <RHFSelect native name="employee_id" label="Employee" placeholder="Employee">
                                <option value=""/>
                                {employees.map((employee) => (
                                    <option key={employee.id} value={employee.id}>
                                        {employee.name}
                                    </option>
                                ))}
                            </RHFSelect>
                        </Box>

                        <Stack alignItems="flex-end" sx={{mt: 3}}>
                            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                                {!isEdit ? 'Create User' : 'Save Changes'}
                            </LoadingButton>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </FormProvider>
    );
}
