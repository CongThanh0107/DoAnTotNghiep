import {createSlice, Dispatch} from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
import {IShiftDatatate} from '../../@types/shift';
// ----------------------------------------------------------------------

const initialState: IShiftDatatate = {
    isLoading: false,
    error: null,
    shifts: [],
    shift: null,
}

const slice = createSlice({
    name: 'shift',
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

        // GET SHIFTS
        getShiftsSuccess(state, action) {
            state.isLoading = false;
            state.shifts = action.payload;
        },

        // GET SHIFT
        getShiftSuccess(state, action) {
            state.isLoading = false;
            state.shift = action.payload;
        },

        // CREATE SHIFT
        createShiftSuccess(state, action) {
            state.isLoading = false;
            state.shifts.push(action.payload);
        },

        // UPDATE SHIFT
        updateShiftSuccess(state, action) {
            state.isLoading = false;
            state.shift = action.payload;
        },

        // DELETE SHIFT
        deleteShiftSuccess(state, action) {
            state.isLoading = false;
            state.shifts = state.shifts.filter((shift) => shift.id !== action.payload);
        },
    }
});

// Reducer
export default slice.reducer;

// Actions
export const {
    startLoading,
    hasError,
    getShiftsSuccess,
    getShiftSuccess,
    createShiftSuccess,
    updateShiftSuccess,
    deleteShiftSuccess,
} = slice.actions;

// Thunk
export function getShifts(limit: number, page: number) {
    return async (dispatch: Dispatch) => {
        dispatch(startLoading());
        try {
            const response = await axios.get('/api/shifts', {
                params: {
                    limit,
                    page,
                }
            });
            dispatch(getShiftsSuccess(response.data));
        } catch (error) {
            dispatch(hasError(error));
        }
    }
}

export function getShift(id: string) {
    return async (dispatch: Dispatch) => {
        dispatch(startLoading());
        try {
            const response = await axios.get(`/api/shifts/${id}`);
            dispatch(getShiftSuccess(response.data));
        } catch (error) {
            dispatch(hasError(error));
        }
    }
}

export function createShift(data: any) {
    return async (dispatch: Dispatch) => {
        dispatch(startLoading());
        try {
            const response = await axios.post('/api/shifts', data);
            dispatch(createShiftSuccess(response.data));
        } catch (error) {
            dispatch(hasError(error));
        }
    }
}
