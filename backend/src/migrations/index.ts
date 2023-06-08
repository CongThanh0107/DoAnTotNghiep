import userMigrate from './user.migrate';
import benefitMigrate from './benefit.migrate';
import employeeMigrate from './employee.migrate';
import jobTitleMigrate from './jobTitle.migrate';
import leaveMigrate from './leave.migrate';
import leaveTypeMigrate from './leaveType.migrate';
import performanceReviewMigrate from './performanceReview.migrate';
import departmentMigrate from './department.migrate';
import scheduleMigrate from './schedule.migrate';
import trainingMigrate from './training.migrate';
import databaseMigrate from './database.migrate';

function migrate() {
	databaseMigrate();
	benefitMigrate();
	jobTitleMigrate();
	employeeMigrate();
	departmentMigrate();
	leaveTypeMigrate();
	leaveMigrate();
	performanceReviewMigrate();
	trainingMigrate();
	scheduleMigrate();
	userMigrate();
}

migrate();