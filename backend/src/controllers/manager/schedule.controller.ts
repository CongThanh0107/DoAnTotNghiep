import BaseController from '../base.controller';
import {INTERNAL_SERVER_ERROR, SUCCESS} from '../../constants/status.constant';
import {SOMETHING_WENT_WRONG} from '../../constants/error.constant';
import ScheduleService from '../../services/schedule.service';
import ScheduleValidate from '../../validators/schedule.validate';

export default class ScheduleController extends BaseController {
	private scheduleService: ScheduleService;
	private scheduleValidate: ScheduleValidate;

	constructor() {
		super();
		this.scheduleService = new ScheduleService();
		this.scheduleValidate = new ScheduleValidate();
	}

	getAllSchedules = async (req: any, res: any) => {
		try {
			const {limit, page} = req.query;
			const schedules: object | null = await this.scheduleService.getAllSchedules(limit, page);
			if (!schedules) {
				return res.status(INTERNAL_SERVER_ERROR).json({error: SOMETHING_WENT_WRONG});
			}
			return res.status(SUCCESS).json(schedules);
		} catch (error) {
			console.log(error);
			return res.status(INTERNAL_SERVER_ERROR).json({message: SOMETHING_WENT_WRONG});
		}
	};

	createSchedule = async (req: any, res: any) => {
		try {
			const data: object = req.body;
			console.log('Request body', data);
			const error: string | null = await this.scheduleValidate.validate(data);
			if (error) {
				return res.status(INTERNAL_SERVER_ERROR).json({error});
			}
			const schedule: object | null = await this.scheduleService.createSchedule(data);
			if (!schedule) {
				return res.status(INTERNAL_SERVER_ERROR).json({error: SOMETHING_WENT_WRONG});
			}
			return res.status(SUCCESS).json({message: 'Create success', data: schedule});
		} catch (error) {
			console.log(error);
			return res.status(INTERNAL_SERVER_ERROR).json({message: SOMETHING_WENT_WRONG});
		}
	};

	updateSchedule = async (req: any, res: any) => {
		try {
			const {id} = req.params;
			const data: object = req.body;
			const schedule: object | null = await this.scheduleService.updateSchedule(id, data);
			if (!schedule) {
				return res.status(INTERNAL_SERVER_ERROR).json({error: SOMETHING_WENT_WRONG});
			}
			return res.status(SUCCESS).json({message: 'Update success', data: schedule});
		} catch (error) {
			console.log(error);
			return res.status(INTERNAL_SERVER_ERROR).json({message: SOMETHING_WENT_WRONG});
		}
	}

	deleteSchedule = async (req: any, res: any) => {
		try {
			const {id} = req.params;
			const schedule: object | null = await this.scheduleService.deleteSchedule(id);
			if (!schedule) {
				return res.status(INTERNAL_SERVER_ERROR).json({error: SOMETHING_WENT_WRONG});
			}
			return res.status(SUCCESS).json({message: 'Delete success', data: schedule});
		} catch (error) {
			console.log(error);
			return res.status(INTERNAL_SERVER_ERROR).json({message: SOMETHING_WENT_WRONG});
		}
	}
}