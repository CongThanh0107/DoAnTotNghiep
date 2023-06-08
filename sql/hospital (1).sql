-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: hospital
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `benefits`
--

DROP TABLE IF EXISTS `benefits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `benefits` (
  `id` varchar(255) NOT NULL,
  `health_insurance` varchar(255) NOT NULL,
  `dental_insurance` varchar(255) NOT NULL,
  `vision_insurance` varchar(255) NOT NULL,
  `retirement_plan` varchar(255) NOT NULL,
  `vacation_days` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `benefits`
--

LOCK TABLES `benefits` WRITE;
/*!40000 ALTER TABLE `benefits` DISABLE KEYS */;
INSERT INTO `benefits` VALUES ('wmUVQ0sapd','Bảo hiểm y tế doanh nghiệp (Group health insurance): Loại bảo hiểm này được mua bởi các doanh nghiệp để bảo vệ sức khỏe của nhân viên. Nhân viên sẽ được bảo vệ với mức giá ưu đãi và chi phí được phân bổ giữa doanh nghiệp và nhân viên.','Bảo hiểm nha khoa nhóm: Đây là loại bảo hiểm được cung cấp bởi các nhóm như doanh nghiệp, tổ chức hay trường học để bảo vệ chi phí liên quan đến răng miệng của nhân viên hay thành viên.','Vision insurance là loại bảo hiểm bảo vệ cho chi phí liên quan đến thị lực, bao gồm khám mắt định kỳ, kính áp tròng, các dịch vụ phẫu thuật thẩm mỹ mắt, vật liệu cho kính áp tròng, cũng như các chi phí liên quan đến bệnh mắt.','401(k) plan: Là loại retirement plan phổ biến nhất tại Hoa Kỳ, cho phép người lao động đóng góp một phần lương của mình vào tài khoản 401(k) hàng tháng và doanh nghiệp cũng có thể đóng góp','14 ngày nghỉ phép trên năm','2023-05-26 00:13:19','2023-05-26 00:13:19',NULL),('Yigss3jAXY','Bảo hiểm y tế doanh nghiệp (Group health insurance): Loại bảo hiểm này được mua bởi các doanh nghiệp để bảo vệ sức khỏe của nhân viên. Nhân viên sẽ được bảo vệ với mức giá ưu đãi và chi phí được phân bổ giữa doanh nghiệp và nhân viên.','Bảo hiểm nha khoa nhóm: Đây là loại bảo hiểm được cung cấp bởi các nhóm như doanh nghiệp, tổ chức hay trường học để bảo vệ chi phí liên quan đến răng miệng của nhân viên hay thành viên.','Vision insurance là loại bảo hiểm bảo vệ cho chi phí liên quan đến thị lực, bao gồm khám mắt định kỳ, kính áp tròng, các dịch vụ phẫu thuật thẩm mỹ mắt, vật liệu cho kính áp tròng, cũng như các chi phí liên quan đến bệnh mắt.','401(k) plan: Là loại retirement plan phổ biến nhất tại Hoa Kỳ, cho phép người lao động đóng góp một phần lương của mình vào tài khoản 401(k) hàng tháng và doanh nghiệp cũng có thể đóng góp','15 ngày nghỉ phép trên năm','2023-05-26 00:17:30','2023-05-26 00:17:30',NULL);
/*!40000 ALTER TABLE `benefits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `id` char(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `location` varchar(255) NOT NULL,
  `head_of_department` char(10) NOT NULL,
  `number_of_employees` int NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `head_of_department` (`head_of_department`),
  CONSTRAINT `departments_ibfk_1` FOREIGN KEY (`head_of_department`) REFERENCES `employees` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES ('nyE3rXj55I','Khoa Ngoại','<p>Test Description</p>','Tầng 2 Khu B1','8Cnh1tAc81',20,'https://car-rent-nhivo.s3.ap-southeast-1.amazonaws.com/dev/pCfJGtCdpv-1685035254804','2023-05-26 00:21:11','2023-05-26 00:21:11',NULL);
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `id` char(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` char(12) NOT NULL,
  `address` varchar(255) NOT NULL,
  `job_title` char(10) NOT NULL,
  `date_of_hire` date NOT NULL,
  `date_of_birth` date NOT NULL,
  `gender` char(10) NOT NULL,
  `salary` decimal(10,2) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `job_title` (`job_title`),
  CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`job_title`) REFERENCES `job_titles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES ('8Cnh1tAc81','Ulbert Alain','ulbert.alain@gmail.com','0949050166','326 Vo Van Kiet, Co Giang','9D3bbGcP9f','2023-05-26','2023-05-26','Nam',1500.00,'2023-05-26 00:19:18','2023-05-26 00:19:18',NULL);
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_titles`
--

DROP TABLE IF EXISTS `job_titles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_titles` (
  `id` char(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `salary_range` varchar(255) NOT NULL,
  `benefit` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `benefit` (`benefit`),
  CONSTRAINT `job_titles_ibfk_1` FOREIGN KEY (`benefit`) REFERENCES `benefits` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_titles`
--

LOCK TABLES `job_titles` WRITE;
/*!40000 ALTER TABLE `job_titles` DISABLE KEYS */;
INSERT INTO `job_titles` VALUES ('0Rk0vcy4F2','Y tá','Miêu tả của Y tá','500$ - 700$','wmUVQ0sapd','2023-05-26 00:18:12','2023-05-26 00:18:12',NULL),('9D3bbGcP9f','Bác sĩ','Miêu tả của Bác sĩ','1000$ - 1700$','Yigss3jAXY','2023-05-26 00:17:53','2023-05-26 00:17:53',NULL);
/*!40000 ALTER TABLE `job_titles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leave_type`
--

DROP TABLE IF EXISTS `leave_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leave_type` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leave_type`
--

LOCK TABLES `leave_type` WRITE;
/*!40000 ALTER TABLE `leave_type` DISABLE KEYS */;
INSERT INTO `leave_type` VALUES ('WSMYlhIHqd','Nghỉ không lương','Nghỉ phép không lương là quyền của người lao động với mục đích trong trường hợp cần thiết người lao động có thể xin nghỉ thời gian dài mà không bị sa thải','2023-05-28 16:08:45','2023-05-28 16:08:45',NULL),('xTqoQnjWhC','Nghỉ phép năm','Ngày nghỉ hằng năm (thường gọi là “ngày phép năm”) là ngày mà người lao động được nghỉ việc, hưởng nguyên lương theo thỏa thuận hoặc theo sự bố trí của người sử dụng lao động','2023-05-28 16:05:13','2023-05-28 16:05:13',NULL);
/*!40000 ALTER TABLE `leave_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leaves`
--

DROP TABLE IF EXISTS `leaves`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leaves` (
  `id` varchar(255) NOT NULL,
  `employee_id` char(10) NOT NULL,
  `leave_type_id` varchar(255) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `status` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `employee_id` (`employee_id`),
  KEY `leave_type_id` (`leave_type_id`),
  CONSTRAINT `leaves_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`),
  CONSTRAINT `leaves_ibfk_2` FOREIGN KEY (`leave_type_id`) REFERENCES `leave_type` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leaves`
--

LOCK TABLES `leaves` WRITE;
/*!40000 ALTER TABLE `leaves` DISABLE KEYS */;
INSERT INTO `leaves` VALUES ('Km4aNa8SGz','8Cnh1tAc81','xTqoQnjWhC','2023-06-04','2023-06-04','pending','2023-06-04 00:38:24','2023-06-04 00:38:24',NULL,'Xin nghỉ do bệnh');
/*!40000 ALTER TABLE `leaves` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `performance_review`
--

DROP TABLE IF EXISTS `performance_review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `performance_review` (
  `id` varchar(255) NOT NULL,
  `employee_id` char(10) NOT NULL,
  `manager_id` char(10) NOT NULL,
  `job_title_id` char(10) NOT NULL,
  `date` date DEFAULT NULL,
  `overall_rating` int NOT NULL,
  `comments` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `employee_id` (`employee_id`),
  KEY `manager_id` (`manager_id`),
  KEY `job_title_id` (`job_title_id`),
  CONSTRAINT `performance_review_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`),
  CONSTRAINT `performance_review_ibfk_2` FOREIGN KEY (`manager_id`) REFERENCES `employees` (`id`),
  CONSTRAINT `performance_review_ibfk_3` FOREIGN KEY (`job_title_id`) REFERENCES `job_titles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `performance_review`
--

LOCK TABLES `performance_review` WRITE;
/*!40000 ALTER TABLE `performance_review` DISABLE KEYS */;
/*!40000 ALTER TABLE `performance_review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedules`
--

DROP TABLE IF EXISTS `schedules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedules` (
  `id` char(10) NOT NULL,
  `employee_id` char(10) NOT NULL,
  `department_id` char(10) NOT NULL,
  `start_time` varchar(45) NOT NULL,
  `end_time` varchar(45) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  `text_color` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `employee_id` (`employee_id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `schedules_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`),
  CONSTRAINT `schedules_ibfk_2` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedules`
--

LOCK TABLES `schedules` WRITE;
/*!40000 ALTER TABLE `schedules` DISABLE KEYS */;
INSERT INTO `schedules` VALUES ('r9OKl8imcA','8Cnh1tAc81','nyE3rXj55I','2023-05-26T01:00:00.000Z','2023-05-25T19:00:00.000Z','2023-05-26 00:26:01','2023-05-26 00:26:01',NULL,'#FF4842');
/*!40000 ALTER TABLE `schedules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `training`
--

DROP TABLE IF EXISTS `training`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `training` (
  `id` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `trainer` char(10) NOT NULL,
  `duration` int NOT NULL,
  `location` varchar(255) NOT NULL,
  `cost` int NOT NULL,
  `number_of_attendees` int NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `trainer` (`trainer`),
  CONSTRAINT `training_ibfk_1` FOREIGN KEY (`trainer`) REFERENCES `employees` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `training`
--

LOCK TABLES `training` WRITE;
/*!40000 ALTER TABLE `training` DISABLE KEYS */;
/*!40000 ALTER TABLE `training` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` char(10) NOT NULL,
  `employee_id` char(10) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` char(10) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `users_ibfk_1` (`employee_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('3Lo229EVq1',NULL,'Vo Nhi','nhi.vo@gmail.com',NULL,'$2a$10$IgDRpz66SHmwAc4B1Q6Qaubgzf7i/qCHhoIPuj8P0gofD4o/qd4Ma','admin','2023-05-26 00:12:49','2023-05-26 00:31:52',NULL),('BWfvunEMNi','8Cnh1tAc81','Ulbert Alain','ulbert.alain@gmail.com','https://car-rent-nhivo.s3.ap-southeast-1.amazonaws.com/dev/pCfJGtCdpv-1685034893656','$2a$10$IXS423Nuj5hC4tPm3KiIt.nwAacM8iA2bZjWx/tQRX7BjMREc67T2','user','2023-05-26 00:16:20','2023-05-26 00:29:50',NULL),('pCfJGtCdpv',NULL,'Ulbert Alain','ulbert.vo@gmail.com','','$2a$10$1CKC/W7AI.IoSYGnh3seuedEFRFUVwZu5sb37STLxw327Y10ebtM2','manager','2023-04-29 17:28:48','2023-05-25 23:50:11',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-05 22:05:30
