-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 01, 2025 at 01:19 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `todo_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `text` text NOT NULL,
  `due_date` date NOT NULL,
  `completed` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `user_id`, `text`, `due_date`, `completed`) VALUES
(2, 1, 'webpage design', '2025-01-24', 1),
(11, 5, 'task1', '2025-01-29', 0),
(13, 5, 'task1', '2025-01-29', 0),
(14, 5, 'task1', '2025-01-29', 0),
(35, 1, 'dfdsf', '2025-02-14', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`) VALUES
(1, 'tiwarishalini234@gmail.com', '$2a$12$48Q.t5L2F8.SoBeaDgpcAeJ3JvszrZQwrc59P9obALz6DFkDbKBBu'),
(5, 'abc@gmail.com', '$2a$12$yE0IxzZNVYB9CIFotAvVJ.ysOE9ES.t.EzMg1.g48Tr3JoUivjBqq'),
(6, 'testtask2@gmail.com', '$2a$12$n3zS9/fylf.kdDBepRrKX.fM/4Ey27sSlIe1thpAbHIgscH5R.TsO'),
(7, 'testshalini23@gmail.com', '$2a$12$2AzGDKL8FhO9ohmd9yS4B.qX7fhbzAmyHzwT2m4XP.dIMx7hC.XqW'),
(8, 'dfgghh@gmail.com', '$2a$12$vxD2650ZPsYHtTSCEhDYHuhedirq2I46I/W6du33y.PwY7sRp/kQi'),
(9, 'sdhaugsd@gmail.com', '$2a$12$8Fl7AFDK7hPbLYlcS7jAl.onuwdAoacV1GJW6PmQJs9/oWZ5NI.A.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
