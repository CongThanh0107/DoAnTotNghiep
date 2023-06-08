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
INSERT INTO `employees` VALUES ('3bCmjusWZk','Nguyễn Khánh Nhung','khanhnhung@gmail.com','0976525345','Đà Nẵng','YD68nHRXmy','2023-06-05','2023-06-05','Nữ',4000.00,'2023-06-05 22:21:18','2023-06-05 22:21:18',NULL),('82JYzcIBQP','Nguyễn Ngọc Việt','vietngoc@gmail.com','0975346643','Đà Nẵng','9D3bbGcP9f','2023-06-05','2023-06-05','Nam',2000.00,'2023-06-05 22:20:15','2023-06-05 22:20:15',NULL),('8Cnh1tAc81','Ulbert Alain','ulbert.alain@gmail.com','0949050166','326 Vo Van Kiet, Co Giang','9D3bbGcP9f','2023-05-26','2023-05-26','Nam',1500.00,'2023-05-26 00:19:18','2023-05-26 00:19:18',NULL),('EfPGl2MFmk','Trương Công Thành','truongcongthanh2001qt@gmail.com','0363907251','Đà Nẵng','9D3bbGcP9f','2023-06-05','2023-06-05','Nam',2500.00,'2023-06-05 22:21:52','2023-06-05 22:21:52',NULL),('fekG2rVsnN','Trương Thị Thuận','thuantruong@gmail.com','0975254432','Đà Nẵng','9D3bbGcP9f','2023-06-05','2023-06-05','Nữ',1500.00,'2023-06-05 22:18:28','2023-06-05 22:18:28',NULL),('PaExO4KRIg','Trần Anh Quân','quan123@gmail.com','0986535224','Đà Nẵng','9D3bbGcP9f','2023-06-05','2023-06-05','Nam',1500.00,'2023-06-05 22:14:09','2023-06-05 22:14:09',NULL),('vysD0JMSt6','Bùi Thị Kim Oanh','buikimoanh@gmail.com','0975254432','Đà Nẵng','0Rk0vcy4F2','2023-06-05','2023-06-05','Nữ',450.00,'2023-06-05 22:19:22','2023-06-05 22:19:22',NULL),('wERLwr2g2l','Tang Thu Hoa','thuhoa@gmail.com','0363907256','Đà Nẵng','YD68nHRXmy','2023-06-05','2023-06-05','Nữ',500.00,'2023-06-05 22:17:09','2023-06-05 22:17:09',NULL);
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-08 20:28:37
