import express from 'express';
import UserControllers from '../../controllers/admin/user.controller';

const router = express.Router();

const userControllers = new UserControllers();

router.get('/', userControllers.getAll);

router.get('/:email', userControllers.getOne);

export default router;