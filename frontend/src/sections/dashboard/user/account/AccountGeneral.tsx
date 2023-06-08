import * as Yup from 'yup';
import {useCallback} from 'react';
// form
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
// @mui
import {Box, Card, Grid, Stack, Typography} from '@mui/material';
import {LoadingButton} from '@mui/lab';
// axios
import {AxiosResponse} from "axios";
import axios from '../../../../utils/axios';
// auth
import {useAuthContext} from '../../../../auth/useAuthContext';
// utils
import {fData} from '../../../../utils/formatNumber';
// components
import {CustomFile} from '../../../../components/upload';
import {useSnackbar} from '../../../../components/snackbar';
import FormProvider, {RHFTextField, RHFUploadAvatar,} from '../../../../components/hook-form';
// redux
import {useDispatch} from '../../../../redux/store';
import {updateUser} from '../../../../redux/slices/user';

// ----------------------------------------------------------------------

type FormValuesProps = {
    name: string;
    email: string;
    avatar: CustomFile | string | null;
};

export default function AccountGeneral() {
    const {enqueueSnackbar} = useSnackbar();

    const dispatch = useDispatch();

    const {user} = useAuthContext();

    const UpdateUserSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    });

    const defaultValues = {
        name: user?.user.name || '',
        email: user?.user?.email || '',
        avatar: user?.user?.avatar || null,
    };

    const methods = useForm<FormValuesProps>({
        resolver: yupResolver(UpdateUserSchema),
        defaultValues,
    });

    const {
        setValue,
        handleSubmit,
        formState: {isSubmitting},
    } = methods;

    const onSubmit = async (data: FormValuesProps) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            enqueueSnackbar('Update success!');
            console.log('DATA', data);
            await dispatch(updateUser(data));
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
                    <Card sx={{py: 10, px: 3, textAlign: 'center'}}>
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
                            <RHFTextField name="name" label="Name"/>

                            <RHFTextField name="email" label="Email Address"/>

                        </Box>

                        <Stack spacing={3} alignItems="flex-end" sx={{mt: 3}}>
                            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                                Save Changes
                            </LoadingButton>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </FormProvider>
    );
}
