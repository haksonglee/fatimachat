const router = require('express').Router();

let diagname = "";

router.post('/', function(req, res) {
  let params = req.body.action.params
  diagname = params['상병명'] //시나리오 필수파라미터 이름 동일해야함

  let drlist_script = require('./call_diagsearch');
  let drlist_bodydata = JSON.stringify(drlist_script.call_diagsearch(diagname))

  res.status(200).send(drlist_bodydata);
});

module.exports = router;
