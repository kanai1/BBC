const jwt = require('jsonwebtoken');

let jwt_utils = {
	genarateAccessToken : (id, name) => {
	return jwt.sign({
			idx: id,
			name: name,
		},
			process.env.JWT_SECRET_CODE,
			{
			algorithm : "HS256", // 해싱 알고리즘
			expiresIn : "2h",  // 토큰 유효 기간
			issuer : "BBC" // 발행자
		})
	},

	genarateRefreshToken: (id) => {
		jwt.sign({
			idx: id
		},
			process.env.JWT_SECRET_CODE,
			{
			algorithm : "HS256", // 해싱 알고리즘
			expiresIn : "7 days",  // 토큰 유효 기간
			issuer : "BBC" // 발행자
		})
	},

	verify: function(req, res, next) {
		console.log('Middleware: verify')
		if(!req.cookies.token) {
			req.jwt = {isLogin: false}
			console.log('no token', req.jwt)
			return next()
		}
		else {
			token = req.cookies.token
			jwt.verify(token, process.env.JWT_SECRET_CODE, (err, decoded) => {
				if(err){
					console.log(err.name)
					if(err.name == 'TokenExpiredError') {
						req.jwt = {isLogin: false}
						console.log(req.jwt)
						return next()
					}
					else {
						req.jwt = {isLogin: false}
						return next()
					}
				}
				else{
					req.jwt = decoded
					req.jwt.isLogin = true
					return next()
				}
			})
		}
	}
}

module.exports = jwt_utils
