import FullCalendar, {DateSelectArg, EventClickArg, EventDropArg} from '@fullcalendar/react'; // => request placed at the top
import interactionPlugin, {EventResizeDoneArg} from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import {EventInput} from '@fullcalendar/common';
import {useNavigate} from 'react-router-dom';
//
import {Helmet} from 'react-helmet-async';
import {useEffect, useRef, useState} from 'react';
// @mui
import {Button, Card, Container, Dialog, DialogTitle} from '@mui/material';
// redux
import {useDispatch, useSelector} from '../../redux/store';
import {
    createSchedule,
    deleteEvent,
    deleteSchedule,
    getSchedules,
    getEmployeeSchedules,
    onCloseModal,
    onOpenModal,
    selectSchedule,
    selectRange,
    updateEvent,
    updateSchedule
} from '../../redux/slices/calendar';
// routes
import {PATH_DASHBOARD} from '../../routes/paths';
// utils
import {fTimestamp} from '../../utils/formatTime';
// hooks
import useResponsive from '../../hooks/useResponsive';
// @types
import {ICalendarViewValue, IScheduleData} from '../../@types/calendar';
import {ICreateScheduleData} from '../../@types/schedule';
// components
import Iconify from '../../components/iconify';
import {useSnackbar} from '../../components/snackbar';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import {useSettingsContext} from '../../components/settings';
import {useDateRangePicker} from '../../components/date-range-picker';
// sections
import {CalendarFilterDrawer, CalendarForm, CalendarToolbar, StyledCalendar,} from '../../sections/dashboard/calendar';
import {useAuthContext} from "../../auth/useAuthContext";

// ----------------------------------------------------------------------

const COLOR_OPTIONS = [
    '#00AB55', // theme.palette.primary.main,
    '#1890FF', // theme.palette.info.main,
    '#54D62C', // theme.palette.success.main,
    '#FFC107', // theme.palette.warning.main,
    '#FF4842', // theme.palette.error.main
    '#04297A', // theme.palette.info.darker
    '#7A0C2E', // theme.palette.error.darker
];

