const router = require('express').Router();

let deptname;
let drname;
let yedate;

router.post('/', function(req, res) {
  let params = req.body.action.params
  deptname = params['진료과명'] //시나리오 필수파라미터 이름 동일해야함
  drname
  let drlist_script = require('./call_drlist');
  let drlist_bodydata = JSON.stringify(drlist_script.call_drlist(deptname, drname, yeate, 'dept'))

  res.status(200).send(drlist_bodydata);
});

module.exports = router;
