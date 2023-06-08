import mysql, {MysqlError} from 'mysql';
import {database} from './vars';

const connection: mysql.Connection = mysql.createConnection({
	host: database.host,
	port: Number(database.port),
	user: database.user,
	password: database.password,
});

export async function connect(): Promise<void> {
	return new Promise((resolve, reject) => {
		connection.connect((err: MysqlError) => {
			if (err) {
				reject(err);
			}
			connection.query(`USE ${database.name}`, function (error: MysqlError | null) {
				if (error) throw error;
			});
			resolve();
		});
	});
}

export default connection;