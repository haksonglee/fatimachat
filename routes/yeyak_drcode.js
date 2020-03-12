const router = require("express").Router();

//const getDrlist = require(__dirname + '/crawling/drlist.js')
const dataPath = __dirname + "/crawling/drlist.json";
const response_json = require("./call_response_json");

const fs = require("fs");

const post = router.post("/", async function(req, res) {
  //파라미터
  let params = req.body.action.params;
  let deptname = params["진료과명"]; //시나리오 필수파라미터 이름 동일해야함
  let drname = params["진료의사"];
  let botids = req.body.bot;
  let botid = botids["id"];
  //console.log("진료과명 : " + deptname)
  //console.log("진료의사 : " + drname)

  let users;
  //사용자 확인
  //console.log(intent)
  // 사용자 확인 ---> mongo db
  if (
    botid === "5e1bf6a492690d00019eb692!" ||
    botid === "5e1bf6a492690d00019eb692"
  ) {
    let search = require("./users/dbuser_search");
    users = await search.dbuser_search(botid); // db connect find trying OK...
  }
  if (users === null || users === undefined) {
    // db에 사용자 정보가 없으며
    //welcome message -> 로그인
    let responseBody = response_json.response_json("welcome");
    res.status(200).send(responseBody);

    //console.log('first intent = ', req.session.user.intent)
    //var patient_name = responseBody.name;
    //var patient_hospno = responseBody.hospno;
    //console.log(responseBody)
    //responseBody.template.outputs[0].basicCard.title = "안녕하세요 " + patient_name + "(" + patient_hospno + ") 님"
    //res.status(200).send(resultdata);
  } else {
    // 로그인 확인
    let string = fs.readFileSync(dataPath, "utf-8");
    let data = JSON.parse(string);
    let body = [];

    let drlist_script = require("./call_drlist");
    let drlist_bodydata = JSON.stringify(
      drlist_script.call_drlist(deptname, drname, "dept")
    );
    //console.log(drlist_bodydata)
    let responseBody = drlist_bodydata;
    res.status(200).send(responseBody);
  }
});

module.exports = router;
