const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');

//const apiRouter = express.Router();
const simpletext_Router = require('./routes/simpletext');
const webhook_Router = require('./routes/webhook');
//const image_Router = require('./routes/image');
//const card_Router = require('./routes/card');
//const cardimage_Router = require('./routes/cardimage');
const listcard_Router = require('./routes/listcard');
//const knowledge_Router = require('./routes/knowledge');
const quickreplies_Router = require('./routes/quickreplies');

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
app.use('/api/listcard', listcard_Router);
//app.use('/api/knowledge', knowledge_Router);
app.use('/api/quickreplies',quickreplies_Router);

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Example skill server listening on port 3000!');
});
