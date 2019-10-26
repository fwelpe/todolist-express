var express = require('express');
const fs = require('fs');
var cors = require('cors')

var app = express();

app.use(cors())
app.use(express.json());

app.get('/', function (req, res) {
	const raw = fs.readFileSync('db.json');
	res.send(raw);
});

app.post('/write', function (req, res) {
	fs.writeFileSync('db.json', JSON.stringify(req.body));
});

const port = 3001;
app.listen(port, function () {
	console.log('Example app listening on port', port);
});
