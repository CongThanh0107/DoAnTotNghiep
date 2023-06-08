import BaseController from '../base.controller';
import DateService from '../../services/date.service';
import DateValidate from '../../validators/date.validate';
import {CREATE_FAIL, CREATE_SUCCESS, SOMETHING_WENT_WRONG} from '../../constants/error.constant';
import {BAD_REQUEST, INTERNAL_SERVER_ERROR, SUCCESS} from '../../constants/status.constant';

export default class DateController extends BaseController {
	private dateService: DateService;
	private dateValidate: DateValidate;

	constructor() {
		super();
		this.dateService = new DateService();
		this.dateValidate = new DateValidate();
	}

	getAllDates = async (req: any, res: any) => {
		try {
			const {limit, page} = req.query;
			const dates: object | null = await this.dateService.getAllDates(limit, page);
			if (!dates) {
				return res.status(INTERNAL_SERVER_ERROR).json({error: SOMETHING_WENT_WRONG});
			}
			return res.status(SUCCESS).json(dates);
		} catch (error) {
			console.log(error);
			return res.status(INTERNAL_SERVER_ERROR).json({message: SOMETHING_WENT_WRONG});
		}
	};

	createDate = async (req: any, res: any) => {
		const data = req.body;
		try {
			const error: string | null = await this.dateValidate.validate(data);
			if (error) {
				return res.status(BAD_REQUEST).json({error});
			}
			const date: object | null = await this.dateService.createDate(data);
			if (!date) {
				return res.status(INTERNAL_SERVER_ERROR).json({error: CREATE_FAIL});
			}
			return res.status(SUCCESS).json({message: CREATE_SUCCESS, data: date});
		} catch (error) {
			console.log(error);
			return res.status(INTERNAL_SERVER_ERROR).json({message: SOMETHING_WENT_WRONG});
		}
	};
}