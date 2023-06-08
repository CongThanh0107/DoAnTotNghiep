import express from 'express';
import LoginController from '../../controllers/auth/login.controller';

const router = express.Router();

const loginController = new LoginController();

router.post('/login', loginController.login);

router.get('/account', loginController.account);

export default router;