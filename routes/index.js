var express = require('express')
var router = express.Router();

//var chatUser = require("../model/post")

//read router
router.post('/', function(req, res, next) {

  req.session.user = {
    id : '88hrklareiowqflsklfds',
    intent : '이학송 예약'
  };

  console.log(req.session.id)

  console.log(new Date(Date.now() + 86400 * 1000))
  res.end("end")
  });

module.exports = router;
