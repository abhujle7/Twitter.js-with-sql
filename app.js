var express = require('express')
var app = express(); //creates an instance of an express application

app.get('/', function (req, res) {
	res.send('welcome!')
})










app.listen(8080, console.log('server listening'))