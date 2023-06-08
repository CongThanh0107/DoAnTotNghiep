// routes
import {PATH_DASHBOARD} from '../../../routes/paths';
// components
import SvgColor from '../../../components/svg-color';
// ----------------------------------------------------------------------


const icon = (name: string) => (
    <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{width: 1, height: 1}}/>
);

const ICONS = {
    blog: icon('ic_blog'),
    cart: icon('ic_cart'),
    chat: icon('ic_chat'),
    mail: icon('ic_mail'),
    user: icon('ic_user'),
    file: icon('ic_file'),
    lock: icon('ic_lock'),
    label: icon('ic_label'),
    blank: icon('ic_blank'),
    kanban: icon('ic_kanban'),
    folder: icon('ic_folder'),
    banking: icon('ic_banking'),
    booking: icon('ic_booking'),
    invoice: icon('ic_invoice'),
    calendar: icon('ic_calendar'),
    disabled: icon('ic_disabled'),
    external: icon('ic_external'),
    menuItem: icon('ic_menu_item'),
    ecommerce: icon('ic_ecommerce'),
    analytics: icon('ic_analytics'),
    dashboard: icon('ic_dashboard'),
};

const itemsManager = [
    // CALENDAR
    {
        title: 'calendar',
        path: PATH_DASHBOARD.calendar.root,
        icon: ICONS.calendar,
    },
    // BENEFITS
    {
        title: 'benefit',
        path: PATH_DASHBOARD.benefit.root,
        icon: ICONS.banking,
        children: [
            {title: 'list', path: PATH_DASHBOARD.benefit.list},
            {title: 'create', path: PATH_DASHBOARD.benefit.create},
        ],
    },
    // JOB TITLE
    {
        title: 'job title',
        path: PATH_DASHBOARD.jobTitle.root,
        icon: ICONS.label,
        children: [
            {title: 'list', path: PATH_DASHBOARD.jobTitle.list},
        ],
    },
    // EMPLOYEE
    {
        title: 'employee',
        path: PATH_DASHBOARD.employee.root,
        icon: ICONS.external,
        children: [
            {title: 'list', path: PATH_DASHBOARD.employee.list},
            {title: 'create', path: PATH_DASHBOARD.employee.create}
        ]
    },
    // DEPARTMENT
    {
        title: 'department',
        path: PATH_DASHBOARD.department.root,
        icon: ICONS.folder,
        children: [
            {title: 'list', path: PATH_DASHBOARD.department.list},
            {title: 'create', path: PATH_DASHBOARD.department.create},
        ],
    },
    // USER
    {
        title: 'user',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
            {title: 'list', path: PATH_DASHBOARD.user.list},
            {title: 'create', path: PATH_DASHBOARD.user.create},
        ],
    },
    // LEAVE
    {
        title: 'leave',
        path: PATH_DASHBOARD.leave.root,
        icon: ICONS.chat,
        children: [
            {title: 'list', path: PATH_DASHBOARD.leave.list},
        ],
    }
];

const itemsUser: any = [
    // CALENDAR
    {
        title: 'calendar',
        path: PATH_DASHBOARD.calendar.root,
        icon: ICONS.calendar,
    },
    // LEAVE
    {
        title: 'leave',
        path: PATH_DASHBOARD.leave.root,
        icon: ICONS.banking,
        children: [
            {title: 'create', path: PATH_DASHBOARD.leave.create},
        ],
    }
];

const itemsAdmin: any = [
    // USER
    {
        title: 'user',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
            {title: 'list', path: PATH_DASHBOARD.user.list},
            {title: 'create', path: PATH_DASHBOARD.user.create},
        ],
    },
];


const navConfig = [
    // GENERAL
    // ----------------------------------------------------------------------
    {
        subheader: 'general',
        items: [
            {title: 'app', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard},
        ],
    },

    // MANAGEMENT
    // ----------------------------------------------------------------------
    {
        subheader: 'management',
        items: itemsManager
    },

    // DEMO MENU STATES
    {
        subheader: 'Other cases',
        items: [
            {
                // default roles : All roles can see this entry.
                // roles: ['user'] Only users can see this item.
                // roles: ['admin'] Only admin can see this item.
                // roles: ['admin', 'manager'] Only admin/manager can see this item.
                // Reference from 'src/guards/RoleBasedGuard'.
                title: 'item_by_roles',
                path: PATH_DASHBOARD.permissionDenied,
                icon: ICONS.lock,
                roles: ['admin'],
                caption: 'only_admin_can_see_this_item',
            },
            {
                title: 'blank',
                path: PATH_DASHBOARD.blank,
                icon: ICONS.blank,
            },
        ],
    },
];

export const navConfigUser = [
    // GENERAL
    // ----------------------------------------------------------------------
    {
        subheader: 'general',
        items: [
            {title: 'app', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard},
        ],
    },

    // MANAGEMENT
    // ----------------------------------------------------------------------
    {
        subheader: 'management',
        items: itemsUser
    },

    // DEMO MENU STATES
    {
        subheader: 'Other cases',
        items: [
            {
                // default roles : All roles can see this entry.
                // roles: ['user'] Only users can see this item.
                // roles: ['admin'] Only admin can see this item.
                // roles: ['admin', 'manager'] Only admin/manager can see this item.
                // Reference from 'src/guards/RoleBasedGuard'.
                title: 'item_by_roles',
                path: PATH_DASHBOARD.permissionDenied,
                icon: ICONS.lock,
                roles: ['admin'],
                caption: 'only_admin_can_see_this_item',
            },
            {
                title: 'blank',
                path: PATH_DASHBOARD.blank,
                icon: ICONS.blank,
            },
        ],
    },
];

export const navConfigAdmin = [
    // GENERAL
    // ----------------------------------------------------------------------
    {
        subheader: 'general',
        items: [
            {title: 'app', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard},
        ],
    },

    // MANAGEMENT
    // ----------------------------------------------------------------------
    {
        subheader: 'management',
        items: itemsAdmin
    },

    // DEMO MENU STATES
    {
        subheader: 'Other cases',
        items: [
            {
                // default roles : All roles can see this entry.
                // roles: ['user'] Only users can see this item.
                // roles: ['admin'] Only admin can see this item.
                // roles: ['admin', 'manager'] Only admin/manager can see this item.
                // Reference from 'src/guards/RoleBasedGuard'.
                title: 'item_by_roles',
                path: PATH_DASHBOARD.permissionDenied,
                icon: ICONS.lock,
                roles: ['admin'],
                caption: 'only_admin_can_see_this_item',
            },
            {
                title: 'blank',
                path: PATH_DASHBOARD.blank,
                icon: ICONS.blank,
            },
        ],
    },
];

export default navConfig;
