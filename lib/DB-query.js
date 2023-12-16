exports.getUseridCount = "SELECT COUNT(*) FROM users WHERE loginId = ?";
exports.loginCheck = "SELECT * FROM users WHERE loginId = ? AND loginPw = ?";
exports.register =
  "INSERT INTO users(loginId, loginPw, name, age, gender, trustScore) values (?, ?, ?, ?, ?, 0)";
exports.getAllUser = "SELECT * FROM users";
exports.getAllTravel = "SELECT * FROM travel_info";
exports.getAllTravelByDes = "SELECT * FROM travel_info WHERE destination = ?";
exports.getTravelInfoByDestinationAndDate =
  "SELECT * FROM travel_info WHERE destination = ? AND arrivalTime = ?";
//exports.getUserbyId = "SELECT * FROM users WHERE loginId = ?";
exports.registerTravel =
  "INSERT INTO travel_info(userId, destination, arrivalTime) values (?, ?, ?)";
exports.getDestination = "SELECT DISTINCT destination FROM travel_info WHERE userId = ?"
exports.getScoreById = "SELECT trustScore from users Where userId = ?"