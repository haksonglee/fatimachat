const router = require('express').Router();

var exex_script = require('./routes/crawling/reservation_department')

router.get('/', async function(req, res) {

  exex_script.reservation_department()
  res.send({result:"ok"})
}); // router

module.exports = router;
