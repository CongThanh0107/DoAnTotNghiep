// ----------------------------------------------------------------------

function path(root: string, sublink: string): string {
    return root + sublink;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
    root: ROOTS_AUTH,
    login: path(ROOTS_AUTH, '/login'),
    register: path(ROOTS_AUTH, '/register'),
}

export const PATH_PAGE = {
    comingSoon: '/coming-soon',
    maintenance: '/maintenance',
    pricing: '/pricing',
    about: '/about-us',
    contact: '/contact-us',
    faqs: '/faqs',
    page403: '/403',
    page404: '/404',
    page500: '/500',
};

export const PATH_DASHBOARD = {
    root: ROOTS_DASHBOARD,
    blank: path(ROOTS_DASHBOARD, '/blank'),
    permissionDenied: path(ROOTS_DASHBOARD, '/permission-denied'),
    general: {
        app: path(ROOTS_DASHBOARD, '/app'),
    },
    calendar: {
        root: path(ROOTS_DASHBOARD, '/calendar'),
    },
    benefit: {
        root: path(ROOTS_DASHBOARD, '/benefit'),
        list: path(ROOTS_DASHBOARD, '/benefit/list'),
        create: path(ROOTS_DASHBOARD, '/benefit/create'),
    },
    jobTitle: {
        root: path(ROOTS_DASHBOARD, '/job-title'),
        list: path(ROOTS_DASHBOARD, '/job-title/list'),
        create: path(ROOTS_DASHBOARD, '/job-title/create'),
    },
    department: {
        root: path(ROOTS_DASHBOARD, '/department'),
        list: path(ROOTS_DASHBOARD, '/department/list'),
        create: path(ROOTS_DASHBOARD, '/department/create'),
        view: (id: string) => path(ROOTS_DASHBOARD, `/department/view/${id}`),
    },
    shift: {
        root: path(ROOTS_DASHBOARD, '/shift'),
        list: path(ROOTS_DASHBOARD, '/shift/list'),
        create: path(ROOTS_DASHBOARD, '/shift/create'),
    },
    employee: {
        root: path(ROOTS_DASHBOARD, '/employee'),
        list: path(ROOTS_DASHBOARD, '/employee/list'),
        create: path(ROOTS_DASHBOARD, '/employee/create'),
    },
    user: {
        root: path(ROOTS_DASHBOARD, '/user'),
        list: path(ROOTS_DASHBOARD, '/user/list'),
        create: path(ROOTS_DASHBOARD, '/user/create'),
        edit: (email: string) => path(ROOTS_DASHBOARD, `/user/edit/${email}`),
        detail: (name: string) => path(ROOTS_DASHBOARD, `/user/detail/${name}`),
        account: path(ROOTS_DASHBOARD, `/user/account`),
    },
    leave: {
        root: path(ROOTS_DASHBOARD, '/leave'),
        list: path(ROOTS_DASHBOARD, '/leave/list'),
        create: path(ROOTS_DASHBOARD, '/leave/create'),
    }
}