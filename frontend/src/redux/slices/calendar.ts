import {createSlice, Dispatch} from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
// @types
import {ICalendarState, ICalendarEvent} from '../../@types/calendar';
import {ICreateScheduleData} from '../../@types/schedule';

// ----------------------------------------------------------------------

const initialState: ICalendarState = {
    isLoading: false,
    error: null,
    events: [],
    schedules: [],
    schedule: null,
    openModal: false,
    selectedScheduleId: null,
    selectedEventId: null,
    selectedRange: null,
};

const slice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        // START LOADING
        startLoading(state) {
            state.isLoading = true;
        },

        // HAS ERROR
        hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },

        // GET EVENTS
        getEventsSuccess(state, action) {
            state.isLoading = false;
            state.events = action.payload;
        },

        // CREATE EVENT
        createEventSuccess(state, action) {
            const newEvent = action.payload;
            state.isLoading = false;
            state.events = [...state.events, newEvent];
        },

        // UPDATE EVENT
        updateEventSuccess(state, action) {
            state.isLoading = false;
            state.events = state.events.map((event) => {
                if (event.id === action.payload.id) {
                    return action.payload;
                }
                return event;
            });
        },

        // DELETE EVENT
        deleteEventSuccess(state, action) {
            const eventId = action.payload;
            state.events = state.events.filter((event) => event.id !== eventId);
        },

        // SELECT EVENT
        selectEvent(state, action) {
            const eventId = action.payload;
            state.openModal = true;
            state.selectedEventId = eventId;
        },

        // SELECT RANGE
        selectRange(state, action) {
            const {start, end} = action.payload;
            state.openModal = true;
            state.selectedRange = {start, end};
        },

        // OPEN MODAL
        onOpenModal(state) {
            state.openModal = true;
        },

        // CLOSE MODAL
        onCloseModal(state) {
            state.openModal = false;
            state.selectedEventId = null;
            state.selectedScheduleId = null;
            state.selectedRange = null;
        },


        // CREATE SCHEDULE
        createScheduleSuccess(state, action) {
            const newSchedule = action.payload;
            state.isLoading = false;
            state.schedules = [...state.schedules, newSchedule];
        },

        // SELECT SCHEDULE
        selectSchedule(state, action) {
            const scheduleId = action.payload;
            state.openModal = true;
            state.selectedScheduleId = scheduleId;
        },

        // GET SCHEDULES
        getSchedulesSuccess(state, action) {
            state.isLoading = false;
            state.schedules = action.payload;
        },

        // GET SCHEDULE
        getScheduleSuccess(state, action) {
            state.isLoading = false;
            state.schedule = action.payload;
        },

        // UPDATE SCHEDULE
        updateScheduleSuccess(state, action) {
            state.isLoading = false;
            state.schedules = state.schedules.map((schedule) => {
                if (schedule.id === action.payload.id) {
                    return action.payload;
                }
                return schedule;
            });
        },

        // DELETE SCHEDULE
        deleteScheduleSuccess(state, action) {
            const scheduleId = action.payload;
            state.schedules = state.schedules.filter((schedule) => schedule.id !== scheduleId);
        },
    },
});

// Reducer
export default slice.reducer;

// Actions
export const {
    onOpenModal,
    onCloseModal,
    selectEvent,
    selectSchedule,
    selectRange
} = slice.actions;

// ----------------------------------------------------------------------

export function getEvents() {
    return async (dispatch: Dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get('/api/calendar/events');
            dispatch(slice.actions.getEventsSuccess(response.data.events));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

// ----------------------------------------------------------------------

export function createEvent(newEvent: ICalendarEvent) {
    return async (dispatch: Dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.post('/api/calendar/events/new', newEvent);
            dispatch(slice.actions.createEventSuccess(response.data.event));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

// ----------------------------------------------------------------------

export function updateEvent(
    eventId: string,
    event: Partial<{
        allDay: boolean;
        start: Date | string | number | null;
        end: Date | string | number | null;
    }>
) {
    return async (dispatch: Dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.post('/api/calendar/events/update', {
                eventId,
                event,
            });
            dispatch(slice.actions.updateEventSuccess(response.data.event));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

// ----------------------------------------------------------------------

export function deleteEvent(eventId: string) {
    return async (dispatch: Dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            await axios.post('/api/calendar/events/delete', {eventId});
            dispatch(slice.actions.deleteEventSuccess(eventId));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

// ----------------------------------------------------------------------

export function getSchedules(limit: number, page: number) {
    return async (dispatch: Dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get('/api/schedules', {
                params: {
                    limit,
                    page
                }
            });
            dispatch(slice.actions.getSchedulesSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

// ----------------------------------------------------------------------
export function getEmployeeSchedules(limit: number, page: number) {
    return async (dispatch: Dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get(`/api/auth/profile/schedules`, {
                params: {
                    limit,
                    page
                }
            });
            dispatch(slice.actions.getSchedulesSuccess(response.data.schedules));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

// ----------------------------------------------------------------------

export function getSchedule(scheduleId: string) {
    return async (dispatch: Dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get(`/api/schedules/${scheduleId}`);
            dispatch(slice.actions.getScheduleSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    }
}

// ----------------------------------------------------------------------
export function createSchedule(newSchedule: ICreateScheduleData) {
    return async (dispatch: Dispatch) => {
        console.log('newSchedule', newSchedule);
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.post('/api/schedules', newSchedule);
            dispatch(slice.actions.createScheduleSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

// ----------------------------------------------------------------------
export function updateSchedule(scheduleId: string | any, data: object | any) {
    return async (dispatch: Dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.put(`/api/schedules/${scheduleId}`, data);
            dispatch(slice.actions.updateScheduleSuccess(response.data.schedules));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    }
}

// ----------------------------------------------------------------------

export function deleteSchedule(scheduleId: string | any) {
    return async (dispatch: Dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            await axios.delete(`/api/schedules/${scheduleId}`);
            dispatch(slice.actions.deleteScheduleSuccess(scheduleId));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    }
}

