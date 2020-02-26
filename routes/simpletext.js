// simpletext.js

const router = require('express').Router();

//localhost:3000/simpletext/test
router.post('/test', function(req, res) {
  var name = req.body.action.name;
  console.log(name)
  var reqjson = JSON.stringify(req)

  console.log(reqjson)
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
