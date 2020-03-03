// quickreplies.js 진료과 리스트

const router = require('express').Router();

router.post('/quickReplies', function(req, res) {
  const responseBody = {
    version: "2.0",
    template: {
      outputs: [{
        simpleText: {
          text: "hello"
        }
      }],
      quickReplies: [{
        label: "처음으로",
        action: "message",
        messageText: "처음으로"
      }]
    }
  }
  res.status(200).send(responseBody);
});

module.exports = router;
