import connection from '../config/database';
import { MysqlError} from 'mysql';

export default function scheduleMigrate() {
	connection.query(`CREATE TABLE IF NOT EXISTS schedules (
        id CHAR(10) NOT NULL,
        employee_id CHAR(10) NOT NULL,
        start_time VARCHAR(50) NOT NULL,        department_id CHAR(10) NOT NULL,

		end_time VARCHAR(50) NOT NULL,
        text_color VARCHAR(10) NOT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at DATETIME NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (employee_id) REFERENCES employees(id),
        FOREIGN KEY (department_id) REFERENCES departments(id)
    )`, function (error: MysqlError | null) {
		if (error) throw error;
		console.log('Table schedule created');
	});
}