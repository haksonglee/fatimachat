const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');
var mongoose = require('mongoose');

var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

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
app.use(cookieParser());

//app.use('/api/simpletext', require('./routes/simpletext'));
//app.use('/api/webhook', require('./routes/webhook'));

var database;
var UserSchema;
var Usermodel;

//var databaseUrl = "mongodb://blank:lhs90250@localhost:27017/fatimachat";
var databaseUrl = "mongodb+srv://blank:lhs90250@cluster0-vkwql.mongodb.net/fatimachat?retryWrites=true&w=majority";
//mongoose.connect(databaseUrl,  { useNewUrlParser: true });
mongoose.Promise = global.Promise;

mongoose.connect(databaseUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log('DB Connected!'))
  .catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
  });

database = mongoose.connection;

database.on('error', console.error.bind(console, 'mongoose connection error'));
database.on('open', function() {
  console.log('db connecting ok');
})
database.on('disconnected', function() {
  console.log('db reconnecting...')
  //setInterval(connectDB, 5000);
})

app.use(session({
  secret : 'blank',
  resave: false,
  saveUninitialized: true,
  cookie: {expires : new Date(Date.now() + 86400 * 1000)}, //24시간
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use('/api/listcard_drinfo', require('./routes/listcard_drinfo'));
//app.use('/api/card_drlist', require('./routes/card_drlist'));
app.use('/api/listcard_deptlist', require('./routes/listcard_deptlist'));
app.use('/api/listcard_diaglist', require('./routes/listcard_diaglist'));
app.use('/api/listcard_drsearch', require('./routes/listcard_drsearch'));
//app.use('/api/quickreplies', require('./routes/quickreplies'));

app.use('/api/yeyak_drcode',      require('./routes//yeyak_drcode'));
app.use('/api/yeyak_date',        require('./routes//yeyak_date'));
app.use('/api/yeyak_drcode_date', require('./routes//yeyak_drcode_date'));

app.use('/api/login',       require('./routes/users/login'));
app.use('/api/login_phone', require('./routes/users/login_phone'));
app.use('/api/logout',      require('./routes/users/logout'));

//app.use('/admin', require('./routes/crawling/admin'));
//app.use('/api/mongodb', require('./routes/mongodb'));
app.use('/test', require('./test'));

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Example skill server listening on port 3000!');
});
