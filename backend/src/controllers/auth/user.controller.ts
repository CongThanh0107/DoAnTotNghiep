import BaseController from '../base.controller';
import {SOMETHING_WENT_WRONG} from '../../constants/error.constant';
import {INTERNAL_SERVER_ERROR, UNAUTHORIZED, SUCCESS} from '../../constants/status.constant';
import UserService from "../../services/user.service";
import ScheduleService from "../../services/schedule.service";
import LeaveService from "../../services/leave.service";
import LeaveValidate from "../../validators/leave.validate";

class UserController extends BaseController {
    private userService: UserService;
    private scheduleService: ScheduleService;
    private leaveService: LeaveService;
    private leaveValidate: LeaveValidate;
    constructor() {
        super();
        this.userService = new UserService();
        this.scheduleService = new ScheduleService();
        this.leaveService = new LeaveService();
        this.leaveValidate = new LeaveValidate();
    }

    getSchedules = async (req: object | any, res: object | any) => {
        try {
            const user = req.user;
            const schedules = await this.scheduleService.getSchedulesByEmployeeId(user.employee_id);
            if (!schedules) {
                return res.status(UNAUTHORIZED).json({message: 'Get schedules failed'});
            }
            return res.status(SUCCESS).json({
                message: 'Get schedules success',
                schedules
            });
        } catch (error) {
            console.log(error);
            return res.status(INTERNAL_SERVER_ERROR).json({message: SOMETHING_WENT_WRONG});
        }
    }

    update = async (req: object | any, res: object | any) => {
        try {
            const user = req.user;
            const data: object = req.body;
            const updatedUser = await this.userService.updateUser(user.id, data);
            if (!updatedUser) {
                return res.status(UNAUTHORIZED).json({message: 'Update user failed'});
            }
            return res.status(SUCCESS).json({
                message: 'Update user success',
                updatedUser
            });
        } catch (error) {
            console.log(error);
            return res.status(INTERNAL_SERVER_ERROR).json({message: SOMETHING_WENT_WRONG});
        }
    }

    createLeave = async (req: object | any, res: object | any) => {
        try {
            const user = req.user;
            const data: object = req.body;
            const error: string | null = await this.leaveValidate.validate(data);
            if (error) {
                return res.status(INTERNAL_SERVER_ERROR).json({error});
            }
            const leave = await this.leaveService.createLeave(user.employee_id, data);
            if (!leave) {
                return res.status(UNAUTHORIZED).json({message: 'Create leave failed'});
            }
            return res.status(SUCCESS).json({
                message: 'Create leave success',
                leave
            });
        } catch (error) {
            console.log(error);
            return res.status(INTERNAL_SERVER_ERROR).json({message: SOMETHING_WENT_WRONG});
        }
    }
}

export default UserController;