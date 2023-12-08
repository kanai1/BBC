const express = require('express')
const router = express.Router()

router.use('/login', (req, res, next) => {
	res.send('login test')
})