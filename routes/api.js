var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('api with a resource');
});

router.get('/say', function(req, res, next) {
  res.send('say with a resource');
});

router.get('/sayHello', function(req, res, next) {
  const responseBody = {
    contents: [
      {
        type: "text",
        text: "hello"
      }
    ]
  };

  res.status(200).send(responseBody);
});

module.exports = router;
