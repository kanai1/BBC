exports.getUseridCount = "SELECT COUNT(*) FROM users WHERE loginId = ?";
exports.loginCheck = "SELECT * FROM users WHERE loginId = ? AND loginPw = ?";
exports.register = "INSERT INTO users(loginId, loginPw, name) values (?, ?, ?)";
exports.getAllUser = "SELECT * FROM users";
exports.getAllTravel = "SELECT * FROM travel_info";
