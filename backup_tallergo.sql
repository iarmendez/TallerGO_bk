-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.4.9 - MySQL Community Server - GPL
-- SO del servidor:              Linux
-- HeidiSQL Versión:             12.11.0.7065
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para taller_go
DROP DATABASE IF EXISTS `taller_go`;
CREATE DATABASE IF NOT EXISTS `taller_go` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `taller_go`;

-- Volcando estructura para tabla taller_go.categorias
DROP TABLE IF EXISTS `categorias`;
CREATE TABLE IF NOT EXISTS `categorias` (
  `idcategoria` int NOT NULL AUTO_INCREMENT,
  `idtaller` int DEFAULT NULL,
  `nombre` varchar(255) NOT NULL,
  `activo` enum('SI','NO') NOT NULL DEFAULT 'SI',
  `eliminado` enum('SI','NO') NOT NULL DEFAULT 'NO',
  PRIMARY KEY (`idcategoria`),
  KEY `FK_dae7f13c1cedd91e70d7a34ca79` (`idtaller`),
  CONSTRAINT `FK_dae7f13c1cedd91e70d7a34ca79` FOREIGN KEY (`idtaller`) REFERENCES `talleres` (`idtaller`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla taller_go.categorias: ~0 rows (aproximadamente)

-- Volcando estructura para tabla taller_go.empresas
DROP TABLE IF EXISTS `empresas`;
CREATE TABLE IF NOT EXISTS `empresas` (
  `idempresa` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `latitud` decimal(9,6) NOT NULL,
  `longitud` decimal(9,6) NOT NULL,
  `direccion_principal` longtext NOT NULL,
  `telefono_principal` varchar(35) NOT NULL,
  `correo_principal` varchar(255) NOT NULL,
  `activo` enum('SI','NO') NOT NULL DEFAULT 'SI',
  `eliminado` enum('SI','NO') NOT NULL DEFAULT 'NO',
  PRIMARY KEY (`idempresa`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla taller_go.empresas: ~1 rows (aproximadamente)
INSERT INTO `empresas` (`idempresa`, `nombre`, `latitud`, `longitud`, `direccion_principal`, `telefono_principal`, `correo_principal`, `activo`, `eliminado`) VALUES
	(1, 'Empresa Jefferson Gutierritos', 13.726294, -89.126866, 'Colonia Prueba, pasaje prueba, casa 1', '77777777', 'taller.gutierritos@gmail.com', 'SI', 'NO');

-- Volcando estructura para tabla taller_go.etiquetas
DROP TABLE IF EXISTS `etiquetas`;
CREATE TABLE IF NOT EXISTS `etiquetas` (
  `idetiqueta` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `activo` enum('SI','NO') NOT NULL DEFAULT 'SI',
  `eliminado` enum('SI','NO') NOT NULL DEFAULT 'NO',
  PRIMARY KEY (`idetiqueta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla taller_go.etiquetas: ~0 rows (aproximadamente)

-- Volcando estructura para tabla taller_go.opiniones
DROP TABLE IF EXISTS `opiniones`;
CREATE TABLE IF NOT EXISTS `opiniones` (
  `idopinion` int NOT NULL,
  `idusuario` int NOT NULL,
  `idtaller` int NOT NULL,
  `estrellas` int NOT NULL,
  `comentarios` longtext,
  `activo` enum('SI','NO') DEFAULT 'SI',
  `eliminado` enum('SI','NO') DEFAULT 'NO',
  KEY `fk_opiniones_usuario` (`idusuario`),
  KEY `fk_opiniones_taller` (`idtaller`),
  CONSTRAINT `fk_opiniones_taller` FOREIGN KEY (`idtaller`) REFERENCES `talleres` (`idtaller`),
  CONSTRAINT `fk_opiniones_usuario` FOREIGN KEY (`idusuario`) REFERENCES `usuarios` (`idusuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla taller_go.opiniones: ~0 rows (aproximadamente)

-- Volcando estructura para tabla taller_go.prodserv_etiquetas
DROP TABLE IF EXISTS `prodserv_etiquetas`;
CREATE TABLE IF NOT EXISTS `prodserv_etiquetas` (
  `idprodservetiqueta` int NOT NULL,
  `idprodserv` int NOT NULL,
  `idetiqueta` int NOT NULL,
  `activo` enum('SI','NO') DEFAULT 'SI',
  `eliminado` enum('SI','NO') DEFAULT 'NO',
  PRIMARY KEY (`idprodservetiqueta`),
  KEY `fk_prodserveti_prodserv` (`idprodserv`),
  KEY `fk_prodserveti_etiquetas` (`idetiqueta`),
  CONSTRAINT `fk_prodserveti_etiquetas` FOREIGN KEY (`idetiqueta`) REFERENCES `etiquetas` (`idetiqueta`),
  CONSTRAINT `fk_prodserveti_prodserv` FOREIGN KEY (`idprodserv`) REFERENCES `producto_servicio` (`idprodserv`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla taller_go.prodserv_etiquetas: ~0 rows (aproximadamente)

-- Volcando estructura para tabla taller_go.producto_servicio
DROP TABLE IF EXISTS `producto_servicio`;
CREATE TABLE IF NOT EXISTS `producto_servicio` (
  `idprodserv` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `descripcion` longtext,
  `precio` decimal(16,2) NOT NULL,
  `servicio` enum('SI','NO') NOT NULL DEFAULT 'SI',
  `stock` int NOT NULL DEFAULT '0',
  `activo` enum('SI','NO') NOT NULL DEFAULT 'SI',
  `eliminado` enum('SI','NO') NOT NULL DEFAULT 'NO',
  PRIMARY KEY (`idprodserv`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla taller_go.producto_servicio: ~0 rows (aproximadamente)

-- Volcando estructura para tabla taller_go.promociones
DROP TABLE IF EXISTS `promociones`;
CREATE TABLE IF NOT EXISTS `promociones` (
  `idpromocion` int NOT NULL AUTO_INCREMENT,
  `idtaller` int DEFAULT NULL,
  `idprodserv` int DEFAULT NULL,
  `fecha_inicio` datetime NOT NULL,
  `fecha_fin` datetime NOT NULL,
  `descripcion` longtext,
  `idetiqueta` int DEFAULT NULL,
  `activo` enum('SI','NO') NOT NULL DEFAULT 'SI',
  `eliminado` enum('SI','NO') NOT NULL DEFAULT 'NO',
  PRIMARY KEY (`idpromocion`),
  KEY `FK_63f9325b89ab7d1be57a91e3b2f` (`idtaller`),
  KEY `FK_1502469c34215d6d7d41b56646f` (`idprodserv`),
  KEY `FK_1194106128ebbe319b238fa335a` (`idetiqueta`),
  CONSTRAINT `FK_1194106128ebbe319b238fa335a` FOREIGN KEY (`idetiqueta`) REFERENCES `etiquetas` (`idetiqueta`),
  CONSTRAINT `FK_1502469c34215d6d7d41b56646f` FOREIGN KEY (`idprodserv`) REFERENCES `producto_servicio` (`idprodserv`),
  CONSTRAINT `FK_63f9325b89ab7d1be57a91e3b2f` FOREIGN KEY (`idtaller`) REFERENCES `talleres` (`idtaller`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla taller_go.promociones: ~0 rows (aproximadamente)

-- Volcando estructura para tabla taller_go.subcategorias_prodserv
DROP TABLE IF EXISTS `subcategorias_prodserv`;
CREATE TABLE IF NOT EXISTS `subcategorias_prodserv` (
  `idsubcategoriaprodserv` int NOT NULL AUTO_INCREMENT,
  `idsubcategoria` int DEFAULT NULL,
  `idprodserv` int DEFAULT NULL,
  `activo` enum('SI','NO') NOT NULL DEFAULT 'SI',
  `eliminado` enum('SI','NO') NOT NULL DEFAULT 'NO',
  PRIMARY KEY (`idsubcategoriaprodserv`),
  KEY `FK_7eb83f17636f215298ed4fba594` (`idsubcategoria`),
  KEY `FK_e9f405e343e796c734c6ece0bcb` (`idprodserv`),
  CONSTRAINT `FK_7eb83f17636f215298ed4fba594` FOREIGN KEY (`idsubcategoria`) REFERENCES `sub_categorias` (`idsubcategoria`),
  CONSTRAINT `FK_e9f405e343e796c734c6ece0bcb` FOREIGN KEY (`idprodserv`) REFERENCES `producto_servicio` (`idprodserv`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla taller_go.subcategorias_prodserv: ~0 rows (aproximadamente)

-- Volcando estructura para tabla taller_go.sub_categorias
DROP TABLE IF EXISTS `sub_categorias`;
CREATE TABLE IF NOT EXISTS `sub_categorias` (
  `idsubcategoria` int NOT NULL AUTO_INCREMENT,
  `idcategoria` int DEFAULT NULL,
  `nombre` varchar(255) NOT NULL,
  `activo` enum('SI','NO') NOT NULL DEFAULT 'SI',
  `eliminado` enum('SI','NO') NOT NULL DEFAULT 'NO',
  PRIMARY KEY (`idsubcategoria`),
  KEY `FK_32e1636bdfa5e598caf3f2f97bc` (`idcategoria`),
  CONSTRAINT `FK_32e1636bdfa5e598caf3f2f97bc` FOREIGN KEY (`idcategoria`) REFERENCES `categorias` (`idcategoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla taller_go.sub_categorias: ~0 rows (aproximadamente)

-- Volcando estructura para tabla taller_go.talleres
DROP TABLE IF EXISTS `talleres`;
CREATE TABLE IF NOT EXISTS `talleres` (
  `idtaller` int NOT NULL AUTO_INCREMENT,
  `idempresa` int DEFAULT NULL,
  `idtipotaller` int DEFAULT NULL,
  `nombre` varchar(255) NOT NULL,
  `latitud` decimal(9,6) NOT NULL,
  `longitud` decimal(9,6) NOT NULL,
  `direccion` longtext,
  `telefono` varchar(35) DEFAULT NULL,
  `whatsapp` varchar(35) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `activo` enum('SI','NO') NOT NULL DEFAULT 'SI',
  `eliminado` enum('SI','NO') NOT NULL DEFAULT 'NO',
  PRIMARY KEY (`idtaller`),
  KEY `FK_bd8820d1a1d285f1ce16a944676` (`idempresa`),
  KEY `FK_dee9c0a09cce24841b1029d4a25` (`idtipotaller`),
  CONSTRAINT `FK_bd8820d1a1d285f1ce16a944676` FOREIGN KEY (`idempresa`) REFERENCES `empresas` (`idempresa`),
  CONSTRAINT `FK_dee9c0a09cce24841b1029d4a25` FOREIGN KEY (`idtipotaller`) REFERENCES `tipo_talleres` (`idtipotaller`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla taller_go.talleres: ~1 rows (aproximadamente)
INSERT INTO `talleres` (`idtaller`, `idempresa`, `idtipotaller`, `nombre`, `latitud`, `longitud`, `direccion`, `telefono`, `whatsapp`, `email`, `activo`, `eliminado`) VALUES
	(3, 1, 1, 'Taller pruebas', 13.719457, -89.126175, 'Dirección de prueba', '71234567', NULL, 'taller.prueba@gmail.com', 'SI', 'NO');

-- Volcando estructura para tabla taller_go.tipo_talleres
DROP TABLE IF EXISTS `tipo_talleres`;
CREATE TABLE IF NOT EXISTS `tipo_talleres` (
  `idtipotaller` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `activo` enum('SI','NO') NOT NULL DEFAULT 'SI',
  `eliminado` enum('SI','NO') NOT NULL DEFAULT 'NO',
  PRIMARY KEY (`idtipotaller`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla taller_go.tipo_talleres: ~0 rows (aproximadamente)
INSERT INTO `tipo_talleres` (`idtipotaller`, `nombre`, `activo`, `eliminado`) VALUES
	(1, 'Taller de prueba', 'SI', 'NO');

-- Volcando estructura para tabla taller_go.tipo_usuarios
DROP TABLE IF EXISTS `tipo_usuarios`;
CREATE TABLE IF NOT EXISTS `tipo_usuarios` (
  `nombre` varchar(255) NOT NULL,
  `activo` enum('SI','NO') NOT NULL DEFAULT 'SI',
  `eliminado` enum('SI','NO') NOT NULL DEFAULT 'NO',
  `idtipousuario` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`idtipousuario`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla taller_go.tipo_usuarios: ~3 rows (aproximadamente)
INSERT INTO `tipo_usuarios` (`nombre`, `activo`, `eliminado`, `idtipousuario`) VALUES
	('Administrador', 'SI', 'NO', 1),
	('Gestor de Taller', 'SI', 'NO', 2),
	('Usuario', 'SI', 'NO', 3);

-- Volcando estructura para tabla taller_go.usuarios
DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `idusuario` int NOT NULL AUTO_INCREMENT,
  `idtipousuario` int DEFAULT NULL,
  `usuario` varchar(255) NOT NULL,
  `nombres` varchar(255) NOT NULL,
  `apellidos` varchar(255) NOT NULL,
  `pwd` varbinary(255) NOT NULL,
  `activo` enum('SI','NO') NOT NULL DEFAULT 'SI',
  `eliminado` enum('SI','NO') NOT NULL DEFAULT 'NO',
  PRIMARY KEY (`idusuario`),
  KEY `REL_66ec0d0e07e4cab9605812cf65` (`idtipousuario`) USING BTREE,
  CONSTRAINT `FK_66ec0d0e07e4cab9605812cf653` FOREIGN KEY (`idtipousuario`) REFERENCES `tipo_usuarios` (`idtipousuario`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla taller_go.usuarios: ~2 rows (aproximadamente)
INSERT INTO `usuarios` (`idusuario`, `idtipousuario`, `usuario`, `nombres`, `apellidos`, `pwd`, `activo`, `eliminado`) VALUES
	(1, 1, 'josuerauda', 'Josué Milton', 'Rauda Ramírez', _binary 0x5ef15e9a973a508a2041f2e18c7da248, 'SI', 'NO'),
	(6, 1, 'clienteprueba', 'Pancracio', 'Pruebatino', _binary 0x0e28dc4d845cd5a5d60fef66246d66a9, 'SI', 'NO');

-- Volcando estructura para procedimiento taller_go.CreatePwd
DROP PROCEDURE IF EXISTS `CreatePwd`;
DELIMITER //
CREATE PROCEDURE `CreatePwd`(IN iduser INT(32),IN pwd VARCHAR(255))
BEGIN
	DECLARE newPwd VARBINARY(255);
	
	SET newPwd = AES_ENCRYPT(pwd,'Unicornio Volador');
	
	UPDATE usuarios SET pwd=newPwd WHERE idusuario=iduser;
END//
DELIMITER ;

-- Volcando estructura para procedimiento taller_go.CreateUser
DROP PROCEDURE IF EXISTS `CreateUser`;
DELIMITER //
CREATE PROCEDURE `CreateUser`(
	IN `idtipousuario` INT(32),
	IN `usuario` VARCHAR(255),
	IN `nombres` VARCHAR(255),
	IN `apellidos` VARCHAR(255),
	IN `pwd` VARCHAR(255)
)
BEGIN
	DECLARE newPwd VARBINARY(255);
	DECLARE iduser INT(32);

	SET newPwd = AES_ENCRYPT(pwd,'Unicornio Volador');
	
	INSERT INTO usuarios (idtipousuario, usuario, nombres, apellidos, pwd) VALUES (idtipousuario, usuario, nombres, apellidos, newPwd);
	
END//
DELIMITER ;

-- Volcando estructura para procedimiento taller_go.ValidarPwd
DROP PROCEDURE IF EXISTS `ValidarPwd`;
DELIMITER //
CREATE PROCEDURE `ValidarPwd`(
	IN `idusuario` INT(32),
	IN `pwdAValidar` VARCHAR(255)
)
BEGIN
	DECLARE pwdAValidarEncriptado VARBINARY(255);
	DECLARE pwdOriginal VARBINARY(255);
	DECLARE esPwdCorrecto ENUM('SI','NO','BK');
	DECLARE esUsuarioBloqueado ENUM('SI','NO');

	SET pwdAValidarEncriptado = AES_ENCRYPT(pwdAValidar,'Unicornio Volador');
	SET pwdOriginal = (SELECT a.pwd FROM usuarios a WHERE a.idusuario=idusuario AND a.activo='SI' AND a.eliminado='NO' ORDER BY a.idusuario DESC LIMIT 1);

	SET esPwdCorrecto = (SELECT IF(pwdAValidarEncriptado = pwdOriginal, 'SI', 'NO'));
	SELECT esPwdCorrecto;
END//
DELIMITER ;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
