exports.getUseridCount = "SELECT COUNT(*) FROM users WHERE loginId = ?";
exports.loginCheck = "SELECT * FROM users WHERE loginId = ? AND loginPw = ?";
exports.register =
  "INSERT INTO users(loginId, loginPw, name, age, gender, trustScore) values (?, ?, ?, ?, ?, 0)";
exports.getAllUser = "SELECT * FROM users";
exports.getAllTravel = "SELECT * FROM travel_info";
exports.getTravelInfoByDestinationAndDate =
  "SELECT * FROM travel_info WHERE destination = ? AND arrivalTime = ?";
//exports.getUserbyId = "SELECT * FROM users WHERE loginId = ?";
exports.registerTravel =
  "INSERT INTO users(userId, destination, arrivalTime) values (?, ?, ?)";
