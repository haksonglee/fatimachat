//로그아웃

const router = require('express').Router();
router.post('/', function(req, res) {

  var body = [];
  var responseBody = {
    "version": "2.0",
    "template": {
      "outputs": [{
        "simpleText": {
          "text": "로그아웃 되었습니다."
        }
      }]
    },
    "context": {
      "values": [{
        "name": "patient_info",
        "lifeSpan": 0
      }]
    }
  }
  res.status(200).send(responseBody);
});

module.exports = router;
