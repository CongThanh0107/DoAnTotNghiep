import connection from '../config/database';
import { MysqlError} from 'mysql';

export default function trainingMigrate() {
	connection.query(`CREATE TABLE IF NOT EXISTS training (
            id VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            trainer CHAR(10) NOT NULL,
            duration INT NOT NULL,
            location VARCHAR(255) NOT NULL,
            cost INT NOT NULL,
            number_of_attendees INT NOT NULL,
            created_at DATETIME NOT NULL,
            updated_at DATETIME NOT NULL,
            deleted_at DATETIME NULL,
            PRIMARY KEY (id),
            FOREIGN KEY (trainer) REFERENCES employees(id)
                )`, function (error: MysqlError | null) {
		if (error) throw error;
		console.log('training table created');
	});
}