const router = require('express').Router();

//http://localhost:3000/api/listcard_drlist/
var response_json = require('../call_response_json')
var responseBody;

router.post('/', function(req, res) {

  //console.log(req.body.bot)
  var botids = req.body.bot
  var botid = botids['id']

  //var patient_birth = params['patient_birth']
  var chatUser = require("./dbuser_schema")
  chatUser.remove({
    id: botid
  }, function(err, users) {
    if (err) {
      return res.status(404).json({
        message: "user not found"
      })
    } else { // db connect find trying OK...
      responseBody = response_json.response_json('logout')
    }
    res.status(200).send(responseBody );
  }); //findremove
}); // router

module.exports = router;
