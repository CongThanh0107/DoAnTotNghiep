import express from 'express';
import RegisterController from '../../controllers/auth/register.controller';

const router = express.Router();

const registerController = new RegisterController();

router.post('/', registerController.register);

export default router;