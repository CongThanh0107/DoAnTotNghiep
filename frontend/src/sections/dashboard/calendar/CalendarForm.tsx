import {useEffect} from 'react';
import * as Yup from 'yup';
import merge from 'lodash/merge';
// eslint-disable-next-line import/no-duplicates
import {isBefore} from 'date-fns';
// eslint-disable-next-line import/no-duplicates
import {vi} from 'date-fns/locale';
import {EventInput} from '@fullcalendar/common';
// form
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
// @mui
import {Box, Stack, Button, Tooltip, TextField, IconButton, DialogActions, Divider, MenuItem} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {MobileDateTimePicker} from '@mui/x-date-pickers';
// @types
import {ICreateScheduleData} from '../../../@types/schedule';
// components
import Iconify from '../../../components/iconify';
import {ColorSinglePicker} from '../../../components/color-utils';
import FormProvider, {RHFTextField, RHFSwitch, RHFSelect} from '../../../components/hook-form';
// redux
import {useDispatch, useSelector} from '../../../redux/store';
import {getEmployees} from '../../../redux/slices/employee';
import {getDepartments} from '../../../redux/slices/department';
import {useAuthContext} from "../../../auth/useAuthContext";
// utils
// ----------------------------------------------------------------------

type FormValuesProps = ICreateScheduleData;

type Props = {
    colorOptions: string[];
    event: EventInput | null | undefined;
    range: {
        start: Date;
        end: Date;
    } | null;
    onCancel: VoidFunction;
    onDeleteEvent: VoidFunction;
    onCreateUpdateEvent: (newEvent: ICreateScheduleData) => void;
};

// ----------------------------------------------------------------------

const getInitialValues = (
    event: EventInput | null | undefined,
    range: { start: Date; end: Date } | null
) => {
    const initialEvent: FormValuesProps = {
        employee_id: '',
        department_id: '',
        start_time: range ? new Date(range.start).toLocaleDateString() : new Date().toLocaleDateString(),
        end_time: range ? new Date(range.end).toLocaleDateString() : new Date().toLocaleDateString(),
        text_color: '',
    };

    if (event || range) {
        return merge({}, initialEvent, event);
    }

    return initialEvent;
};

// ----------------------------------------------------------------------

export default function CalendarForm({
                                         event,
                                         range,
                                         colorOptions,
                                         onCreateUpdateEvent,
                                         onDeleteEvent,
                                         onCancel,
                                     }: Props) {
    const dispatch = useDispatch();

    const {user} = useAuthContext();

    const {employees} = useSelector((state) => state.employee);

    const {departments} = useSelector((state) => state.department);

    const hasEventData: boolean = !!event;

    const EventSchema = Yup.object().shape({
        title: Yup.string().max(255).required('Title is required'),
        description: Yup.string().max(5000),
    });

    const ScheduleSchema = Yup.object().shape({
        employee_id: Yup.string().required('Employee is required'),
        department_id: Yup.string().required('Department is required'),
        start_time: Yup.date().required('Start time is required'),
        end_time: Yup.date().required('End time is required'),
        text_color: Yup.string().required('Color is required'),
    });

    const methods = useForm({
        resolver: yupResolver(ScheduleSchema),
        defaultValues: getInitialValues(event, range),
    });

    const {
        reset,
        watch,
        control,
        handleSubmit,
        formState: {isSubmitting},
    } = methods;

    const values = watch();

    useEffect(() => {
        dispatch(getEmployees(100, 1));
        dispatch(getDepartments(100, 1));
    }, [dispatch]);
    const onSubmit = async (data: FormValuesProps) => {
        try {
            const newEvent = {
                employee_id: data.employee_id,
                department_id: data.department_id,
                start_time: data.start_time,
                end_time: data.end_time,
                text_color: data.text_color,
            };
            onCreateUpdateEvent(newEvent);
            onCancel();
            reset();
        } catch (error) {
            console.error(error);
        }
    };

    const isDateError =
        values.start_time && values.end_time
            ? isBefore(new Date(values.end_time), new Date(values.start_time))
            : false;

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3} sx={{px: 3}}>
                {user?.user.role === 'manager' && (
                    <>
                        <RHFSelect
                            name="employee_id"
                            label="Employee"
                        >
                            <Divider sx={{borderStyle: 'dashed'}}/>
                            {employees.map((employee) => (
                                <MenuItem key={employee.id} value={employee.id}>
                                    {employee.name}
                                </MenuItem>
                            ))}
                        </RHFSelect>

                        <RHFSelect
                            name="department_id"
                            label="Department"
                        >
                            <Divider sx={{borderStyle: 'dashed'}}/>
                            {departments.map((department) => (
                                <MenuItem key={department.id} value={department.id}>
                                    {department.name}
                                </MenuItem>
                            ))}
                        </RHFSelect>
                    </>
                )}

                <Controller
                    name="start_time"
                    control={control}
                    render={({field}) => (
                        <MobileDateTimePicker
                            {...field}
                            disabled={user?.user.role === 'user'}
                            onChange={(newValue: Date | null) => field.onChange(newValue)}
                            label="Start date"
                            inputFormat="dd/MM/yyyy hh:mm:ss"
                            renderInput={(params) => <TextField {...params} fullWidth/>}
                        />
                    )}
                />

                <Controller
                    name="end_time"
                    control={control}
                    render={({field}) => (
                        <MobileDateTimePicker
                            {...field}
                            onChange={(newValue: Date | null) => field.onChange(newValue)}
                            label="End date"
                            disabled={user?.user.role === 'user'}
                            inputFormat="dd/MM/yyyy hh:mm:ss"
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    fullWidth
                                    error={!!isDateError}
                                    helperText={isDateError && 'End date must be later than start date'}
                                />
                            )}
                        />
                    )}
                />

                {user?.user.role === 'user' ? null : (
                    <Controller
                        name="text_color"
                        control={control}
                        render={({field}) => (
                            <ColorSinglePicker
                                value={field.value}
                                onChange={field.onChange}
                                colors={colorOptions}
                            />
                        )}
                    />
                )}
            </Stack>

            {user?.user.role === 'user' ? (
                <DialogActions>
                    <Box sx={{flexGrow: 1}}/>
                </DialogActions>
            ) : (
                <DialogActions>
                    {hasEventData && (
                        <Tooltip title="Delete Event">
                            <IconButton onClick={onDeleteEvent}>
                                <Iconify icon="eva:trash-2-outline"/>
                            </IconButton>
                        </Tooltip>
                    )}

                    <Box sx={{flexGrow: 1}}/>

                    <Button variant="outlined" color="inherit" onClick={onCancel}>
                        Cancel
                    </Button>

                    <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                        {hasEventData ? 'Update' : 'Add'}
                    </LoadingButton>
                </DialogActions>
            )}
        </FormProvider>
    );
}
