import BaseController from '../base.controller';
import JobTitleService from '../../services/jobTitle.service';
import JobTitleValidate from '../../validators/jobTitle.validate';
import {CREATE_SUCCESS, CREATE_FAIL, SOMETHING_WENT_WRONG} from '../../constants/error.constant';
import {BAD_REQUEST, INTERNAL_SERVER_ERROR, SUCCESS} from '../../constants/status.constant';

export default class JobTitleController extends BaseController {
	private jobTitleService: JobTitleService;
	private jobTitleValidate: JobTitleValidate;

	constructor() {
		super();
		this.jobTitleService = new JobTitleService();
		this.jobTitleValidate = new JobTitleValidate();
	}

	getAllJobTitles = async (req: any, res: any) => {
		try {
			const {limit, page} = req.query;
			const jobTitles: object | null = await this.jobTitleService.getAllJobTitles(limit, page);
			if (!jobTitles) {
				return res.status(INTERNAL_SERVER_ERROR).json({error: SOMETHING_WENT_WRONG});
			}
			return res.status(SUCCESS).json(jobTitles);
		} catch (error) {
			console.log(error);
			return res.status(INTERNAL_SERVER_ERROR).json({message: SOMETHING_WENT_WRONG});
		}
	};

	createJobTitle = async (req: any, res: any) => {
		try {
			const data: object = req.body;
			const error: string | null = await this.jobTitleValidate.validate(data);
			if (error) {
				return res.status(BAD_REQUEST).json({error});
			}
			const jobTitle: object | null = await this.jobTitleService.createJobTitle(data);
			if (!jobTitle) {
				return res.status(BAD_REQUEST).json({error: CREATE_FAIL});
			}
			return res.status(SUCCESS).json({
				message: CREATE_SUCCESS,
				data: jobTitle
			});
		} catch (error) {
			console.log(error);
			return res.status(INTERNAL_SERVER_ERROR).json({message: SOMETHING_WENT_WRONG});
		}
	};
}