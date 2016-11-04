var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var multer = require('multer');
var upload = multer({ dest: './uploads/' });

var app = express();

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false  });

app.use(express.static('public'));
app.use(cookieParser());


app.get('/index.html', function(req, res) {
  console.log('Cookies: ', req.cookies);
  console.log('user: ', req.cookies.username);
  console.log('password: ', req.cookies.password);
  res.sendFile(__dirname + '/' + 'index.html');
});

app.get('/', function(req, res) {
  res.send('Hola MAMA estoy haciendo express');
});

app.post('/', function(req, res) {
  console.log('Hola mama acabo de hacer un POST');
  res.send('Hola mama acabo de hacer un POST');
});

app.get('/users', function(req, res) {
  res.send('Hola MAMA estoy haciendo Usuarios');
});

app.get('/get_form', function(req, res) {
  var data = {
    first: req.query.first,
    last: req.query.last
  };

  console.log(data);
  res.send(JSON.stringify(data));
});

app.post('/process_post', urlencodedParser, function(req, res) {

  var data = {
    first: req.body.first,
    last: req.body.last
  };

  console.log(data);
  res.send(JSON.stringify(data));
});

app.post('/profile', upload.single('avatar') , function(req, res) {
  console.log(req.file);
  res.send(req.file);
});


var server = app.listen(3000, function() {
  var port = server.address().port;
  console.log('Servidor ejecutando en el puerto:', port);
});
