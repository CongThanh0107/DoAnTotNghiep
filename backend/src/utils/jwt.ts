import jwt from 'jsonwebtoken';
import {app} from '../config/vars';

export async function sign(payload: object): Promise<string | any> {
	return new Promise((resolve, reject) => {
		jwt.sign(payload, app.jwtSecret, (err: any, token: string | undefined) => {
			if (err) {
				reject(err);
			}
			resolve(token);
		});
	});
}

export async function verify(token: string): Promise<any> {
	return new Promise((resolve, reject) => {
		jwt.verify(token, app.jwtSecret, (err: any, payload: object | any) => {
			if (err) {
				reject(err);
			}
			resolve(payload);
		});
	});
}