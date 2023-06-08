import winston, {Logger} from 'winston';
import {app} from './vars';
import {PRODUCTION} from '../constants/app.constant';

const logger: Logger = winston.createLogger({
	level: app.winstonLogs.level,
	format: winston.format.combine(
		winston.format.timestamp({
			format: app.winstonLogs.timestamp,
		}),
		winston.format.label({label: app.winstonLogs.label}),
		winston.format.prettyPrint(),
		winston.format.printf((info) => {
			const {timestamp, level, label, message} = info;
			return `${timestamp} [${label}] ${level}: ${message}`;
		}),
		winston.format.errors({stack: app.winstonLogs.stack}),
	),
});

if (PRODUCTION) {
	logger.add(new winston.transports.Console({
		level: app.winstonLogs.level
	}));
} else {
	logger.add(new winston.transports.Console({
		level: app.winstonLogs.level,
		format: winston.format.combine(
			winston.format.timestamp({
				format: app.winstonLogs.timestamp,
			},
			),
			winston.format.prettyPrint(),
			winston.format.errors({stack: app.winstonLogs.stack})
		),
	}));
}

logger.stream({
	write: (message: string) => {
		logger.info(message);
	}
});

export default logger;