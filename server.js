const express = require('express')
const cors = require('cors')
const websocket = require('./websocket')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.get('/list', (req, res, next) => {
	const dumplist1 = [
		{
			name: "name1",
			msg: "msg1"
		},
		{
			name: "name2",
			msg: "msg2"
		},
		{
			name: "name1",
			msg: "msg3"
		},
		{
			name: "name1",
			msg: "msg4"
		},
		{
			name: "name2",
			msg: "msg5"
		},
		{
			name: "name1",
			msg: "msg6"
		},
	]
	const dumplist2 = [
		{
			name: "name1",
			msg: "오래된 메시지에요"
		}
	]
	if(req.query.option == 'newest') res.send({code: 200, list: dumplist1, oldestMessageId: 10})
	else res.send({code: 200, list: dumplist2, oldestMessageId: 20})
})

app.post('/send', (req, res, next) => {
	const name = req.body.name
	const msg = req.body.message

	console.log(req.body)
	res.send({code: 200})
})

const server = app.listen('8888')

websocket(server)