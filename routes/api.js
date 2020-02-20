var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('api with a resource');
});

router.get('/say', function(req, res, next) {
  res.send('say with a resource');
});

router.post('/sayHello', function(req, res) {
  const responseBody = {
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText: {
            text: "hello I'm Ryan"
          }
        }
      ]
    }
  };

  res.status(200).send(responseBody);
});

module.exports = router;
