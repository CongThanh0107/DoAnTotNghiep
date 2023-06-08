import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import calendarReducer from './slices/calendar';
import userReducer from './slices/user';
import benefitReducer from './slices/benefit';
import jobTitleReducer from './slices/jobTitle';
import employeeReducer from './slices/employee'
import departmentReducer from './slices/department';
import shiftReducer from './slices/shift';
import leaveReducer from './slices/leave';
import leaveType from "./slices/leaveType";

export const rootPersistConfig = {
    key: 'root',
    storage,
    keyPrefix: 'redux-',
    whitelist: [],
}

export const calendarPersistConfig = {
    key: 'calendar',
    storage,
    keyPrefix: 'redux-',
    whitelist: [],
}

export const userPersistConfig = {
    key: 'user',
    storage,
    keyPrefix: 'redux-',
    whitelist: [],
}

export const benefitPersistConfig = {
    key: 'benefit',
    storage,
    keyPrefix: 'redux-',
    whitelist: [],
}

export const jobTitlePersistConfig = {
    key: 'jobTitle',
    storage,
    keyPrefix: 'redux-',
    whitelist: [],
}

export const employeePersistConfig = {
    key: 'employee',
    storage,
    keyPrefix: 'redux-',
    whitelist: [],
}

export const departmentPersistConfig = {
    key: 'department',
    storage,
    keyPrefix: 'redux-',
    whitelist: [],
}

export const shiftPersistConfig = {
    key: 'shift',
    storage,
    keyPrefix: 'redux-',
    whitelist: [],
}

export const leavePersistConfig = {
    key: 'leave',
    storage,
    keyPrefix: 'redux-',
    whitelist: [],
}

export const leaveTypePersistConfig = {
    key: 'leaveType',
    storage,
    keyPrefix: 'redux-',
    whitelist: [],
}

const rootReducer = combineReducers({
    calendar: persistReducer(calendarPersistConfig, calendarReducer),
    user: persistReducer(userPersistConfig, userReducer),
    benefit: persistReducer(benefitPersistConfig, benefitReducer),
    jobTitle: persistReducer(jobTitlePersistConfig, jobTitleReducer),
    employee: persistReducer(employeePersistConfig, employeeReducer),
    department: persistReducer(departmentPersistConfig, departmentReducer),
    shift: persistReducer(shiftPersistConfig, shiftReducer),
    leave: persistReducer(leavePersistConfig, leaveReducer),
    leaveType: persistReducer(leaveTypePersistConfig, leaveType),
});

export default rootReducer;