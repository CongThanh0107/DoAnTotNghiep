import connection from '../config/database';
import {MysqlError} from 'mysql';

export default function userMigrate() {
	connection.query(`CREATE TABLE IF NOT EXISTS users (
        id CHAR(10) NOT NULL,
        employee_id CHAR(10) NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        avatar VARCHAR(255),
        password VARCHAR(255) NOT NULL,
        role CHAR(10) NOT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at DATETIME NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (employee_id) REFERENCES employees(id),
        UNIQUE (email)
    )`, function (error: MysqlError | null) {
		if (error) throw error;
		console.log('Table users created');
	});
}
