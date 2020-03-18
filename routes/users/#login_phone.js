const router = require('express').Router();
const request = require("request");

//http://localhost:3000/api/listcard_drlist/
let response_json = require('../call_response_json')
let user = require('./user');

let ocsuser = require("./ocsuser_search")

router.post('/', async function(req, res) {

  //로그인 처리
  /*
  try {
    var name2 = req.body;
    for (var i = 0; i < req.body.contexts.length; i++) {
      if (req.body.contexts[i].name === 'patient_info') {
        var patient_name = req.body.contexts[i].params.환자명.value;
        var patient_birth = req.body.contexts[i].params.생년월일.value;
      }
    }
  } catch (e) {
    console.log(e)
  }

*/
  let input_name = '이학송'
  let input_birth = '19712208'
  let datachk=new Date(input_birth.substr(0, 4) + '-' + input_birth.substr(4, 2) + '-' + input_birth.substr(6, 2))
  if (isNaN(datachk.getTime()) || input_birth.length !== 8) {
    let responseBody = response_json.response_json("type_error");
    res.status(200).send(responseBody);
    return
  }

  //console.log(req.body.bot)
  let botUserKey = req.body.userRequest.user.id
  console.log("login_phone" , botUserKey)
  //let botid = botids['id']
  let params = req.body.action.params
  //var patient_phone = params['휴대폰뒷번호']
  let patient_phone = '0074'
  //console.log("patient_phone = " + patient_phone)

  // 사용자 정보 조회  -fatima 홈페이지 연동
  //   patien_name, patient_birth, patient_phone
  let patient_find = 0;
  let patient_data;
  await ocsuser.request_ocsuser(input_name, input_birth).then(function(body) {
    patient_result = body.length;
    body.forEach((item, index) => {
      if (item.phone === patient_phone) {
        patient_find = 1
        patient_data = item
      }
    }); //forEach
  });
  // 개발로직 여기

  if (patient_find === 0) { // 병원시스템 유저 정보 없음
    responseBody = response_json.response_json("login_fail"); // responseBody
    res.status(200).send(responseBody);
  } else { //ocsuser find
    // db 로그인 정보

    let search = require("./dbuser_search");
    let users = await search.dbuser_search(botUserKey); // db connect find trying OK...
    //console.log("findONe : " + users)
    if (users === null || users === undefined) {

      user.patient_name = patient_data.name;
      user.patient_hospno = patient_data.hospno;;
      try {
        let chatUser = require("./dbuser_schema")
        let userModel = new chatUser();
        let date = new Date();
        userModel.id = botUserKey;
        userModel.name = patient_name;
        //userModel.birth = patient_birth;
        userModel.hospno = patient_hospno;
        userModel.recentdate = date
        userModel.save()
      } catch (err) {
        console.log("userModel save error")
      }
      responseBody = response_json.response_json('login_ok')
      responseBody.template.outputs[0].basicCard.title = "안녕하세요 " + patient_name + "(" + patient_hospno + ") 님"
      res.status(200).send(responseBody);
    } else { // 사용자 정보가 있으면
      //console.log("select ok " + users)
      global.patient_name = users.name;
      global.patient_hospno = users.hospno;
      responseBody = response_json.response_json('login_ok')
      //console.log(responseBody)
      responseBody.template.outputs[0].basicCard.title = "안녕하세요 " + patient_name + "(" + patient_hospno + ") 님"
      res.status(200).send(responseBody);
    }
  } //else
  //res.status(200).send(responseBody);
}); // router

module.exports = router;
