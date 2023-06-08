import express from 'express';
import BenefitController from '../controllers/manager/benefit.controller';

const router = express.Router();

const benefitController = new BenefitController();

router.get('/', benefitController.getAllBenefits);

router.post('/', benefitController.createBenefit);

export default router;