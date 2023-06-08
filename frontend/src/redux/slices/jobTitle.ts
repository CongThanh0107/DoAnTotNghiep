import {createSlice, Dispatch} from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
// types
import {IJobTitleState, ICreateJobTitleData} from '../../@types/jobTitle';

// ----------------------------------------------------------------------
const initialState: IJobTitleState = {
    isLoading: false,
    error: null,
    jobTitles: [],
    jobTitle: null,
}

const slice = createSlice({
    name: 'jobTitle',
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

        // GET JOB TITLES
        getJobTitlesSuccess(state, action) {
            state.isLoading = false;
            state.jobTitles = action.payload;
        },

        // GET JOB TITLE
        getJobTitleSuccess(state, action) {
            state.isLoading = false;
            state.jobTitle = action.payload;
        },

        // CREATE JOB TITLE
        createJobTitleSuccess(state, action) {
            state.isLoading = false;
            state.jobTitles.push(action.payload);
        },

        // UPDATE JOB TITLE
        updateJobTitleSuccess(state, action) {
            state.isLoading = false;
            state.jobTitle = action.payload;
        },

        // DELETE JOB TITLE
        deleteJobTitleSuccess(state, action) {
            state.isLoading = false;
            state.jobTitles = state.jobTitles.filter((jobTitle) => jobTitle.id !== action.payload);
        }
    }
});

export default slice.reducer;

// Actions
export const {
    startLoading,
    hasError,
    getJobTitlesSuccess,
    getJobTitleSuccess,
    createJobTitleSuccess,
    updateJobTitleSuccess,
    deleteJobTitleSuccess
} = slice.actions;

// ----------------------------------------------------------------------
export const getJobTitles = (limit: number, page: number) => async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
        const response = await axios.get('/api/jobTitles', {
            params: {
                limit,
                page
            }
        });
        dispatch(getJobTitlesSuccess(response.data));
    } catch (error) {
        dispatch(hasError(error.message));
    }
}

export function createJobTitle(data: ICreateJobTitleData) {
    return async (dispatch: Dispatch) => {
        dispatch(startLoading());
        try {
            const response = await axios.post('/api/jobTitles', data);
            dispatch(createJobTitleSuccess(response.data));
        } catch (error) {
            dispatch(hasError(error.message));
        }
    }
}