import {createSlice, Dispatch} from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
// @types
import {ICreateDateData, IDateData, IDateState} from "../../@types/calendar";

const initialState: IDateState = {
    isLoading: false,
    error: null,
    dates: [],
    date: null,
    openModal: false,
    selectedDateId: null,
    selectedRange: null,
};

const slice = createSlice({
    name: 'date',
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

        // GET DATES
        getDatesSuccess(state, action) {
            state.isLoading = false;
            state.dates = action.payload;
        },

        // CREATE DATE
        createDateSuccess(state, action) {
            const newDate = action.payload;
            state.isLoading = false;
            state.dates = [...state.dates, newDate];
        },

        // UPDATE DATE
        updateDateSuccess(state, action) {
            state.isLoading = false;
            state.dates = state.dates.map((date) => {
                if (date.id === action.payload.id) {
                    return action.payload;
                }
                return date;
            });
        },

        // DELETE DATE
        deleteDateSuccess(state, action) {
            const dateId = action.payload;
            state.dates = state.dates.filter((date) => date.id !== dateId);
        },

        // OPEN MODAL
        openModal(state, action) {
            state.openModal = action.payload;
        },

        // SELECT DATE
        selectDate(state, action) {
            state.date = action.payload;
        },

        // SELECT DATE ID
        selectDateId(state, action) {
            state.selectedDateId = action.payload;
        },

        // SELECT RANGE
        selectRange(state, action) {
            state.selectedRange = action.payload;
        },
    }
});

// ----------------------------------------------------------------------
// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
// Actions
export const {
    startLoading,
    hasError,
    getDatesSuccess,
    createDateSuccess,
    updateDateSuccess,
    deleteDateSuccess,
    openModal,
    selectDate,
    selectDateId,
    selectRange,
} = slice.actions;

// ----------------------------------------------------------------------

export function getDates() {
    return async (dispatch: Dispatch) => {
        dispatch(startLoading());
        try {
            const response = await axios.get('/api/date');
            dispatch(getDatesSuccess(response.data));
        } catch (error) {
            dispatch(hasError(error));
        }
    };
}

// ----------------------------------------------------------------------
export function createDate(data: ICreateDateData) {
    return async (dispatch: Dispatch) => {
        dispatch(startLoading());
        try {
            const response = await axios.post('/api/date', data);
            dispatch(createDateSuccess(response.data));
        } catch (error) {
            dispatch(hasError(error));
        }
    };
}

// ----------------------------------------------------------------------

export function updateDate(data: IDateData) {
    return async (dispatch: Dispatch) => {
        dispatch(startLoading());
        try {
            const response = await axios.post('/api/date', data);
            dispatch(updateDateSuccess(response.data));
        } catch (error) {
            dispatch(hasError(error));
        }
    };
}

// ----------------------------------------------------------------------

export function deleteDate(dateId: string) {
    return async (dispatch: Dispatch) => {
        dispatch(startLoading());
        try {
            await axios.delete('/api/date', {data: {dateId}});
            dispatch(deleteDateSuccess(dateId));
        } catch (error) {
            dispatch(hasError(error));
        }
    };
}

// ----------------------------------------------------------------------