import connection from '../config/database';
import {MysqlError} from 'mysql';

export default function departmentMigrate() {
	connection.query(`CREATE TABLE IF NOT EXISTS departments (
        id CHAR(10) NOT NULL,
        name VARCHAR(255) NOT NULL,
        description VARCHAR(255) NULL,
        location VARCHAR(255) NOT NULL,
        head_of_department CHAR(10) NOT NULL,
        number_of_employees INT NOT NULL,
        image VARCHAR(255) NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at DATETIME NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (head_of_department) REFERENCES employees(id)
    )`, function (error: MysqlError | null) {
		if (error) throw error;
		console.log('Table departments created');
	});
}