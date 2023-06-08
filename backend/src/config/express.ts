import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { app as appVars } from './vars';
import bodyParser from 'body-parser';
import {PRODUCTION} from '../constants/app.constant';
import logger from './logger';
import PassportConfig from './passport';
import AllRouter from '../routes';

const app = express();

// enable files upload
app.use(fileUpload({
	createParentPath: true
}));

// Passport config
PassportConfig.initialize();

// set security HTTP headers
app.use(helmet());
app.use(cors());

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// enable detailed API logging in dev env
app.use(morgan(appVars.logs, {
	stream: {
		write: (message: string) => {
			logger.info(message);
		}
	},
	skip: () => PRODUCTION,
}));

// mount all routes on /api path
app.use('/api', AllRouter);

export default app;
