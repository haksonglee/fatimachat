const router = require('express').Router();

//http://localhost:3000/api/listcard_drlist/
var response_json = require('../call_response_json')
var responseBody;

router.post('/', function(req, res) {

  //console.log(req.body.bot)
  var botids = req.body.bot
  var botid = botids['id']
  var params = req.body.action.params
  var patient_name = params['환자명']
  var patient_birth = params['생년월일']

  // 사용자 정보 조회  -fatima 홈페이지 연동
  // patient_name, patient_birth
  // 개발로직 여기
  if (patient_name === '김영숙') {
    var patient_result = 2
  }
  // 이중번호 확인
  if (patient_result > 1) {
    responseBody = response_json.response_json('login_phone')
    res.status(200).send(responseBody);
  } else {

    // db 로그인 정보
    var chatUser = require("./dbuser_schema");
    //if (drlist_jsondata.patient_hospno != undefined) {
    chatUser.findOne({
      //id: botid
      name: patient_name
    }, function(err, users) {
      if (err) {
        return res.status(404).json({
          message: "user not found"
        })
      } else { // db connect find trying OK...
        //console.log("findONe : " + users)
        if (users === null || users === undefined) { //사용자 정보가 없으면

          //병원 시스템 사용자 정보 search ---외부 모듈
          //hospital_ocs_patient_search start
          var patient_hospno;
          patient_hospno = '000000001'
          if (patient_birth === '99999999') {
            patient_hospno = null
          }
          //hospital_ocs_patient_search end
          if (patient_hospno === undefined || patient_hospno === null) {
            // 사용자 정보 없음 -> 다시 로그인,
            // 병원 처음사용자 => 안내 컨택센터 전화예약
            // 죄송합니다. 해당 정보의 사용자를 찾지 못했습니다.
            // 1. 다시 로그인 버튼
            // 2. 컨택센터 연결 버튼
            responseBody = response_json.response_json('login_fail') // responseBody
          } //if (patient_hospno === undefined)
          else { // 병원시스템 사용자 정보 확인 -> db등록시작
            //insert
            try {
              var userModel = new chatUser();
              userModel.id = botid + patient_name
              userModel.name = patient_name
              userModel.birth = patient_birth
              userModel.hospno = 'patient_hospno'
              userModel.save()
            } catch (err) {
              console.log("userModel save error")
            }

            responseBody = response_json.response_json('login_ok')
            responseBody.template.outputs[0].basicCard.title = "안녕하세요 " + patient_name + "(" + patient_hospno + ") 님"
          }
        } else { // 사용자 정보가 있으면
          console.log("select ok " + users)
          patient_name = users.name;
          patient_hospno = users.hospno;
          responseBody = response_json.response_json('login_ok')
          //console.log(responseBody)
          responseBody.template.outputs[0].basicCard.title = "안녕하세요 " + patient_name + "(" + patient_hospno + ") 님"
        }
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
      res.status(200).send(responseBody);
    }); //findOne
  }
}); // router

module.exports = router;
