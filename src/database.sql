CREATE DATABASE  IF NOT EXISTS `the_mobile_hour` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `the_mobile_hour`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: the_mobile_hour
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `changelog`
--

DROP TABLE IF EXISTS `changelog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `changelog` (
  `changelog_id` int NOT NULL AUTO_INCREMENT,
  `kind_of_change` varchar(45) NOT NULL,
  `datetime_of_change` datetime NOT NULL,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`changelog_id`),
  UNIQUE KEY `idchangelog_UNIQUE` (`changelog_id`),
  KEY `fk_user_id_idx` (`user_id`),
  KEY `fk_product_id_idx` (`product_id`),
  CONSTRAINT `fk_changelog_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  CONSTRAINT `fk_changelog_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `changelog`
--

LOCK TABLES `changelog` WRITE;
/*!40000 ALTER TABLE `changelog` DISABLE KEYS */;
/*!40000 ALTER TABLE `changelog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `street` varchar(45) NOT NULL,
  `postcode` varchar(45) NOT NULL,
  `city` varchar(45) NOT NULL,
  `state` varchar(45) NOT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `customer_id_UNIQUE` (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'Jessie','Wallace','0455568971','jessie.w@gmail.com','85 Capper Street','4625','Pile Gully','Queensland'),(2,'Gail','Gardner','0455526504','gail.g@@gmail.com','49 Burnley Street','5165','Christies Beach','South Australia'),(3,'Lee','Mills','0455514950','lee.m@gmail.com','50 Bowden Street','2036','La Perouse','New South Wales'),(4,'Jamie','Miller','0455568041','jamie.m@gmail.com','27 Church Street','5266','Bunbury','South Australia'),(5,'Reed','West','0455554791','reed.w@gmail.com','5 Passage Avenue','4879','Clifton Beach','Queensland'),(6,'Danny','Frank','0455522543','danny.f@gmail.com','55 Hebbard Street','3182','St Kilda','Victoria'),(7,'Alex','Bruce','0455597301','alex.b@gmail.com','87 Lowe Street','4412','Brigalow','Queensland'),(8,'Raylee','Nguyen','0455552353','raylee.n@gmail.com','5 Crofts Road','3887','Lake Tyers','Victoria'),(9,'Aaren','Tucker','0455542381','aaren.t@gmail.com','16 Prince Street','2460','Smiths Creek','New South Wales'),(10,'Marley','Ramos','0455554294','marley.r@gmail.com','96 Amiens Road','2850','Cooks Gap','New South Wales'),(11,'Herman','Deon','0455596759','herman.d@gmail.com','60 Purcell Place','2460','Gurranang','New South Wales');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `features`
--

DROP TABLE IF EXISTS `features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `features` (
  `feature_id` int NOT NULL AUTO_INCREMENT,
  `weight` varchar(45) NOT NULL,
  `dimensions` varchar(45) NOT NULL,
  `screensize` varchar(45) NOT NULL,
  `resolution` varchar(45) NOT NULL,
  `CPU` varchar(100) NOT NULL,
  `RAM` varchar(45) NOT NULL,
  `storage` varchar(45) NOT NULL,
  `battery` varchar(45) NOT NULL,
  `rear_camera` varchar(45) NOT NULL,
  `front_camera` varchar(45) NOT NULL,
  PRIMARY KEY (`feature_id`),
  UNIQUE KEY `feature_id_UNIQUE` (`feature_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `features`
--