export default function CalendarPage() {
    const {enqueueSnackbar} = useSnackbar();

    const {user} = useAuthContext();

    const {themeStretch} = useSettingsContext();

    const dispatch = useDispatch();

    const isDesktop = useResponsive('up', 'sm');

    const calendarRef = useRef<FullCalendar>(null);

    const {openModal, selectedRange, selectedEventId, selectedScheduleId} = useSelector(
        (state) => state.calendar
    );

    let events: any[] = [];

    const {schedules} = useSelector((state) => state.calendar);

    const selectedEvent = useSelector(() => {
        if (selectedScheduleId) {
            console.log('selectedScheduleId', selectedScheduleId);
            return schedules.find((schedule) => schedule.id === selectedScheduleId);
        }

        return null;
    });

    const picker = useDateRangePicker(null, null);

    const [date, setDate] = useState(new Date());

    const [openFilter, setOpenFilter] = useState(false);

    const [filterEventColor, setFilterEventColor] = useState<string[]>([]);

    const [view, setView] = useState<ICalendarViewValue>(isDesktop ? 'dayGridMonth' : 'listWeek');

    useEffect(() => {
        if (user?.user?.role === 'user') {
            dispatch(getEmployeeSchedules(1000, 1));
        } else {
            dispatch(getSchedules(1000, 1));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    useEffect(() => {
        const calendarEl = calendarRef.current;
        if (calendarEl) {
            const calendarApi = calendarEl.getApi();
            const newView = isDesktop ? 'dayGridMonth' : 'listWeek';
            calendarApi.changeView(newView);
            setView(newView);
        }
    }, [isDesktop]);

    const handleOpenFilter = () => {
        setOpenFilter(true);
    };

    const handleCloseFilter = () => {
        setOpenFilter(false);
    };

    const handleClickToday = () => {
        const calendarEl = calendarRef.current;
        console.log(calendarEl, "calendarEl")
        if (calendarEl) {
            const calendarApi = calendarEl.getApi();
            calendarApi.today();
            setDate(calendarApi.getDate());
        }
    };

    const handleChangeView = (newView: ICalendarViewValue) => {
        const calendarEl = calendarRef.current;
        console.log(calendarEl, "calendarEl2")
        if (calendarEl) {
            const calendarApi = calendarEl.getApi();
            calendarApi.changeView(newView);
            setView(newView);
        }
    };

    const handleClickDatePrev = () => {
        const calendarEl = calendarRef.current;

        console.log(calendarEl, "calendarEl3")

        if (calendarEl) {
            const calendarApi = calendarEl.getApi();
            calendarApi.prev();
            setDate(calendarApi.getDate());
        }
    };

    const handleClickDateNext = () => {
        const calendarEl = calendarRef.current;
        console.log(calendarEl, "calendarEl4")
        if (calendarEl) {
            const calendarApi = calendarEl.getApi();
            calendarApi.next();
            setDate(calendarApi.getDate());
        }
    };

    const handleSelectRange = (arg: DateSelectArg) => {
        const calendarEl = calendarRef.current;
        console.log(arg, "arg")
        if (calendarEl) {
            const calendarApi = calendarEl.getApi();
            calendarApi.unselect();
        }
        dispatch(
            selectRange({
                start: arg.start,
                end: arg.end,
            })
        );
    };

    const handleSelectEvent = (arg: EventClickArg) => {
        console.log('handleSelectEvent', arg.event.id);
        dispatch(selectSchedule(arg.event.id));
    };

    const handleResizeEvent = async ({event}: EventResizeDoneArg) => {
        try {
            const schedule = {
                start_time: event.start,
                end_time: event.end,
            }
            dispatch(updateSchedule(event.id, schedule));
        } catch (error) {
            console.error(error);
        }
    };

    const handleDropEvent = async ({event}: EventDropArg) => {
        try {
            const schedule = {
                start_time: event.start,
                end_time: event.end,
            }
            dispatch(updateSchedule(event.id, schedule));
        } catch (error) {
            console.error(error);
        }
    };

    const handleOpenModal = () => {
        dispatch(onOpenModal());
    };

    const handleCloseModal = () => {
        dispatch(onCloseModal());
    };
    const navigate = useNavigate();

    const handleCreateUpdateEvent = (newEvent: ICreateScheduleData) => {
        console.log(selectedEventId, newEvent, "check")
        if (selectedEventId || selectedEvent) {
            dispatch(updateSchedule(selectedScheduleId, newEvent))
            enqueueSnackbar('Update success!');
        } else {
            dispatch(createSchedule(newEvent));
            enqueueSnackbar('Create success!');
        }
        
        if (user?.user?.role === 'user') {
            dispatch(getEmployeeSchedules(1000, 1));
        } else {
            dispatch(getSchedules(1000, 1));
        }
    };

    const handleDeleteEvent = async () => {
        try {
            if (selectedScheduleId) {
                dispatch(deleteSchedule(selectedScheduleId));
                handleCloseModal();
                enqueueSnackbar('Delete success!');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleFilterEventColor = (eventColor: string) => {
        console.log(eventColor, "eventColor")
        const checked = filterEventColor.includes(eventColor)
            ? filterEventColor.filter((value) => value !== eventColor)
            : [...filterEventColor, eventColor];

        setFilterEventColor(checked);
    };

    if (schedules && schedules.length > 0) {
        // eslint-disable-next-line array-callback-return
        events = schedules.map((schedule: IScheduleData) => ({
            id: schedule.id,
            title: schedule.employee_name,
            description: schedule.department_id,
            start: fTimestamp(schedule.start_time),
            end: fTimestamp(schedule.end_time),
            textColor: schedule.text_color,
        }));
    }

    const dataFiltered = applyFilter({
        inputData: events,
        filterEventColor,
        filterStartDate: picker.startDate,
        filterEndDate: picker.endDate,
        isError: !!picker.isError,
    });
    // const navigate = useNavigate();
    // const [currentLength, setCurrentLength] = useState(0)
    // useEffect(() => {
    //     if(currentLength !== dataFiltered.length){
    //         setCurrentLength(dataFiltered.length)
    //         navigate("/dashboard/benefit/list");
    //         setTimeout(() => {
    //             navigate("/dashboard/calendar");
    //         },100)

    //     }
    //      eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [dataFiltered, currentLength])
    return (
        <>
            <Helmet>
                <title> Calendar | Minimal UI</title>
            </Helmet>

            <Container maxWidth={themeStretch ? false : 'xl'}>
                <CustomBreadcrumbs
                    heading="Calendar"
                    links={[
                        {
                            name: 'Dashboard',
                            href: PATH_DASHBOARD.root,
                        },
                        {
                            name: 'Calendar',
                        },
                    ]}
                    action={
                        <Button
                            variant="contained"
                            startIcon={<Iconify icon="eva:plus-fill"/>}
                            onClick={handleOpenModal}
                        >
                            New Event
                        </Button>
                    }
                />

                <Card>
                    <StyledCalendar>
                        <CalendarToolbar
                            date={date}
                            view={view}
                            onNextDate={handleClickDateNext}
                            onPrevDate={handleClickDatePrev}
                            onToday={handleClickToday}
                            onChangeView={handleChangeView}
                            onOpenFilter={handleOpenFilter}
                        />
                        <FullCalendar
                            weekends
                            editable
                            droppable
                            selectable
                            allDayMaintainDuration
                            eventResizableFromStart
                            events={dataFiltered}
                            initialEvents={events}
                            ref={calendarRef}
                            initialDate={date}
                            initialView={view}
                            dayMaxEventRows={3}
                            eventDisplay="block"
                            headerToolbar={false}
                            select={handleSelectRange}
                            eventDrop={handleDropEvent}
                            eventClick={handleSelectEvent}
                            eventResize={handleResizeEvent}
                            height={isDesktop ? 720 : 'auto'}
                            plugins={[
                                listPlugin,
                                dayGridPlugin,
                                timelinePlugin,
                                timeGridPlugin,
                                interactionPlugin,
                            ]}
                        />
                    </StyledCalendar>
                </Card>
            </Container>

            <Dialog fullWidth maxWidth="xs" open={openModal} onClose={handleCloseModal}>
                <DialogTitle>{selectedEvent ? 'Edit Event' : 'Add Event'}</DialogTitle>

                <CalendarForm
                    event={selectedEvent}
                    range={selectedRange}
                    onCancel={handleCloseModal}
                    onCreateUpdateEvent={handleCreateUpdateEvent}
                    onDeleteEvent={handleDeleteEvent}
                    colorOptions={COLOR_OPTIONS}
                />
            </Dialog>

            <CalendarFilterDrawer
                events={events}
                picker={picker}
                open={openFilter}
                onClose={handleCloseFilter}
                colorOptions={COLOR_OPTIONS}
                filterEventColor={filterEventColor}
                onFilterEventColor={handleFilterEventColor}
                onResetFilter={() => {
                    const {setStartDate, setEndDate} = picker;
                    setFilterEventColor([]);
                    if (setStartDate && setEndDate) {
                        setStartDate(null);
                        setEndDate(null);
                    }
                }}
                onSelectEvent={(eventId: string) => {
                    if (eventId) {
                        console.log(eventId);
                        handleOpenModal();
                        dispatch(selectSchedule(eventId));
                    }
                }}
            />
        </>
    );
}

// ----------------------------------------------------------------------

function applyFilter({
                         inputData,
                         filterEventColor,
                         filterStartDate,
                         filterEndDate,
                         isError,
                     }: {
    inputData: EventInput[];
    filterEventColor: string[];
    filterStartDate: Date | null;
    filterEndDate: Date | null;
    isError: boolean;
}) {
    const stabilizedThis = inputData.map((el, index) => [el, index] as const);

    inputData = stabilizedThis.map((el) => el[0]);

    if (filterEventColor.length) {
        inputData = inputData.filter((event: EventInput) =>
            filterEventColor.includes(event.textColor as string)
        );
    }

    if (filterStartDate && filterEndDate && !isError) {
        inputData = inputData.filter(
            (event: EventInput) =>
                fTimestamp(event.start as Date) >= fTimestamp(filterStartDate) &&
                fTimestamp(event.end as Date) <= fTimestamp(filterEndDate)
        );
    }

    return inputData;
}
