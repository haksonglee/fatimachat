const router = require('express').Router();

//크롤링

var dept;
var deptname;

router.post('/', function(req, res) {
  // 1. 로그인 정보 확인 -> context 정보 환자명 / 생년월일 확인
  try {
    var patient_name = req.body.contexts[1].params.patient_name.value;
    var patient_birth = req.body.contexts[1].params.patient_birth.value;
    console.log('patient_name is : ' + patient_name)
    console.log('patient_birth is : ' + patient_birth)
  } catch (e) {
    var login_pass = 'NO'
    console.log(e)
  }


  // // 1. 로그인 확인 -> 로그인 없을시 로그인 message
  if (login_pass == 'NO') {
    var patient_name;
    var patient_birth;

    var drlist_script = require('./call_login');
    var responseBody = JSON.stringify(drlist_script.call_login(patient_name, patient_birth))

  } else {
    var deptlist_script = require('./call_deptlist');
    responseBody = JSON.stringify(deptlist_script.call_deptlist())
  }

  res.status(200).send(responseBody);

});

module.exports = router;
