import http from 'http';
import app from './config/express';
import { app as appVars } from './config/vars';
import { connect } from './config/database';
import logger from './config/logger';

const server: http.Server = http.createServer(app);

const port: number = appVars.port || 9000;

connect().then(() => {
	logger.info('Database connected');
}).catch((err) => {
	console.error(err);
	logger.error('Database connection error: ', err);
	process.exit(1);
});

server.listen(port, () => {
	logger.info(`Server is running on port ${port} and in environment ${appVars.env}`,);
});