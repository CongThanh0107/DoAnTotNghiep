import {createSlice, Dispatch} from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
// @types
import {ILeaveTypeData, ILeaveTypeState} from "../../@types/leaveType";

const initialState: ILeaveTypeState = {
    isLoading: false,
    error: null,
    leaveTypes: [],
    leaveType: null,
}

const slice = createSlice({
    name: 'leaveType',
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

        // GET LEAVE TYPES
        getLeaveTypesSuccess(state, action) {
            state.isLoading = false;
            state.leaveTypes = action.payload;
        },
    }
});

export default slice.reducer;

// Actions
export const {startLoading, hasError, getLeaveTypesSuccess} = slice.actions;

export const getLeaveTypes = () => async (dispatch: Dispatch) => {
    try {
        dispatch(startLoading());
        const response = await axios.get('/api/leaveTypes');
        dispatch(getLeaveTypesSuccess(response.data.data));
    } catch (error) {
        dispatch(hasError(error.response.data.message));
    }
}