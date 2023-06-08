import connection from '../config/database';
import {MysqlError} from 'mysql';

export default function employeeMigrate() {
	connection.query(`CREATE TABLE IF NOT EXISTS employees (
        id CHAR(10) NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone CHAR(12) NOT NULL,
        address VARCHAR(255) NOT NULL,
        job_title CHAR(10) NOT NULL,
        date_of_hire DATE NOT NULL,
        date_of_birth DATE NOT NULL,
        gender CHAR(10) NOT NULL,
        salary DECIMAL(10,2) NOT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at DATETIME NULL,
        PRIMARY KEY (id),
        UNIQUE (email),
        FOREIGN KEY (job_title) REFERENCES job_titles(id)
    )`, function (error: MysqlError | null) {
		if (error) throw error;
		console.log('Table employees created');
	});
}