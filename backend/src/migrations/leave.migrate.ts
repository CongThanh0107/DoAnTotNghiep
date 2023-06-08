import connection from '../config/database';
import { MysqlError } from 'mysql';

export default function leaveMigrate() {
	connection.query(`CREATE TABLE IF NOT EXISTS leaves (
        id VARCHAR(255) NOT NULL,
        employee_id CHAR(10) NOT NULL,
        leave_type_id VARCHAR(255) NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        description VARCHAR(255) NOT NULL,
        status VARCHAR(255) NOT NULL,
        created_at DATETIME NOT NULL,
        updated_at DATETIME NOT NULL,
        deleted_at DATETIME NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (employee_id) REFERENCES employees(id),
        FOREIGN KEY (leave_type_id) REFERENCES leave_type(id)
    )`, function (error: MysqlError | null) {
		if (error) throw error;
		console.log('leave table created');
	});
}