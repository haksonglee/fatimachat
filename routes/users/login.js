const router = require("express").Router();
const request = require("request");

//http://localhost:3000/api/listcard_drlist/
let response_json = require("../call_response_json");

function request_user() {
  return new Promise(function(resolve, reject) {
    request({ uri: "http://localhost:3000/index", json: true }, function(
      err,
      res,
      body
    ) {
      if (err) {
        reject(err);
      }
      //let patient_result = body.length;
      //console.log("pass 00000000000000", patient_result, body);
      resolve(body);
    });
  });
}

function test() {
  console.log("skip?");
}

router.post("/", async function(req, res) {
  //console.log(req.body)
  let botids = req.body.bot;
  let params = req.body.action.params;
  let botid = botids["id"];
  let patient_name = params["환자명"];
  let patient_birth = params["생년월일"];

  //if (req.session.user) { console.log('ok......', req.session.user.intent) }
  //else{console.log("not found session")}

  let patient_result = 0;
  // 사용자 정보 조회  -fatima 홈페이지 연동

  await request_user().then(function(body) {
    //console.log("done");
    patient_result = body.length;
    //console.log("pass 100000000000000", patient_result, "=======", body);

    if (patient_result > 1) {
      let responseBody = response_json.response_json("login_phone");
      res.status(200).send(responseBody);
    }
  });

  console.log("this path is ok")
  // patient_name, patient_birth
  // 개발로직 여기
  // 이중번호 확인
  if (patient_result > 1) {
    responseBody = response_json.response_json("login_phone");
    res.status(200).send(responseBody);
  } else {
    // db 로그인 정보
    let chatUser = require("./dbuser_schema");
    //if (drlist_jsondata.patient_hospno != undefined) {
    let search = require("./dbuser_search");
    let users = search.dbuser_search(botid); // db connect find trying OK...
    //console.log("findONe : " + users)
    if (users === null || users === undefined) {
      //사용자 정보가 없으면

      //병원 시스템 사용자 정보 search ---외부 모듈
      //hospital_ocs_patient_search start
      let patient_hospno;
      patient_hospno = "000000001";
      if (patient_birth === "99999999") {
        patient_hospno = null;
      }
      //hospital_ocs_patient_search end
      if (patient_hospno === undefined || patient_hospno === null) {
        // 사용자 정보 없음 -> 다시 로그인,
        // 병원 처음사용자 => 안내 컨택센터 전화예약
        // 죄송합니다. 해당 정보의 사용자를 찾지 못했습니다.
        // 1. 다시 로그인 버튼
        // 2. 컨택센터 연결 버튼
        responseBody = response_json.response_json("login_fail"); // responseBody
      } //if (patient_hospno === undefined)
      else {
        // 병원시스템 사용자 정보 확인 -> db등록시작
        //insert
        try {
          let userModel = new chatUser();
          userModel.id = botid;
          userModel.name = patient_name;
          userModel.birth = patient_birth;
          userModel.hospno = "patient_hospno";
          userModel.save();
        } catch (err) {
          console.log("userModel save error");
        }

        responseBody = response_json.response_json("login_ok");
        responseBody.template.outputs[0].basicCard.title =
          "안녕하세요 " + patient_name + "(" + patient_hospno + ") 님";
        /*if (req.session.user) {
          intent = req.session.user.intent

          req.session.destroy(function() {
            req.session;
          })
          responseBody.template.outputs[0].basicCard.buttons[0].messageText = intent
        }*/
      }
      res.status(200).send(responseBody);
    } else {
      // 사용자 정보가 있으면
      //console.log("select ok " + users)
      patient_name = users.name;
      patient_hospno = users.hospno;
      responseBody = response_json.response_json("login_ok");
      //console.log(responseBody)
      responseBody.template.outputs[0].basicCard.title =
        "안녕하세요 " + patient_name + "(" + patient_hospno + ") 님";
      /*if (req.session.user) {
        intent = req.session.user.intent

        req.session.destroy(function() {
          req.session;
        })
        responseBody.template.outputs[0].basicCard.buttons[0].messageText = intent
      }*/
      res.status(200).send(responseBody);
    }
  } //else 이중번호가 아니면
  //res.status(200).send(responseBody);
}); // router

module.exports = router;
