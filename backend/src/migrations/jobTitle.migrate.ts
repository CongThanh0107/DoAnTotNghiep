import connection from '../config/database';
import {MysqlError} from 'mysql';

export default function jobTitleMigration () {
	connection.query(`CREATE TABLE IF NOT EXISTS job_titles (
        id CHAR(10) NOT NULL,
        name VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        salary_range VARCHAR(255) NOT NULL,
        benefit VARCHAR(255) NOT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at DATETIME NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (benefit) REFERENCES benefits(id)
    )`, function (error: MysqlError | null) {
		if (error) throw error;
		console.log('Table job_titles created');
	});
}