LOCK TABLES `features` WRITE;
/*!40000 ALTER TABLE `features` DISABLE KEYS */;
INSERT INTO `features` VALUES (1,'205 g','164 x 75.8 x 8.9 mm','6.5 inches','720 x 1600 pixels','Octa-core (4x2.35 GHz Cortex-A53 & 4x1.8 GHz Cortex-A53)','4GB','128GB','5000 mAh','48 MP, 5.0 MP, 2.0 MP Dual','8.0 MP'),(2,'190 g','163.8 x 75.6 x 8.4 mm','6.52 inches','1600 x 720 pixels','MediaTek MT6765','4GB','128GB','5000 mAh','50 MP, 2.0 MP Dual','8.0 MP'),(3,'148 g','145.6 x 68.2 x 7.9 mm','5.5 inches','1080 x 2160 pixels','Octa-core (4x2.5 GHz Kryo 385 Gold & 4x1.6 GHz Kryo 385 Silver)','4GB','64GB','2915 mAh','12.2 MP','8.0 MP'),(4,'151g','	144.7 x 70.4 x 8.0 mm','6.0 inches','1080 x 2340 pixels','Octa-core','8GB','128GB','4080 mAh','16 MP, 12 MP','8.0 MP'),(5,'190 g','162.90 x 74.70 x 8.40 mm','6.5 inches','2400 x 1080 pixels','Octa-core','4GB','64GB','5000 mAh','48 MP, 8 MP + 2MP +2 MP','16 MP'),(6,'175 g','157.9 x 76.7 x 7.9 mm','6.0 inches','1440 x 2880 pixels','Octa-core (4x2.35 GHz & 4x1.9 GHz)','4GB','128GB','3520 mAh','12.2 MP','8.0 MP'),(7,'205 g','172 x 72 x 6.9 mm','6.2 inches','876 x 2142 pixels','Octa-core (2x2.2 GHz 360 & 6x1.7 GHz)','6GB','128GB','2510 mAh','16 MP','5.0 MP'),(8,'184 g','158.9 x 73.6 x 8.4 mm','6.4 inches','1080 x 2400 pixels','Octa-core (2x2.0 GHz Cortex-A75 & 6x1.8 GHz Cortex-A55)','6GB','128GB','5000 mAh','64 MP, 8.0 MP, 5.0 MP Dual','20 MP'),(9,'240 g','160.8 x 78.1 x 7.7 mm','6.7 inches','1284 x 2778 pixels','Hexa-core (2x3.22 GHz Avalanche + 4xX.X GHz Blizzard)','6GB','128GB','4352 mAh','12 MP Triple Camera, TOF 3D Sensing','12 MP Dual Camera'),(10,'174 g','146.7 x 71.5 x 7.7 mm','6.1 inches','1170 x 2532 pixels','Hexa-core (2x3.22 GHz + 4xX.X GHz)','4GB','256GB','3240 mAh','12 MP Dual Camera','12 MP Dual Camera'),(11,'240 g','160.8 x 78.1 x 7.7 mm','6.7 inches','1284 x 2778 pixels','Hexa-core (2x3.22 GHz Avalanche + 4xX.X GHz Blizzard)','6GB','128GB','	4352 mAh','12 MP Triple Camera, TOF 3D Sensing','12 MP Dual Camera');
/*!40000 ALTER TABLE `features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `customer_id` int NOT NULL,
  `order_date` datetime NOT NULL,
  PRIMARY KEY (`order_id`),
  UNIQUE KEY `order_id_UNIQUE` (`order_id`),
  KEY `fk_product_id_idx` (`product_id`),
  KEY `fk_customer_id_idx` (`customer_id`),
  CONSTRAINT `fk_orders_customers` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`),
  CONSTRAINT `fk_orders_products` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,2,7,'2022-05-17 11:12:25'),(2,8,8,'2022-05-17 11:13:19'),(3,6,9,'2022-05-18 00:06:44'),(4,2,10,'2022-05-18 03:46:50'),(5,7,11,'2022-05-24 23:59:15');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(100) NOT NULL,
  `product_model` varchar(45) NOT NULL,
  `manufacturer` varchar(45) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `stock_on_hand` int NOT NULL,
  `feature_id` int NOT NULL,
  PRIMARY KEY (`product_id`),
  UNIQUE KEY `product_id_UNIQUE` (`product_id`),
  KEY `fk_product_feature_idx` (`feature_id`),
  CONSTRAINT `fk_product_feature` FOREIGN KEY (`feature_id`) REFERENCES `features` (`feature_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Samsung Galaxy A12 (6.5\'\', 128GB/4GB, 5000 mAh) - Blue','SM-A127FZBIXSA','Samsung',279,10,1),(2,'OPPO A54s (Dual Sim, 6.52\'\', 128GB/4GB, CPH2273AU) - Pearl Blue','CPH2273AU','OPPO',289,10,2),(3,'Google Pixel 3 (5.5\", 64GB/4GB, Global Variant, 1 Year Au Warranty) - Not Pink','G013A','Google',288,10,3),(4,'Google Pixel 5 5G (128GB/8GB, 6.0\'\') - Just Black','GTT9Q-0910','Google',798,10,4),(5,'OPPO A54 5G (Dual Sim, 6.5\'\', 64GB/4GB, 5000mAh, CPH2195) - Fantastic Purple','CPH2195','OPPO',298,10,5),(6,'Google Pixel 2 XL (6.0\", 128GB/4GB, 12.2MP) - Black and White','G011C','Google',238,10,6),(7,'Motorola Razr Flip (4G/LTE, eSim, 6.2\",128GB/6GB) - Noir Black','PAHT0009AU','Motorola',549,10,7),(8,'Samsung Galaxy A32 - Black','SM-A325','Samsung',438,10,8),(9,'Apple iPhone 13 Pro Max 128GB Sierra Blue','A2643','Apple',1739,10,9),(10,'Apple iPhone 13 256GB - Midnight','A2482','Apple',1499,10,10),(11,'Apple iPhone 13 Pro Max 128GB Graphite','A2643','Apple',1739,10,11);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(45) DEFAULT NULL,
  `lastname` varchar(45) DEFAULT NULL,
  `role` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'John','Doe','Admin','john','$2b$06$iNDlGWzIy6Tt5eot3FQlq.w3PmE0hm9A/8KLIVdeF3Ewba0mqsAH.'),(2,'Jane','Doe','Staff','jane','$2b$06$zM8OOqV7t0ETQvkVDSnf.eVq3hSJeJDVmLNV9DhBGbWME7OY.5b3q'),(3,'Julia','Doe','Admin','julia','$2b$06$wspT0SataZL/N5RD2axeCuK3.ZAlhQzKspRLC1SvoLv/t.dkwLaDm'),(4,'Jaqueline','Doe','Admin','jaqueline','$2b$06$X6PFjkmlmCDkur8vUpFCR.bxxsEXQhj0fFyHbgxD6rB9C4uXD5SXK'),(5,'Jess','Doe','Staff','jess','$2b$06$FDgAqCDEPclByRASzq0RHeSIUzP/TZb838wkPYAANmrModxhdLFX.'),(6,'Jamie','Doe','Staff','jamie','$2b$06$3iBsXYOcTnaJwj2Ycgvb8e2PvKKhRtflM/InZogP.dDxWLsL5jjny'),(7,'Joel','Doe','Admin','joel','$2b$06$NlqZQukTiYV4TzotT6Q5keIa6F.3sj77FonJhkhPE6X3dHpkShCLm'),(8,'Demo','Admin','Admin','demoadmin','$2b$06$oBJMw51BUxy38as2XLlS7OC4DKjcbKpkzo.E9uT5iYHYh6IZLSRCK'),(10,'Demo','Staff','Staff','demostaff','$2b$06$168wZXwJxAxFEIA0K6o6QeFz2Ca78Agcs1c1vF0oZkY.0vwnSG3Wi');
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

-- Dump completed on 2023-07-26 23:51:31
