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
('login4', 'password4', '한주성', 35, 'male', 12)
('login5', 'password5', '홍길동', 28, 'male', 15),
('login6', 'password6', '성춘향', 22, 'female', 9),
('login7', 'password7', '이몽룡', 29, 'male', 11),
('login8', 'password8', '심청', 30, 'female', 14),
('login9', 'password9', '박지성', 26, 'male', 18),
('login10', 'password10', '손흥민', 28, 'male', 20),
('login11', 'password11', '김연아', 31, 'female', 16),
('login12', 'password12', '배수지', 25, 'female', 12),
('login13', 'password13', '류현진', 33, 'male', 19),
('login14', 'password14', '김연경', 27, 'female', 17),
('login15', 'password15', '류세은', 29, 'female', 13),
('login16', 'password16', '강호동', 45, 'male', 20),
('login17', 'password17', '유재석', 49, 'male', 20),
('login18', 'password18', '이승기', 34, 'male', 18),
('login19', 'password19', '송지효', 39, 'female', 16),
('login20', 'password20', '이효리', 42, 'female', 17);

INSERT INTO travel_info (userId, destination, arrivalTime)
VALUES
('1', 'Paris', '2023-12-10 10:00:00'),
('2', 'Tokyo', '2023-12-11 15:30:00'),
('3', 'New York', '2023-12-12 08:45:00')
('4', 'London', '2023-12-13 14:00:00'),
('5', 'Seoul', '2023-12-14 20:15:00'),
('6', 'Sydney', '2023-12-15 09:30:00');
