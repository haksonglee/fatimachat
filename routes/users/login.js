const router      = require("express").Router();

//http://localhost:3000/api/listcard_drlist/
let response_json = require("../call_response_json");
let user          = require('./user');
let ocsuser       = require("./ocsuser_search")

router.post("/", async function(req, res) {
  //console.log(req.body)
  let botUserKey = req.body.userRequest.user.id;
  let params = req.body.action.params;
  //let botid = botids["id"];
  let input_name = params["환자명"];
  let input_birth = params["생년월일"];
  var input_phone = params['휴대폰뒷번호']

  if (input_phone !== undefined) { // 휴대폰 번호 확인자
    try {
      for (var i = 0; i < req.body.contexts.length; i++) {
        if (req.body.contexts[i].name === 'patient_info') {
          input_name = req.body.contexts[i].params.환자명.value;
          input_birth = req.body.contexts[i].params.생년월일.value;
          console.log('contexts ', input_name, input_birth)
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  let datachk = new Date(input_birth.substr(0, 4) + '-' + input_birth.substr(4, 2) + '-' + input_birth.substr(6, 2))
  if (isNaN(datachk.getTime()) || input_birth.length !== 8) {
    let responseBody = response_json.response_json("type_error");
    res.status(200).send(responseBody);
    return
  }

  let patient_result = 0;

  // 사용자 정보 조회  -fatima 홈페이지 연동
  //let patient_data = await ocsuser.request_ocsuser(input_name, input_birth).then(function(body) {
  //patient_result = body.length;
  //console.log('check 0 ===> ',  body)
  //return body
  //});

  // 사용자 정보 조회  -fatima 홈페이지 연동
  //   patien_name, patient_birth, patient_phone
  let patient_find = 0;
  let patient_data;
  await ocsuser.request_ocsuser(input_name, input_birth).then(function(body) {
    patient_find = body.length;
    if (patient_find > 1) {
      body.forEach((item, index) => {
        if (item.phone === input_phone) {
          patient_find = 1
          patient_data = item
        }
      }); //forEach
    } else {
      patient_data = body[0]
    }
  });
  // 개발로직 여기

  //console.log("patient_data===>", patient_data, patient_find)
  if (patient_find > 1) { // 병원시스템 유저 정보 없음
    responseBody = response_json.response_json("login_phone"); // responseBody
    res.status(200).send(responseBody);
  } else if (patient_find === 0) { // 병원시스템 유저 정보 없음
    responseBody = response_json.response_json("login_fail"); // responseBody
    res.status(200).send(responseBody);
  } else if (patient_find === 1) { // 이중번호가 아니면서 1건
    // db 로그인 정보
    //if (drlist_jsondata.patient_hospno != undefined) {
    let search = require("./dbuser_search");
    let users = await search.dbuser_search(botUserKey); // db connect find trying OK...
    //console.log("findONe : " + users)
    if (users === null || users === undefined) {
      //사용자 정보가 없으면

      //병원 시스템 사용자 정보 search ---외부 모듈
      //hospital_ocs_patient_search start
      user.login_name = patient_data.name;
      user.login_hospno = patient_data.hospno;
      //console.log("login_name ==> ", user.login_name, patient_data.name)
      //console.log("login_hospno ==> ", user.login_hospno , patient_data.hospno)

      try {
        let chatUser = require("./dbuser_schema");
        let userModel = new chatUser();
        let date = new Date();
        userModel.id = botUserKey;
        userModel.name = user.login_name;
        //userModel.birth = patient_birth;
        userModel.hospno = user.login_hospno;
        userModel.recentdate = date
        userModel.save();
      } catch (err) {
        console.log("userModel save error");
      }
      responseBody = response_json.response_json("login_ok");
      responseBody.template.outputs[0].basicCard.title =
        "안녕하세요 " + user.login_name + "(" + user.login_hospno + ") 님";
      res.status(200).send(responseBody);
    } else {
      // 사용자 정보가 있으면
      responseBody = response_json.response_json("login_ok");
      responseBody.template.outputs[0].basicCard.title =
        "안녕하세요 " + users.name + "(" + users.hospno + ") 님";
      res.status(200).send(responseBody);
    }
  } else {
    res.end("")
  }
  //res.status(200).send(responseBody); //내부처리
}); // router

module.exports = router;
