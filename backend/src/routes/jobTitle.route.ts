import express from 'express';
import JobTitleController from '../controllers/manager/jobTitle.controller';

const router = express.Router();

const jobTitleController = new JobTitleController();

router.get('/', jobTitleController.getAllJobTitles);

router.post('/', jobTitleController.createJobTitle);

export default router;