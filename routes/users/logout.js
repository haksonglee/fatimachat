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
    //if (users.length == 0) {
    //insert
    //var userModel = new chatUser();
    //userModel.id = botid
    //userModel.name = patient_name
    //userModel.birth = patient_birth
    //userModel.hospno = drlist_jsondata.patient_hospno
    //userModel.save()
    //}
    //else {
    //console.log("user text", users[0].name)
    //  }
    res.status(200).send(responseBody );
  }); //findremove
}); // router

module.exports = router;
