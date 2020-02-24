// simpletext.js

const router = require('express').Router();

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
