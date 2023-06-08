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
INSERT INTO `users` VALUES ('3Lo229EVq1',NULL,'Vo Nhi','nhi.vo@gmail.com',NULL,'$2a$10$IgDRpz66SHmwAc4B1Q6Qaubgzf7i/qCHhoIPuj8P0gofD4o/qd4Ma','admin','2023-05-26 00:12:49','2023-05-26 00:31:52',NULL),('B1NiqIAwpc','EfPGl2MFmk','Trương Công Thành','truongcongthanh2001qt@gmail.com','https://car-rent-nhivo.s3.ap-southeast-1.amazonaws.com/dev/pCfJGtCdpv-1685978610988','$2a$10$HhLBmNRX9T8Xbewt8ybSJu9Faa.vCHOTaCp/.0F7TaYXXaORnYL6K','user','2023-06-05 22:23:34','2023-06-05 22:23:34',NULL),('BWfvunEMNi','8Cnh1tAc81','Ulbert Alain','ulbert.alain@gmail.com','https://car-rent-nhivo.s3.ap-southeast-1.amazonaws.com/dev/pCfJGtCdpv-1685034893656','$2a$10$IXS423Nuj5hC4tPm3KiIt.nwAacM8iA2bZjWx/tQRX7BjMREc67T2','user','2023-05-26 00:16:20','2023-05-26 00:29:50',NULL),('csyNcx3T9a','PaExO4KRIg','Trần Anh Quân','quan2@gmail.com','https://car-rent-nhivo.s3.ap-southeast-1.amazonaws.com/dev/pCfJGtCdpv-1686225164081','$2a$10$2qrjSxzash5Bb2YpX0W7H.5hfy6iR3gvC7uif5fdJ4Q2CgiIzTXyW','user','2023-06-08 18:52:53','2023-06-08 18:52:53',NULL),('pCfJGtCdpv',NULL,'Ulbert Alain','ulbert.vo@gmail.com','','$2a$10$1CKC/W7AI.IoSYGnh3seuedEFRFUVwZu5sb37STLxw327Y10ebtM2','manager','2023-04-29 17:28:48','2023-05-25 23:50:11',NULL);
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

-- Dump completed on 2023-06-08 20:28:37
