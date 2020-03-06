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

  console.log("login jsondata : " + drlist_jsondata.patient_hospno)
  var drlist_bodydata = JSON.stringify(drlist_script.call_login(patient_name, patient_birth))

  res.status(200).send(drlist_bodydata);
  });

  module.exports = router;
