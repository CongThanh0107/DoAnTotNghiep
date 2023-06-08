import * as Yup from 'yup';
import {useEffect, useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
// form
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
// @mui
import {LoadingButton} from '@mui/lab';
import {Card, Grid, Stack, TextField} from '@mui/material';
// routes
import {DatePicker} from "@mui/x-date-pickers";
import {PATH_DASHBOARD} from '../../routes/paths';
// redux
import {useDispatch, useSelector} from '../../redux/store';
import {createLeave} from '../../redux/slices/leave';
import {getLeaveTypes} from "../../redux/slices/leaveType";
// @types
import {ILeaveData, ICreateLeaveData} from "../../@types/leave";
import {ILeaveTypeData} from "../../@types/leaveType";
// components
import {useSnackbar} from '../../components/snackbar';
import FormProvider, {
    RHFSelect,
    RHFTextField,
} from '../../components/hook-form';
import {fDate} from "../../utils/formatTime";

// ----------------------------------------------------------------------

type Props = {
    isEdit?: boolean;
    currentLeave?: ILeaveData;
}

export default function LeaveForm({isEdit, currentLeave}: Props) {
    const {control} = useForm();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const {enqueueSnackbar} = useSnackbar();

    const {leaveTypes} = useSelector((state: any) => state.leaveType);

    const NewLeaveSchema = Yup.object().shape({
        leave_type_id: Yup.string().required('Leave type is required'),
        start_date: Yup.string().required('Leave start date is required'),
        end_date: Yup.string().required('Leave end date is required'),
        description: Yup.string().required('Leave description is required'),
    });

    const defaultValues = useMemo(
        () => ({
            leave_type_id: currentLeave?.leave_type_id || '',
            start_date: currentLeave?.start_date || new Date(),
            end_date: currentLeave?.end_date || new Date(),
            description: currentLeave?.description || '',
        }),
        [currentLeave]
    );

    const methods = useForm({
        resolver: yupResolver(NewLeaveSchema),
        defaultValues,
    });

    const {
        reset,
        handleSubmit,
        formState: {isSubmitting},
    } = methods;


    useEffect(() => {
        if (isEdit && currentLeave) {
            reset(defaultValues);
        }
        if (!isEdit) {
            reset(defaultValues);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEdit, currentLeave]);

    useEffect(() => {
        dispatch(getLeaveTypes());
    }, [dispatch]);

    const onSubmit = async (data: ICreateLeaveData) => {
        try {
            data = {
                ...data,
                start_date: fDate(data.start_date, 'yyyy-MM-dd'),
                end_date: fDate(data.end_date, 'yyyy-MM-dd'),
            };
            dispatch(createLeave(data)).then(() => {
                enqueueSnackbar('Create leave success', {variant: 'success'});
                navigate(PATH_DASHBOARD.general.app);
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
                            <RHFSelect native name="leave_type_id" label="Leave Reason" placeholder="Leave Reason">
                                <option value=""/>
                                {leaveTypes.map((leaveType: ILeaveTypeData) => (
                                    <option key={leaveType.id} value={leaveType.id}>
                                        {leaveType.name}
                                    </option>
                                ))}
                            </RHFSelect>
                            <RHFTextField
                                name="description"
                                label="Description"
                                multiline
                                rows={4}
                            />
                            <Controller
                                name="start_date"
                                control={control}
                                render={({field, fieldState: {error}}) => (
                                    <DatePicker
                                        label="Start Date"
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
                                name="end_date"
                                control={control}
                                render={({field, fieldState: {error}}) => (
                                    <DatePicker
                                        label="End Date"
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
                                {!isEdit ? 'Create Leave' : 'Save Changes'}
                            </LoadingButton>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </FormProvider>
    )
}
