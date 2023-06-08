import connection from '../config/database';
import { MysqlError} from 'mysql';

export default function performanceReviewMigrate() {
	connection.query(`CREATE TABLE IF NOT EXISTS performance_review (
        id VARCHAR(255) NOT NULL,
        employee_id CHAR(10) NOT NULL,
        manager_id CHAR(10) NOT NULL,
        job_title_id CHAR(10) NOT NULL,
        date DATE NULL,
        overall_rating INT NOT NULL,
        comments VARCHAR(255) NOT NULL,
        created_at DATETIME NOT NULL,
        updated_at DATETIME NOT NULL,
        deleted_at DATETIME NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (employee_id) REFERENCES employees(id),
        FOREIGN KEY (manager_id) REFERENCES employees(id),
        FOREIGN KEY (job_title_id) REFERENCES job_titles(id)
            )`,
	(error: MysqlError | null) => {
		if (error) throw error;
		console.log('performance_review table created');
	});
}