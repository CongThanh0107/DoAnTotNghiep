import path from 'path';

// import .env variables
import dotenv from 'dotenv-safe';

dotenv.config({
	path: path.join(__dirname, '../../.env'),
	example: path.join(__dirname, '../../.env.example'),
});

export const app = {
	env: process.env.NODE_ENV,
	port: Number(process.env.PORT),
	jwtSecret: String(process.env.JWT_SECRET),
	jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
	dirUpload: process.env.DIR_UPLOAD,

	// Used by winston logger
	logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
	winstonLogs: {
		level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
		errorFileName: 'logs/error.log',
		combinedFileName: 'logs/combined.log',
		label: 'NhiVo-Ecommerce',
		timestamp: 'DD-MM-YYYY HH:mm:ss',
		prettyPrint: true,
		stack: true
	},
	api: {
		prefix: '/api'
	}
};

export const database = {
	host: process.env.DATABASE_HOST,
	port: process.env.DATABASE_PORT,
	user: process.env.DATABASE_USERNAME,
	password: process.env.DATABASE_PASSWORD,
	name: process.env.DATABASE_NAME
};

export const aws = {
	bucket: process.env.AWS_BUCKET || '',
	accessKeyId: process.env.AWS_ACCESS_KEY || '',
	secretKey: process.env.AWS_SECRET_KEY || '',
	region: process.env.AWS_REGION || '',
	directory: process.env.AWS_DIRECTORY || ''
};

export const email = {
	service: process.env.EMAIL_SERVICE,
	sender: process.env.EMAIL_SENDER,
	password: process.env.EMAIL_PASSWORD,
	name: process.env.EMAIL_NAME
}


