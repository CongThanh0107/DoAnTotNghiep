import BaseController from '../base.controller';
import {INTERNAL_SERVER_ERROR, SUCCESS} from '../../constants/status.constant';
import {SOMETHING_WENT_WRONG} from '../../constants/error.constant';
import LeaveTypeService from "../../services/leaveType.service";
import {Request, Response} from "express";

export default class LeaveTypeController extends BaseController {
    private leaveTypeService: LeaveTypeService;

    constructor() {
        super();
        this.leaveTypeService = new LeaveTypeService();
    }

    getAllLeaveTypes = async (req: any, res: any): Promise<Response> => {
        try {
            const {limit, page} = req.query;
            const leaveTypes: object[] | null = await this.leaveTypeService.getAllLeaveTypes(limit, page);
            if (!leaveTypes) {
                return res.status(INTERNAL_SERVER_ERROR).json({error: SOMETHING_WENT_WRONG});
            }
            return res.status(SUCCESS).json({message: 'Get all success', data: leaveTypes});
        } catch (error) {
            console.log(error);
            return res.status(INTERNAL_SERVER_ERROR).json({message: SOMETHING_WENT_WRONG});
        }
    }

    createLeaveType = async (req: Request, res: Response): Promise<Response> => {
        try {
            const data: object = req.body;
            const leaveType: object | null = await this.leaveTypeService.createLeaveType(data);
            if (!leaveType) {
                return res.status(INTERNAL_SERVER_ERROR).json({error: SOMETHING_WENT_WRONG});
            }
            return res.status(SUCCESS).json({message: 'Create success', data: leaveType});
        } catch (error) {
            console.log(error);
            return res.status(INTERNAL_SERVER_ERROR).json({message: SOMETHING_WENT_WRONG});
        }
    }
}