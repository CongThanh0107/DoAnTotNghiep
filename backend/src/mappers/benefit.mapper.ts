import Benefit from '../models/benefit.model';
import uuid4 from '../utils/uuid4';

export default class BenefitMapper {
	async map(data: object | any): Promise<Benefit> {
		return new Promise((resolve) => {
			const benefit = new Benefit();
			benefit.setId(uuid4());
			benefit.setHealthInsurance(data.health_insurance);
			benefit.setDentalInsurance(data.dental_insurance);
			benefit.setVisionInsurance(data.vision_insurance);
			benefit.setRetirementPlan(data.retirement_plan);
			benefit.setVacationDays(data.vacation_days);
			resolve(benefit);
		});
	}
}