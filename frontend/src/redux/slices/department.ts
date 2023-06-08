import {createSlice, Dispatch} from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
// types
import {ICreateDepartmentData, IDepartmentState} from "../../@types/department";

// ----------------------------------------------------------------------

const initialState: IDepartmentState = {
    isLoading: false,
    error: null,
    departments: [],
    department: null,
}

const slice = createSlice({
    name: 'department',
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

        // GET DEPARTMENTS
        getDepartmentsSuccess(state, action) {
            state.isLoading = false;
            state.departments = action.payload;
        },

        // GET DEPARTMENT
        getDepartmentSuccess(state, action) {
            state.isLoading = false;
            state.department = action.payload;
        },

        // CREATE DEPARTMENT
        createDepartmentSuccess(state, action) {
            state.isLoading = false;
            state.departments.push(action.payload);
        },

        // UPDATE DEPARTMENT
        updateDepartmentSuccess(state, action) {
            state.isLoading = false;
            state.department = action.payload;
        },

        // DELETE DEPARTMENT
        deleteDepartmentSuccess(state, action) {
            state.isLoading = false;
            state.departments = state.departments.filter((department) => department.id !== action.payload);
        },
    }
});

// ----------------------------------------------------------------------
export default slice.reducer;

// ACTIONS
export const {
    startLoading,
    hasError,
    getDepartmentsSuccess,
    getDepartmentSuccess,
    createDepartmentSuccess,
    updateDepartmentSuccess,
    deleteDepartmentSuccess,
} = slice.actions;

// ----------------------------------------------------------------------

export function getDepartments(limit: number, page: number) {
    return async (dispatch: Dispatch) => {
        dispatch(startLoading());
        try {
            const response = await axios.get(`/api/departments?limit=${limit}&page=${page}`);
            dispatch(getDepartmentsSuccess(response.data));
        } catch (error) {
            dispatch(hasError(error.response.data));
        }
    }
}

export function createDepartment(data: ICreateDepartmentData) {
    return async (dispatch: Dispatch) => {
        dispatch(startLoading());
        try {
            const response = await axios.post('/api/departments', data);
            dispatch(createDepartmentSuccess(response.data));
        } catch (error) {
            dispatch(hasError(error.response.data));
        }
    }
}