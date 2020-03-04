const router = require('express').Router();

//크롤링

//const getDrlist = require(__dirname + '/crawling/deptlist.js')
const dataPath = __dirname + '/crawling/reservation_deptlist.json'
var fs = require('fs')

//http://localhost:3000/api/listcard_drlist/
var dept = "";
var deptname = "";

router.post('/', function(req, res) {
  //var params = req.body.action.params
  //console.log(params['진료과명'])
  //dept = params['dept']
  //deptname = params['진료과명'] //시나리오 필수파라미터 이름 동일해야함
  //console.log("진료과명 : " + deptname)
  //dept = "ET"
  //deptname = "이비인후과"
  //getDrlist(dept);
  //var name2 = req.body;
  //console.log(JSON.stringify(name2))

  // 1. 로그인 정보 확인 -> context 정보 환자명 / 생년월일 확인
  try {
    var patient_name = req.body.contexts[1].params.patient_name.value;
    var patient_birth = req.body.contexts[1].params.patient_birth.value;
    console.log('patient_name is : ' + patient_name)
    console.log('patient_birth is : ' + patient_birth)
  } catch (e) {
    //console.log(e)
    console.log("로그인 없음")
  }
  //
  //var patient_name = params['patient_name']
  //var patient_birth = params['patient_birth']

  var string = fs.readFileSync(dataPath, 'utf-8');
  var data = JSON.parse(string)
  var body = [];
  let responseBody;

  // // 1. 로그인 확인 -> 로그인 없을시 로그인 message
  if (patient_name == '이학송') {
    responseBody = {
      "version": "2.0",
      "template": {
        "outputs": [{
          "basicCard": {
            "title": "예약을 위해 로그인 부탁드립니다.",
            "description": "성명 / 생년월일을 입력해주세요",
            "buttons": [{
              "action": "message",
              "label": "로그인",
              "messageText": "로그인"
            }]
          }
        }]
      }
    }
  } else {
    var deptlist_script = require('./call_deptlist');
    responseBody = JSON.stringify(drlist_script.call_deptlist())
  }
  // 전체목록 listcard 최대 5개
  // 초과시 에러 ...


  res.status(200).send(responseBody);

});

module.exports = router;
