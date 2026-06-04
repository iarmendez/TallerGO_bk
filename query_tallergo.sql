DROP DATABASE if EXISTS taller_go;
CREATE DATABASE taller_go;
USE taller_go;
CREATE TABLE if NOT EXISTS tipo_usuarios (
	idtipousuario INT(32) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	nombre VARCHAR(255) NOT NULL,
	activo ENUM('SI','NO') DEFAULT 'SI',
	eliminado ENUM('SI','NO') DEFAULT 'NO'
);
CREATE TABLE if NOT EXISTS usuarios (
	idusuario INT(32) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	idtipousuario INT(32) NOT NULL,
	usuario VARCHAR(255) NOT NULL,
	nombres VARCHAR(255) NOT NULL,
	apellidos VARCHAR(255) NOT NULL,
	pwd VARBINARY(255) NOT NULL,
	activo ENUM('SI','NO') DEFAULT 'SI',
	eliminado ENUM('SI','NO') DEFAULT 'NO',
	CONSTRAINT fk_usuarios_tipo FOREIGN KEY (idtipousuario) REFERENCES tipo_usuarios (idtipousuario)
);
CREATE TABLE if NOT EXISTS empresas (
	idempresa INT(32) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	nombre VARCHAR(255) NOT NULL,
	latitud DECIMAL(9,6) NOT NULL,
	longitud DECIMAL(9,6) NOT NULL,
	direccion_principal LONGTEXT NOT NULL,
	telefono_principal VARCHAR(35) NOT NULL,
	correo_principal VARCHAR(255) NOT NULL,
	activo ENUM('SI','NO') DEFAULT 'SI',
	eliminado ENUM('SI','NO') DEFAULT 'NO'
);
CREATE TABLE if NOT EXISTS tipo_talleres (
	idtipotaller INT(32) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	nombre VARCHAR(255) NOT NULL,
	activo ENUM('SI','NO') DEFAULT 'SI',
	eliminado ENUM('SI','NO') DEFAULT 'NO'
);
CREATE TABLE if NOT EXISTS talleres (
	idtaller INT(32) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	idempresa INT(32) NOT NULL,
	idtipotaller INT(32) NOT NULL,
	nombre VARCHAR(255) NOT NULL,
	latitud DECIMAL(9,6) NOT NULL,
	longitud DECIMAL(9,6) NOT NULL,
	direccion LONGTEXT,
	telefono VARCHAR(35),
	whatsapp VARCHAR(35),
	email VARCHAR(255), 
	activo ENUM('SI','NO') DEFAULT 'SI',
	eliminado ENUM('SI','NO') DEFAULT 'NO',
	CONSTRAINT fk_taller_empresa FOREIGN KEY (idempresa) REFERENCES empresas (idempresa),
	CONSTRAINT fk_taller_tipotaller FOREIGN KEY (idtipotaller) REFERENCES tipo_talleres (idtipotaller)
);
CREATE TABLE if NOT EXISTS categorias (
	idcategoria INT(32) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	idtaller INT(32) NOT NULL,
	nombre VARCHAR(255) NOT NULL,
	activo ENUM('SI','NO') DEFAULT 'SI',
	eliminado ENUM('SI','NO') DEFAULT 'NO',
	CONSTRAINT fk_categoria_talleres FOREIGN KEY (idtaller) REFERENCES talleres (idtaller)
);
CREATE TABLE if NOT EXISTS sub_categorias (
	idsubcategoria INT(32) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	idcategoria INT(32) NOT NULL,
	nombre VARCHAR(255) NOT NULL,
	activo ENUM('SI','NO') DEFAULT 'SI',
	eliminado ENUM('SI','NO') DEFAULT 'NO',
	CONSTRAINT fk_subcategoria_categoria FOREIGN KEY (idcategoria) REFERENCES categorias (idcategoria)
);
CREATE TABLE if NOT EXISTS producto_servicio (
	idprodserv INT(32) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	nombre VARCHAR(255) NOT NULL,
	descripcion LONGTEXT,
	precio DECIMAL(16,2) NOT NULL,
	servicio ENUM('SI','NO') DEFAULT 'SI',
	stock INT(32) DEFAULT 0,
	activo ENUM('SI','NO') DEFAULT 'SI',
	eliminado ENUM('SI','NO') DEFAULT 'NO'
);
CREATE TABLE if NOT EXISTS subcategorias_prodserv (
	idsubcategoriaprodserv INT(32) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	idsubcategoria INT(32) NOT NULL,
	idprodserv INT(32) NOT NULL,
	activo ENUM('SI','NO') DEFAULT 'SI',
	eliminado ENUM('SI','NO') DEFAULT 'NO',
	CONSTRAINT fk_subcatprodserv_subcategoria FOREIGN KEY (idsubcategoria) REFERENCES sub_categorias (idsubcategoria),
	CONSTRAINT fk_subcatprodserv_prodserv FOREIGN KEY (idprodserv) REFERENCES producto_servicio (idprodserv)
);
CREATE TABLE if NOT EXISTS etiquetas (
	idetiqueta INT(32) PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(50) NOT NULL,
	activo ENUM('SI','NO') DEFAULT 'SI',
	eliminado ENUM('SI','NO') DEFAULT 'NO'
);
CREATE TABLE if NOT EXISTS prodserv_etiquetas (
	idprodservetiqueta INT(32) PRIMARY KEY NOT NULL,
	idprodserv INT(32) NOT NULL,
	idetiqueta INT(32) NOT NULL,
	activo ENUM('SI','NO') DEFAULT 'SI',
	eliminado ENUM('SI','NO') DEFAULT 'NO',
	CONSTRAINT fk_prodserveti_prodserv FOREIGN KEY (idprodserv) REFERENCES producto_servicio (idprodserv),
	CONSTRAINT fk_prodserveti_etiquetas FOREIGN KEY (idetiqueta) REFERENCES etiquetas (idetiqueta)
);
CREATE TABLE if NOT EXISTS promociones (
	idpromocion INT(32) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	idtaller INT(32) NOT NULL,
	idprodserv INT(32) NOT NULL,
	fecha_inicio DATETIME NOT NULL,
	fecha_fin DATETIME NOT NULL,
	descripcion LONGTEXT,
	idetiqueta INT(32),
	activo ENUM('SI','NO') DEFAULT 'SI',
	eliminado ENUM('SI','NO') DEFAULT 'NO',
	CONSTRAINT fk_promociones_talleres FOREIGN KEY (idtaller) REFERENCES talleres (idtaller),
	CONSTRAINT fk_promociones_prodserv FOREIGN KEY (idprodserv) REFERENCES producto_servicio (idprodserv),
	CONSTRAINT fk_promociones_etiquetas FOREIGN KEY (idetiqueta) REFERENCES etiquetas (idetiqueta)
);
DROP TABLE IF EXISTS opiniones;
CREATE TABLE if NOT EXISTS opiniones (
	idopinion INT(32) NOT NULL,
	idusuario INT(32) NOT NULL,
	idtaller INT(32) NOT NULL,
	estrellas INT(1) NOT NULL,
	comentarios LONGTEXT,
	activo ENUM('SI','NO') DEFAULT 'SI',
	eliminado ENUM('SI','NO') DEFAULT 'NO',
	CONSTRAINT fk_opiniones_usuario FOREIGN KEY (idusuario) REFERENCES usuarios(idusuario),
	CONSTRAINT fk_opiniones_taller FOREIGN KEY (idtaller) REFERENCES talleres(idtaller)
);

DELIMITER //
DROP PROCEDURE IF EXISTS CreatePwd;
CREATE PROCEDURE CreatePwd (IN iduser INT(32),IN pwd VARCHAR(255))
BEGIN
	DECLARE newPwd VARBINARY(255);
	
	SET newPwd = AES_ENCRYPT(pwd,'Unicornio Volador');
	
	UPDATE usuarios SET pwd=newPwd WHERE idusuario=iduser;
END;
//

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
	SET pwdOriginal = (SELECT a.pwd FROM usuaurios a WHERE a.idusuario=idusuario AND a.activo='SI' AND a.eliminado='NO' ORDER BY a.idusuario DESC LIMIT 1);

	SET esPwdCorrecto = (SELECT IF(pwdAValidarEncriptado = pwdOriginal, 'SI', 'NO'));
	SELECT esPwdCorrecto;
END//
DELIMITER ;

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

CALL CreateUser(1, 'administrador', 'Administrador', 'TallerGO', 'admin321');