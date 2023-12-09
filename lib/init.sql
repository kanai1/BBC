CREATE TABLE IF NOT EXISTS users (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    loginId VARCHAR(50) NOT NULL,
    loginPw VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    age INT,
    gender ENUM('male', 'female', 'other') NOT NULL,
    trustScore INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS travel_info (
    travelInfoId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    destination VARCHAR(100) NOT NULL,
    arrivalTime DATETIME NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(userId)
);

INSERT INTO users (loginId, loginPw, name, age, gender, trustScore)
VALUES
('login1', 'password1', '이형석', 25, 'female', 10),
('login2', 'password2', '권시훈', 30, 'male', 8),
('login3', 'password3', '김민성', 35, 'male', 12),
('login4', 'password4', '한주성', 35, 'male', 12);

INSERT INTO travel_info (userId, destination, arrivalTime)
VALUES
('1', 'Paris', '2023-12-10 10:00:00'),
('2', 'Tokyo', '2023-12-11 15:30:00'),
('3', 'New York', '2023-12-12 08:45:00');