import connection from '../config/database';
import { MysqlError } from 'mysql';

export default function benefitMigrate() {
	connection.query(`CREATE TABLE IF NOT EXISTS benefits (
        id VARCHAR(255) NOT NULL,
        health_insurance VARCHAR(255) NOT NULL,
        dental_insurance VARCHAR(255) NOT NULL,
        vision_insurance VARCHAR(255) NOT NULL,
        retirement_plan VARCHAR(255) NOT NULL,
        vacation_days VARCHAR(255) NOT NULL,
        created_at DATETIME NOT NULL,
        updated_at DATETIME NOT NULL,
        deleted_at DATETIME NULL,
        PRIMARY KEY (id)
    )`, function (error: MysqlError | null) {
		if (error) throw error;
		console.log('benefits table created');
	});
}