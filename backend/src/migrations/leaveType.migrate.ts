import connection from '../config/database';
import { MysqlError } from 'mysql';

export default function leaveTypeMigrate() {
	connection.query(`CREATE TABLE IF NOT EXISTS leave_type (
        id VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        created_at DATETIME NOT NULL,
        updated_at DATETIME NOT NULL,
        deleted_at DATETIME NULL,
        PRIMARY KEY (id)
    )`, function (error: MysqlError | null) {
		if (error) throw error;
		console.log('leave_type table created');
	});
}