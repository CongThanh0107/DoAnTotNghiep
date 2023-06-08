import {createSlice, Dispatch} from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
import {IUserState} from '../../@types/user';
// ----------------------------------------------------------------------

const initialState: IUserState = {
    isLoading: false,
    error: null,
    users: [],
    user: null,
}

const slice = createSlice({
    name: 'user',
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

        // GET USERS
        getUsersSuccess(state, action) {
            state.isLoading = false;
            state.users = action.payload;
        },

        // GET USER
        getUserSuccess(state, action) {
            state.isLoading = false;
            state.user = action.payload;
        },

        // CREATE USER
        createUserSuccess(state, action) {
            state.isLoading = false;
            state.users.push(action.payload);
        },

        // UPDATE USER
        updateUserSuccess(state, action) {
            state.isLoading = false;
            state.user = action.payload;
        },

        // DELETE USER
        deleteUserSuccess(state, action) {
            state.isLoading = false;
            state.users = state.users.filter((user) => user.id !== action.payload);
        },
    }
});

// Reducer
export default slice.reducer;

// Actions
export const {
    startLoading,
    hasError,
    getUsersSuccess,
    getUserSuccess,
    createUserSuccess,
    updateUserSuccess,
    deleteUserSuccess
} = slice.actions;

// ----------------------------------------------------------------------

export function getUsers(limit: number, page: number) {
    return async (dispatch: Dispatch) => {
        dispatch(startLoading());
        try {
            const response = await axios.get('/api/admin/users', {
                params: {
                    limit,
                    page
                }
            });
            dispatch(getUsersSuccess(response.data));
        } catch (error) {
            dispatch(hasError(error.message));
        }
    };
}

export function getUser(email: string) {
    return async (dispatch: Dispatch) => {
            dispatch(startLoading());
        try {
            const response = await axios.get(`/api/admin/users/${email}`);
            dispatch(getUserSuccess(response.data));
        } catch (error) {
            dispatch(hasError(error.message));
        }
    };
}

export function updateUser(data: object) {
    return async (dispatch: Dispatch) => {
        dispatch(startLoading());
        try {
            const response = await axios.put(`/api/auth/profile`, data);
            dispatch(updateUserSuccess(response.data));
        } catch (error) {
            dispatch(hasError(error.message));
        }
    };
}