const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');
const mongoose = require('mongoose');

//var cookieParser = require('cookie-parser');
//var session = require('express-session');
//var MongoStore = require('connect-mongo')(session);

/* Prevent Sleep inHeroku Server*/
setInterval(function() {
  http.get("http://fatimachat.herokuapp.com");
  console.log("awake heroku server.....!!")
}, 600000);

//const apiRouter = express.Router()

app.use(logger('dev', {}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
//app.use(cookieParser());

//app.use('/api/simpletext', require('./routes/simpletext'));
//app.use('/api/webhook', require('./routes/webhook'));

//var databaseUrl = "mongodb://blank:lhs90250@localhost:27017/fatimachat";
var databaseUrl = "mongodb+srv://blank:lhs90250@cluster0-vkwql.mongodb.net/fatimachat?retryWrites=true&w=majority";
//mongoose.connect(databaseUrl,  { useNewUrlParser: true });
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.connect(databaseUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log('DB Connected!'))
  .catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
  });

const database = mongoose.connection;
database.on('error', console.error.bind(console, 'mongoose connection error'));
database.on('open', function() {
  console.log('db connecting ok');
})
database.on('disconnected', function() {
  console.log('db reconnecting...')
  //setInterval(connectDB, 5000);
})

//app.use('/api/listcard_drinfo', require('./routes/listcard_drinfo'));
app.use('/api/listcard_deptlist', require('./routes/listcard_deptlist'));
app.use('/api/listcard_diaglist', require('./routes/listcard_diaglist'));
app.use('/api/listcard_drsearch', require('./routes/listcard_drsearch'));

app.use('/api/yeyak_drcode', require('./routes/yeyak_drcode'));
app.use('/api/yeyak_date', require('./routes/yeyak_date'));

app.use('/api/login', require('./routes/users/login'));
//app.use('/api/login_phone', require('./routes/users/login_phone'));
app.use('/api/logout', require('./routes/users/logout'));

app.use('/index', require('./routes/index'));
app.use('/test', require('./routes/test'));
//app.use('/index2',require('./routes/index2'));

app.use('/', function(req, res, next) {
  console.log('Time:', Date.now());
});

app.use((req, res, next) => {
  res.status(404).send('not found');
});

app.use(function(err, req, res) {
  console.error(err);
  res.status(500).send('server error');
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Example skill server listening on port 3000!');
});
