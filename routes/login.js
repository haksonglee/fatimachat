const router = require('express').Router();

//http://localhost:3000/api/listcard_drlist/
var dept = "";
var deptname = "";

router.post('/', function(req, res) {
  var params = req.body.action.params

  var patient_name = params['patient_name']
  var patient_birth = params['patient_birth']
  console.log("login.js : patient_name = " + patient_name)
  console.log("login.js : patient_birth = " + patient_birth)

  var drlist_script = require('./call_login');
  var drlist_bodydata = JSON.stringify(drlist_script.call_login(patient_name, patient_birth))

  res.status(200).send(drlist_bodydata);
  });

  module.exports = router;
