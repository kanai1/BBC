exports.getUseridCount = "SELECT COUNT(*) FROM user_login WHERE id = ?"
exports.loginCheck = "SELECT * FROM user_login WHERE id = ? AND password = ?"
exports.register = "INSERT INTO user_login(id, password, name) values (?, ?, ?)"