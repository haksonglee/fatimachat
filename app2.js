const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');

const router = express.Router();

app.use(logger('dev', {}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

router.route('/sayHello').post(function(req, res) {
  console.log("hhhhhh");
});

app.use('/', router);

app.listen(3000, function() {
  console.log('Example skill server listening on port 3000!');
});
