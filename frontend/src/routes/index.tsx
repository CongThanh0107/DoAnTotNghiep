import {Navigate, useRoutes} from 'react-router-dom';
// auth
import AuthGuard from '../auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';
// layouts
import DashboardLayout from '../layouts/dashboard';
// config
import {PATH_AFTER_LOGIN} from '../config-global';
//
import {
    BenefitCreatePage,
    BenefitListPage,
    CalendarPage,
    DashboardApp,
    DepartmentCreatePage,
    DepartmentListPage,
    ShiftCreatePage,
    ShiftListPage,
    EmployeeCreatePage,
    EmployeeListPage,
    JobTitleCreatePage,
    JobTitleListPage,
    LoginPage,
    UserAccountPage,
    UserCreatePage,
    UserListPage,
    LeaveCreatePage,
    LeaveListPage,
} from './elements';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function Routes() {
    return useRoutes([
        {
            path: '/',
            children: [{element: <Navigate to={PATH_AFTER_LOGIN} replace/>, index: true}],
        },
        {
            path: 'auth',
            children: [
                {
                    path: 'login',
                    element: (
                        <GuestGuard>
                            <LoginPage/>
                        </GuestGuard>
                    ),
                },
            ],
        },
        {
            path: 'dashboard',
            element: (
                <AuthGuard>
                    <DashboardLayout/>
                </AuthGuard>
            ),
            children: [
                {element: <Navigate to={PATH_AFTER_LOGIN} replace/>, index: true},
                {path: 'app', element: <DashboardApp/>},
                {path: 'calendar', element: <CalendarPage/>},
                {
                    path: 'benefit',
                    children: [
                        {element: <Navigate to="/dashboard/benefit/list" replace/>, index: true},
                        {path: 'list', element: <BenefitListPage/>},
                        {path: 'create', element: <BenefitCreatePage/>},
                    ],
                },
                {
                    path: 'job-title',
                    children: [
                        {element: <Navigate to="/dashboard/job-title/list" replace/>, index: true},
                        {path: 'list', element: <JobTitleListPage/>},
                        {path: 'create', element: <JobTitleCreatePage/>},
                    ],
                },
                {
                    path: 'department',
                    children: [
                        {element: <Navigate to="/dashboard/department/list" replace/>, index: true},
                        {path: 'list', element: <DepartmentListPage/>},
                        {path: 'create', element: <DepartmentCreatePage/>},
                    ]
                },
                {
                    path: 'shift',
                    children: [
                        {element: <Navigate to="/dashboard/shift/List" replace/>, index: true},
                        {path: 'list', element: <ShiftListPage/>},
                        {path: 'create', element: <ShiftCreatePage/>},
                    ],
                },
                {
                    path: 'employee',
                    children: [
                        {element: <Navigate to="/dashboard/employee/list" replace/>, index: true},
                        {path: 'list', element: <EmployeeListPage/>},
                        {path: 'create', element: <EmployeeCreatePage/>},
                    ],
                },
                {
                    path: 'user',
                    children: [
                        {element: <Navigate to="/dashboard/user/list" replace/>, index: true},
                        {path: 'account', element: <UserAccountPage/>},
                        {path: 'create', element: <UserCreatePage/>},
                        {path: 'list', element: <UserListPage/>},
                    ],
                },
                {
                    path: 'leave',
                    children: [
                        {path: 'create', element: <LeaveCreatePage/>},
                        {path: 'list', element: <LeaveListPage/>},
                    ],
                },
            ],
        },
    ]);
}
