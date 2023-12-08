const connection = require('../lib/DB')
const dbQuery = require('../lib/DB-query') // DB쿼리 모아둔 파일입니다. 예시파일은 레포에 올려둘테니 바꿔서 쓰시면 되요 그전까지는 계속 오류날겁니다.
const jwt_utils = require('./jwt_utils')

const specialCharacters = "a-zA-Z0-9"
const specialCharactersRegex = new RegExp(`^[${specialCharacters}]+$`)

let Login = {
	async idDoubleCheck(id) {
		var result = true
		const [rows] = await connection.execute(dbQuery.getUseridCount, [id])
		console.log("rows: ", rows)
		try{
			if(rows[0]['COUNT(*)'] == 0) result = true
			else result = false
		} catch(e) {
			throw e
		}
	
		return result
	},
	
	idSpecialCharactersCheck(id) {
		return specialCharactersRegex.test(id);
	},

	async idCheck(id) {
		return this.idSpacialCharactersCheck(id) && await this.idDoubleCheck(id)
	},

	login: async function (req, res, next) {
		const sendData = {isLogin: ""}

		const id = req.body.id
		const password = req.body.password

		const [rows] = await connection.execute(dbQuery.loginCheck, [id, password])

		try{
			console.log('User info is: ', rows)
			if(rows.length > 0) {
				var token = jwt_utils.genarateAccessToken(rows[0]['id'], rows[0]['name'])
				sendData.isLogin = true
				sendData.token = token
				res.send(sendData)
				console.log(sendData)
				return next()
			}
			else {
				sendData.isLogin = false
				res.send(sendData)
				console.log(sendData)
				return next()
			}
		}catch (e) {
			throw e
		}
	},

	register: async function(req, res) {
		const id = req.body.id
		const password = req.body.password
		const username = req.body.username


		if(await this.idCheck(id)) {
			try{
				await connection.execute(dbQuery.register, [id, password, username])
				res.send({result:true})
			} catch(e) {
				console.log(e)
				throw e
			}
		} else {
			console.log('이미 존재하는 아이디입니다.')
			res.send({error: 'idDoubleCheckError'})
		}
	}
}

module.exports = Login