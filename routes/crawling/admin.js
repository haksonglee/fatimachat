const router = require('express').Router();

var exex_script1 = require('./reservation_department')
var exex_script2 = require('./department')
var exex_script3 = require('./drlist')

router.post('/reservation_department', async function(req, res) {

  exex_script1.reservation_department()
  res.send({result:"ok"})
}); // router

router.post('/department', async function(req, res) {

  exex_script2.department()
  res.send({result:"ok"})
}); // router

router.post('/drlist', async function(req, res) {

  exex_script3.drlist()
  res.send({result:"ok"})
}); // router

module.exports = router;
