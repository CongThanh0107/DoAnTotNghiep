import BaseController from '../base.controller';
import BenefitService from '../../services/benefit.service';
import BenefitValidate from '../../validators/benefit.validate';
import {CREATE_FAIL, CREATE_SUCCESS, SOMETHING_WENT_WRONG} from '../../constants/error.constant';
import {BAD_REQUEST, INTERNAL_SERVER_ERROR, SUCCESS} from '../../constants/status.constant';

export default class BenefitController extends BaseController {
	private benefitService: BenefitService;
	private benefitValidate: BenefitValidate;

	constructor() {
		super();
		this.benefitService = new BenefitService();
		this.benefitValidate = new BenefitValidate();
	}

	getAllBenefits = async (req: any, res: any) => {
		try {
			const queries: object = req.query;
			const benefits: object[] = await this.benefitService.getAllBenefits(queries);
			if (!benefits) {
				return res.status(INTERNAL_SERVER_ERROR).json({error: SOMETHING_WENT_WRONG});
			}
			return res.status(SUCCESS).json(benefits);
		} catch (error) {
			console.log(error);
			return res.status(INTERNAL_SERVER_ERROR).json({message: SOMETHING_WENT_WRONG});
		}
	};

	createBenefit = async (req: any, res: any) => {
		try {
			const data: object = req.body;
			const error: string | null = await this.benefitValidate.validate(data);
			if (error) {
				return res.status(BAD_REQUEST).json({error});
			}
			const benefit: object | null = await this.benefitService.createBenefit(data);
			if (!benefit) {
				return res.status(INTERNAL_SERVER_ERROR).json({error: CREATE_FAIL});
			}
			return res.status(SUCCESS).json({message: CREATE_SUCCESS, data: benefit});
		} catch (error) {
			console.log(error);
			return res.status(INTERNAL_SERVER_ERROR).json({message: SOMETHING_WENT_WRONG});
		}
	};
}