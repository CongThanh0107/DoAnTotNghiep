-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: hospital
-- ------------------------------------------------------
-- Server version	8.0.32

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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-08 20:28:36
