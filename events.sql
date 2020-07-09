-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 09-07-2020 a las 13:50:01
-- Versión del servidor: 5.7.24
-- Versión de PHP: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `test_calendar_2`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `id_user` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `color` varchar(7) NOT NULL DEFAULT '#3a87ad',
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `events`
--

INSERT INTO `events` (`id`, `id_user`, `title`, `description`, `color`, `date`) VALUES
(1, '2', 'Event 1', 'This is events description', '#f00877', '2020-10-05 02:44:00'),
(3, '1', 'Event 3', 'This is events description', '#08f049', '2020-10-22 02:45:00'),
(4, '1', 'Event 4', 'This is events description', '#ddf008', '2020-10-31 02:45:00'),
(5, '2', 'Titulo de la promocion', 'sadasdasdasd', '#2e63ed', '2020-07-08 16:44:00'),
(7, '2', 'Titulo de la promocion 2', 'zxczxc', '#3a87ad', '2020-09-08 16:50:00'),
(8, '1', 'asd', 'asd', '#3a87ad', '2020-07-08 17:27:00'),
(10, '1', 'werwer', 'wer', '#3a87ad', '2020-07-08 17:27:00'),
(11, '1', 'Titulo de la promocion', 'ads', '#3a87ad', '2020-07-01 17:57:00'),
(12, '1', 'asd 222', 'asd', '#3a87ad', '2020-07-09 18:03:00'),
(13, '1', '333 asd', 'asdasd', '#3a87ad', '2020-07-02 18:32:00'),
(14, '1', 'ads', 'asd', '#3a87ad', '2020-07-09 20:35:00'),
(15, '1', 'asd', 'asd', '#000000', '2020-07-09 20:38:00');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
