const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');
var mongoose    = require('mongoose');

/* Prevent Sleep inHeroku Server*/
setInterval(function () {
  http.get("http://fatimachat.herokuapp.com");
  console.log("awake heroku server.....!!")
}, 600000);

//const apiRouter = express.Router();
const simpletext_Router = require('./routes/simpletext');
const webhook_Router = require('./routes/webhook');
//const image_Router = require('./routes/image');
//const card_Router = require('./routes/card');
//const cardimage_Router = require('./routes/cardimage');
//const listcard_drlist_Router = require('./routes/listcard_drlist');
//예약관련
const yeyak_drcode_Router = require('./routes/yeyak_drcode');
const yeyak_date_Router = require('./routes/yeyak_date');
const yeyak_drcode_date_Router = require('./routes/yeyak_drcode_date');

const listcard_drinfo_Router = require('./routes/listcard_drinfo');
const card_drlist_Router = require('./routes/card_drlist');

const listcard_deptlist_Router = require('./routes/listcard_deptlist');
const listcard_drsearch_Router = require('./routes/listcard_drsearch');
const listcard_diaglist_Router = require('./routes/listcard_diaglist');
const login_Router = require('./routes/login');
const logout_Router = require('./routes/logout');
//const knowledge_Router = require('./routes/knowledge');
const quickreplies_Router = require('./routes/quickreplies');
const test_Router = require('./routes/test');
const dbuser_Router = require('./routes/dbuser');

app.use(logger('dev', {}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/api/simpletext', simpletext_Router);
app.use('/api/webhook', webhook_Router);
//app.use('/api/image', image_Router);
//app.use('/api/card', card_Router);
//app.use('/api/cardimage', cardimage_Router);
app.use('/api/yeyak_drcode', yeyak_drcode_Router);
app.use('/api/yeyak_date', yeyak_date_Router);
app.use('/api/yeyak_drcode_date', yeyak_drcode_date_Router);
//app.use('/api/listcard_drlist', listcard_drlist_Router);
app.use('/api/listcard_drinfo', listcard_drinfo_Router);
app.use('/api/card_drlist', card_drlist_Router);
app.use('/api/listcard_deptlist', listcard_deptlist_Router);
app.use('/api/listcard_diaglist', listcard_diaglist_Router);
app.use('/api/listcard_drsearch', listcard_drsearch_Router);
app.use('/api/login', login_Router);
app.use('/api/logout', logout_Router);
//app.use('/api/knowledge', knowledge_Router);
app.use('/api/quickreplies',quickreplies_Router);
app.use('/api/test',test_Router);
app.use('/api/dbuser',dbuser_Router);

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Example skill server listening on port 3000!');
});

/*
var database;
var UserSchema;
var Usermodel;

var databaseUrl = "mongodb://localhost:27017/fatimachat";

mongoose.connect(databaseUrl);
database = mongoose.connection;

database.on('error', console.error.bind(console,'mongoose connection error'));
database.on('open', function() {
  console.log('db connecting ok');
})

database.on('disconnected', function() {
  console.log('db reconnecting...')
  //setInterval(connectDB, 5000);
})
*/
