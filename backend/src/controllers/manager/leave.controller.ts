import BaseController from "../base.controller";
import LeaveService from "../../services/leave.service";

export default class LeaveController extends BaseController {
    private leaveService: LeaveService;

    constructor() {
        super();
        this.leaveService = new LeaveService();
    }

    getAllLeaves = async (req: object | any, res: object | any) => {
        try {
            const {limit, page} = req.query;
            const leaves = await this.leaveService.getAllLeaves(limit, page);
            if (!leaves) {
                return res.status(500).json({message: 'Get all leaves failed'});
            }
            return res.status(200).json({
                message: 'Get all leaves success',
                leaves
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Something went wrong'});
        }
    }

    approveLeave = async (req: object | any, res: object | any) => {
        try {
            const {id} = req.params;

            const leave = await this.leaveService.approveLeave(id);
            if (!leave) {
                return res.status(500).json({message: 'Approve leave failed'});
            }
            return res.status(200).json({
                message: 'Approve leave success',
                leave
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Something went wrong'});
        }
    }

    rejectLeave = async (req: object | any, res: object | any) => {
        try {
            const {id} = req.params;
            const leave = await this.leaveService.rejectLeave(id);
            if (!leave) {
                return res.status(500).json({message: 'Reject leave failed'});
            }
            return res.status(200).json({
                message: 'Reject leave success',
                leave
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Something went wrong'});
        }
    }
}