// webhook.js

const router = require('express').Router();

router.post('/rep1', function(req, res) {
  var params = req.body.action.params
  const responseBody = {
    version: "2.0",
    data: {
      menu: "bulgogi",
      date: "2월 22일",
      favorite: params['파라1']
    }
  };
  res.status(200).send(responseBody);
});

module.exports = router;
