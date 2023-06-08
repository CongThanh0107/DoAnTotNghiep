import {createSlice, Dispatch} from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
// types
import {IEmployeeState} from '../../@types/employee';

// ----------------------------------------------------------------------
const initialState: IEmployeeState = {
    isLoading: false,
    error: null,
    employees: [],
    employee: null,
}

const slice = createSlice({
    name: 'employee',
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

        // GET EMPLOYEES
        getEmployeesSuccess(state, action) {
            state.isLoading = false;
            state.employees = action.payload;
        },

        // GET EMPLOYEE
        getEmployeeSuccess(state, action) {
            state.isLoading = false;
            state.employee = action.payload;
        },

        // CREATE EMPLOYEE
        createEmployeeSuccess(state, action) {
            state.isLoading = false;
            state.employees.push(action.payload);
        },

        // UPDATE EMPLOYEE
        updateEmployeeSuccess(state, action) {
            state.isLoading = false;
            state.employee = action.payload;
        },

        // DELETE EMPLOYEE
        deleteEmployeeSuccess(state, action) {
            state.isLoading = false;
            state.employees = state.employees.filter((employee) => employee.id !== action.payload);
        },
    }
});

export default slice.reducer;

// Actions
export const {
    startLoading,
    hasError,
    getEmployeesSuccess,
    getEmployeeSuccess,
    createEmployeeSuccess,
    updateEmployeeSuccess,
    deleteEmployeeSuccess
} = slice.actions;

// ----------------------------------------------------------------------

export function getEmployees(limit: number = 10, page: number = 1) {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(startLoading());
            const response = await axios.get(`/api/employees?limit=${limit}&page=${page}`);
            dispatch(getEmployeesSuccess(response.data));
        } catch (error) {
            dispatch(hasError(error));
        }
    }
}

export function createEmployee(data: object) {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(startLoading());
            const response = await axios.post(`/api/employees`, data);
            dispatch(createEmployeeSuccess(response.data));
        } catch (error) {
            dispatch(hasError(error));
        }
    }
}