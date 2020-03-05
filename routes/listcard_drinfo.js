const router = require('express').Router();

var deptname;
var drname;

router.post('/', function(req, res) {
  var params = req.body.action.params
  deptname = params['진료과명'] //시나리오 필수파라미터 이름 동일해야함
  drname
  var drlist_script = require('./call_drlist');
  var drlist_bodydata = JSON.stringify(drlist_script.call_drlist(deptname, drname, 'dept'))

  res.status(200).send(drlist_bodydata);
});

module.exports = router;
