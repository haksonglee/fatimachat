const router = require('express').Router();

//http://localhost:3000/api/listcard_drlist/
var dept = "";
var deptname = "";

router.post('/', function(req, res) {

  var botid = JSON.stringify(req.body.bot.id)
  console.log("bot id :  " + botid)

  var params = req.body.action.params

  var patient_name = params['patient_name']
  var patient_birth = params['patient_birth']
  console.log("login.js : patient_name = " + patient_name)
  console.log("login.js : patient_birth = " + patient_birth)

  var drlist_script = require('./call_login');
  var drlist_jsondata = drlist_script.call_login(patient_name, patient_birth)

  // db 로그인 정보
  var chatUser = require("./dbuser_schema")
  if (drlist_jsondata.patient_hospno != undefined) {
    try {
      var user = chatUser.findOne({id:botid});
      if (!user) {
        // insert
        var userModel = new chatUser();
            userModel.id = botid;
            userModel.name = patient_name;
            userModel.birth = patient_birth;
            userModel.hospno = patient_hospno;
            userModel
              .save()
              .then(cuser => {
                console.log('insert ok')
              })
              .catch(err => {
                console.log('insert err ==> ' + err)
              })
      }
    } catch(err) {
        console.log('db user findOne error')
      }
  }
  //db
  var drlist_bodydata = JSON.stringify(drlist_script.call_login(patient_name, patient_birth))

  res.status(200).send(drlist_bodydata);
  });

  module.exports = router;
