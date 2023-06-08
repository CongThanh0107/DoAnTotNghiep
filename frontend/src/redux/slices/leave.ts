import {createSlice, Dispatch} from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
// @types
import {ICreateLeaveData, ILeaveData, ILeaveState} from "../../@types/leave";

const initialState: ILeaveState = {
    isLoading: false,
    error: null,
    leaves: [],
    leave: null,
}

const slice = createSlice({
    name: 'leave',
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

        // GET LEAVES
        getLeavesSuccess(state, action) {
            state.isLoading = false;
            state.leaves = action.payload;
        },

        // CREATE LEAVE
        createLeaveSuccess(state, action) {
            const newLeave = action.payload;
            state.isLoading = false;
            state.leaves = [...state.leaves, newLeave];
        },

        // UPDATE LEAVE
        updateLeaveSuccess(state, action) {
            state.isLoading = false;
            state.leaves = state.leaves.map((leave) => {
                if (leave.id === action.payload.id) {
                    return action.payload;
                }
                return leave;
            });
        },

        // DELETE LEAVE
        deleteLeaveSuccess(state, action) {
            const leaveId = action.payload;
            state.leaves = state.leaves.filter((leave) => leave.id !== leaveId);
        },

        // APPROVE LEAVE
        approveLeaveSuccess(state, action) {
            state.isLoading = false;
            state.leaves = state.leaves.map((leave) => {
                if (leave.id === action.payload.id) {
                    return action.payload;
                }
                return leave;
            });
        },

        // REJECT LEAVE
        rejectLeaveSuccess(state, action) {
            state.isLoading = false;
            state.leaves = state.leaves.map((leave) => {
                if (leave.id === action.payload.id) {
                    return action.payload;
                }
                return leave;
            });
        }
    }
});

export default slice.reducer;

// Actions
export const {
    startLoading,
    hasError,
    getLeavesSuccess,
    createLeaveSuccess,
    updateLeaveSuccess,
    deleteLeaveSuccess,
    approveLeaveSuccess,
    rejectLeaveSuccess
} = slice.actions;

// ----------------------------------------------------------------------

export function getLeaves(limit: number, page: number) {
    return async (dispatch: Dispatch) => {
        dispatch(startLoading());
        try {
            const response = await axios.get('/api/leaves', {
                params: {
                    limit,
                    page
                }
            });
            dispatch(getLeavesSuccess(response.data.leaves));
        } catch (error) {
            dispatch(hasError(error.response.data.message));
        }
    }
}

export function createLeave(data: ICreateLeaveData) {
    return async (dispatch: Dispatch) => {
        dispatch(startLoading());
        try {
            const response = await axios.post('/api/auth/profile/leave', data);
            dispatch(createLeaveSuccess(response.data));
        } catch (error) {
            dispatch(hasError(error.response.data.message));
        }
    }
}

export function approveLeave(id: string) {
    return async (dispatch: Dispatch) => {
        dispatch(startLoading());
        try {
            const response = await axios.put(`/api/leaves/approve/${id}`);
            dispatch(approveLeaveSuccess(response.data));
        } catch (error) {
            dispatch(hasError(error.response.data.message));
        }
    }
}

export function rejectLeave(id: string) {
    return async (dispatch: Dispatch) => {
        dispatch(startLoading());
        try {
            const response = await axios.put(`/api/leaves/reject/${id}`);
            dispatch(rejectLeaveSuccess(response.data));
        } catch (error) {
            dispatch(hasError(error.response.data.message));
        }
    }
}