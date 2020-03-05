const router = require('express').Router();

var diagname = "";

router.post('/', function(req, res) {
  var params = req.body.action.params
  diagname = params['상병명'] //시나리오 필수파라미터 이름 동일해야함

  var drlist_script = require('./call_drlist');
  var drlist_bodydata = JSON.stringify(drlist_script.call_drlist(diagname, 'sang'))

  res.status(200).send(drlist_bodydata);
});

module.exports = router;
