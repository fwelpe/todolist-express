var express = require('express');
var fs = require('fs');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var ejwt = require('express-jwt');

var app = express();
var secret = Math.random().toString();
var users = [{ user: 'root', psw: 'ewe4' }, {user: 'qwe', psw: 'asd'}];

app.use(cors());
app.use(express.json());

const genToken = (credentianls) => jwt.sign(credentianls, secret);

app.get('/', ejwt({ secret }), function (req, res) {
	const name = './' + req.user.username + 'db.json';
	console.log(name);
	const raw = fs.existsSync(name) ? fs.readFileSync(name) : '{}';
	res.send(raw);
});

app.post('/login', function (req, res) {
	const { username, password } = req.body;
	// console.log(req.body)
	const authentified = users.reduce((acc, { user, psw }) => {
		if (acc)
			return acc;
		if (username === user && password === psw)
			return true;
	}, false);
	if (authentified) {
		const tkn = genToken({ username, password });
		res.send(tkn);
		// console.log(tkn);
	}
	else
		res.sendStatus(401);
});

app.post('/write', ejwt({ secret }), function (req, res) {
	const name = './' + req.user.username + 'db.json';
	fs.writeFileSync(name, JSON.stringify(req.body));
	res.sendStatus(200);
});

const port = 3001;
app.listen(port, function () {
	console.log('App listening on port', port);
});
