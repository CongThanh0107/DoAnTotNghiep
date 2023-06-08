import express from 'express';
import AuthMiddleware from '../middlewares/auth';
import AdminRouter from './admin';
import AuthRouter from './auth';
import BenefitRouter from './benefit.route';
import DepartmentRouter from './department.route';
import EmployeeRouter from './employee.route';
import JobTitleRouter from './jobTitle.route';
import ScheduleRouter from './schedule.route';
import DateRouter from './date.route';
import ShiftRouter from './shift.route';
import LeaveTypeRouter from './leaveType.route';
import LeaveRouter from "./leave.route";
import ImageRouter from './image.route';

import {ADMIN, MANAGER} from '../constants/auth.constant';

const router = express.Router();

router.get('/ping', (_req: object | any, res: object | any) => {
    res.status(200).send('I am alive!');
});

router.use('/admin',
    AuthMiddleware.authenticate,
    AuthMiddleware.authorize([ADMIN, MANAGER]),
    AdminRouter
);

router.use('/images',
    AuthMiddleware.authenticate,
    ImageRouter
);

router.use('/employees',
    AuthMiddleware.authenticate,
    AuthMiddleware.authorize([MANAGER]),
    EmployeeRouter
);

router.use('/dates',
    AuthMiddleware.authenticate,
    AuthMiddleware.authorize([MANAGER]),
    DateRouter
);

router.use('/schedules',
    AuthMiddleware.authenticate,
    AuthMiddleware.authorize([MANAGER]),
    ScheduleRouter
);

router.use('/benefits',
    AuthMiddleware.authenticate,
    AuthMiddleware.authorize([MANAGER]),
    BenefitRouter
);

router.use('/departments',
    AuthMiddleware.authenticate,
    AuthMiddleware.authorize([MANAGER]),
    DepartmentRouter
);

router.use('/jobTitles',
    AuthMiddleware.authenticate,
    AuthMiddleware.authorize([MANAGER]),
    JobTitleRouter
);

router.use('/shifts',
    AuthMiddleware.authenticate,
    AuthMiddleware.authorize([MANAGER]),
    ShiftRouter
);

router.use('/leaveTypes',
    AuthMiddleware.authenticate,
    LeaveTypeRouter
);

router.use('/leaves',
    AuthMiddleware.authenticate,
    AuthMiddleware.authorize([MANAGER]),
    LeaveRouter
);

router.use('/auth', AuthRouter);

export default router;