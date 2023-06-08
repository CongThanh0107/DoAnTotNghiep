import express from 'express';
import RegisterRouter from './register.route';
import LoginRouter from './login.route';
import UserRouter from './user.route';
import AuthMiddleware from '../../middlewares/auth';

const router = express.Router();

router.use('/register', RegisterRouter);

router.use('/', LoginRouter);

router.use(
    '/profile',
    AuthMiddleware.authenticate,
    UserRouter
);

export default router;