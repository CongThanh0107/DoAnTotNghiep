import {createSlice, Dispatch} from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
// types
import {IBenefitState, ICreateBenefitData} from '../../@types/benefit';

// ----------------------------------------------------------------------
const initialState: IBenefitState = {
    isLoading: false,
    error: null,
    benefits: [],
    benefit: null,
}

const slice = createSlice({
    name: 'benefit',
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

        // GET BENEFITS
        getBenefitsSuccess(state, action) {
            state.isLoading = false;
            state.benefits = action.payload;
        },

        // GET BENEFIT
        getBenefitSuccess(state, action) {
            state.isLoading = false;
            state.benefit = action.payload;
        },

        // CREATE BENEFIT
        createBenefitSuccess(state, action) {
            state.isLoading = false;
            state.benefits.push(action.payload);
        },

        // UPDATE BENEFIT
        updateBenefitSuccess(state, action) {
            state.isLoading = false;
            state.benefit = action.payload;
        },

        // DELETE BENEFIT
        deleteBenefitSuccess(state, action) {
            state.isLoading = false;
            state.benefits = state.benefits.filter((benefit) => benefit.id !== action.payload);
        },
    }
});

export default slice.reducer;

// Actions
export const {
    startLoading,
    hasError,
    getBenefitsSuccess,
    getBenefitSuccess,
    createBenefitSuccess,
    updateBenefitSuccess,
    deleteBenefitSuccess
} = slice.actions;

// ----------------------------------------------------------------------

export function getBenefits(limit: number = 10, page: number = 1) {
    return async (dispatch: Dispatch) => {
        dispatch(startLoading());
        try {
            const response = await axios.get(`/api/benefits`, {
                params: {
                    limit,
                    page,
                }
            });
            console.log(response.data)
            dispatch(getBenefitsSuccess(response.data));
        } catch (error) {
            dispatch(hasError(error));
        }
    }
}

export function getBenefit(id: string) {
    return async (dispatch: Dispatch) => {
        dispatch(startLoading());
        try {
            const response = await axios.get(`/api/benefits/${id}`);
            dispatch(getBenefitSuccess(response.data));
        } catch (error) {
            dispatch(hasError(error));
        }
    }
}

export function createBenefit(data: ICreateBenefitData) {
    return async (dispatch: Dispatch) => {
        dispatch(startLoading());
        try {
            const response = await axios.post(`/api/benefits`, data);
            dispatch(createBenefitSuccess(response.data));
        } catch (error) {
            dispatch(hasError(error));
        }
    }
};