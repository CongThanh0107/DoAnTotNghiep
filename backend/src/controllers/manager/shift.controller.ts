import BaseController from '../base.controller';
import ShiftService from '../../services/shift.service';
import ShiftValidate from '../../validators/shift.validate';
import {INTERNAL_SERVER_ERROR, SUCCESS} from '../../constants/status.constant';
import {SOMETHING_WENT_WRONG} from '../../constants/error.constant';

export default class ShiftController extends BaseController {
    private shiftService: ShiftService;
    private shiftValidate: ShiftValidate;

    constructor() {
        super();
        this.shiftService = new ShiftService();
        this.shiftValidate = new ShiftValidate();
    }

    getAllShifts = async (req: any, res: any) => {
        try {
            const {limit, page} = req.query;
            const shifts = await this.shiftService.getAllShifts(limit, page);
            if (!shifts) {
                return res.status(INTERNAL_SERVER_ERROR).json({error: SOMETHING_WENT_WRONG});
            }
            return res.status(SUCCESS).json(shifts);
        } catch (error) {
            console.log(error);
            return res.status(INTERNAL_SERVER_ERROR).json({message: SOMETHING_WENT_WRONG});
        }
    }

    createShift = async (req: any, res: any) => {
        try {
            const data = req.body;
            const error = await this.shiftValidate.validate(data);
            console.log(error);
            if (error) {
                return res.status(INTERNAL_SERVER_ERROR).json({error});
            }
            const shift = await this.shiftService.createShift(data);
            if (!shift) {
                return res.status(INTERNAL_SERVER_ERROR).json({error: SOMETHING_WENT_WRONG});
            }
            return res.status(SUCCESS).json({message: 'Create success', data: shift});
        } catch (error) {
            console.log(error);
            return res.status(INTERNAL_SERVER_ERROR).json({message: SOMETHING_WENT_WRONG});
        }
    }
}