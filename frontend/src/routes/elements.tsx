import {ElementType, lazy, Suspense} from 'react';
// components
import LoadingScreen from '../components/loading-screen';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) =>
    (
        <Suspense fallback={<LoadingScreen/>}>
            <Component {...props} />
        </Suspense>
    );

// ----------------------------------------------------------------------

// AUTH
export const LoginPage = Loadable(lazy(() => import('../pages/auth/LoginPage')));
// DASHBOARD
export const DashboardApp = Loadable(lazy(() => import('../pages/dashboard/GeneralAppPage')));

// CALENDAR
export const CalendarPage = Loadable(lazy(() => import('../pages/dashboard/CalendarPage')));

// BENEFIT
export const BenefitListPage = Loadable(lazy(() => import('../pages/dashboard/BenefitListPage')));
export const BenefitCreatePage = Loadable(lazy(() => import('../pages/dashboard/BenefitCreatePage')));

// JOB TITLE
export const JobTitleListPage = Loadable(lazy(() => import('../pages/dashboard/JobTitleListPage')));
export const JobTitleCreatePage = Loadable(lazy(() => import('../pages/dashboard/JobTitleCreatePage')));

// DEPARTMENT
export const DepartmentListPage = Loadable(lazy(() => import('../pages/dashboard/DepartmentListPage')));
export const DepartmentCreatePage = Loadable(lazy(() => import('../pages/dashboard/DepartmentCreatePage')));

// SHIFT
export const ShiftListPage = Loadable(lazy(() => import('../pages/dashboard/ShiftListPage')));
export const ShiftCreatePage = Loadable(lazy(() => import('../pages/dashboard/ShiftCreatePage')));

// EMPLOYEE
export const EmployeeListPage = Loadable(lazy(() => import('../pages/dashboard/EmployeeListPage')));
export const EmployeeCreatePage = Loadable(lazy(() => import('../pages/dashboard/EmployeeCreatePage')));

// USER
export const UserAccountPage = Loadable(lazy(() => import('../pages/dashboard/UserAccountPage')));
export const UserCreatePage = Loadable(lazy(() => import('../pages/dashboard/UserCreatePage')));
export const UserListPage = Loadable(lazy(() => import('../pages/dashboard/UserListPage')));

// LEAVE
export const LeaveCreatePage = Loadable(lazy(() => import('../pages/dashboard/LeaveCreatePage')));
export const LeaveListPage = Loadable(lazy(() => import('../pages/dashboard/LeaveListPage')));