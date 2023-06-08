import connection from '../config/database';
import { MysqlError} from 'mysql';
import {database} from '../config/vars';

export default function databaseMigrate() {
	connection.query(`DROP DATABASE IF EXISTS ${database.name}`, function (error: MysqlError | null) {
		if (error) throw error;
		console.log('Database dropped');
	});

	connection.query(`CREATE DATABASE IF NOT EXISTS ${database.name}`, function (error: MysqlError | null) {
		if (error) throw error;
		console.log('Database created');
	});

	connection.query(`USE ${database.name}`, function (error: MysqlError | null) {
		if (error) throw error;
	});
}