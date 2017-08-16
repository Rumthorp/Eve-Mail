const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

let app = express();



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/', require('./routes'));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(8000);
