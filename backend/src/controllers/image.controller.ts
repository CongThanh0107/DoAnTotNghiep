import BaseController from './base.controller';
import {SOMETHING_WENT_WRONG} from '../constants/error.constant';
import {INTERNAL_SERVER_ERROR, UNAUTHORIZED, SUCCESS} from '../constants/status.constant';
import AwsService from '../services/aws.service';


export default class ImageController extends BaseController {
	constructor() {
		super();
	}

	upload = async (req: object | any, res: object | any) => {
		try {
			const user = req.user;
			const now = Date.now();
			const file: object | any = req.files.file;
			if (!file) {
				return res.status(UNAUTHORIZED).json({message: 'No file provided'});
			}
			const fileUploaded = await AwsService.uploadFile(file, `${user.id}-${now}`);
			return res.status(SUCCESS).json({
				message: 'Upload file success',
				photoUrl: fileUploaded.Location
			});
		} catch (error) {
			console.log(error);
			return res.status(INTERNAL_SERVER_ERROR).json({message: SOMETHING_WENT_WRONG});
		}
	};
}