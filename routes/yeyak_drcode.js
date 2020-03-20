const router = require("express").Router();

//const getDrlist = require(__dirname + '/crawling/drlist.js')
//const dataPath = __dirname + "/crawling/drlist.json";
const response_json = require("./call_response_json");
//const fs = require("fs");
let session_user = require('./users/user');

const post = router.post("/", async function(req, res) {
  //파라미터
  let params = req.body.action.params;
  let deptname = params["진료과명"]; //시나리오 필수파라미터 이름 동일해야함
  //let drname = params["진료의사"];

  //let intent = req.body.intent.name;
  //let botUserKey = req.body.userRequest.user.id;
  //let botid = botids["id"];
  let botUserKey = "f4a33e57ce3a74d74c0c554e029bcffaa8e51e94ce76d1291d1dfd0be40dee1102"
  //사용자 확인
  //console.log(botUserKey)
  // 사용자 확인 ---> mongo db

  let users;
  let search = require("./users/dbuser_search");
  users = await search.dbuser_search(botUserKey); // db connect find trying OK...
  if (users === null || users === undefined) {
    // db에 사용자 정보가 없으며
    //welcome message -> 로그인
    let responseBody = response_json.response_json("unknown");
    res.status(200).send(responseBody);

    //console.log('first intent = ', req.session.user.intent)
    //var patient_name = responseBody.name;
    //var patient_hospno = responseBody.hospno;
    //console.log(responseBody)
    //responseBody.template.outputs[0].basicCard.title = "안녕하세요 " + patient_name + "(" + patient_hospno + ") 님"
    //res.status(200).send(resultdata);
  } else {
    session_user.patient_name = users.name;
    session_user.patient_hospno = users.hospno;
    // 로그인 ok -> 진료예약
    //let string = fs.readFileSync(dataPath, "utf-8");
    //let data = JSON.parse(string);
    //let body = [];
    let date = new Date()
    if (users.recentdate.toLocaleDateString() === date.toLocaleDateString() || users.name === 'blank') {
      // 당일 재방문
      //console.log("date check", date.toLocaleDateString())
      let drlist_script = require("./call_drlist");
      let jsondata = drlist_script.call_drlist(deptname);
      //console.log(deptname, drname)
      console.log(JSON.stringify(jsondata))
      let jsoncnt = jsondata.template.outputs[1].listCard.items.length
      for (let i = 0; i < jsoncnt; i++) {
        jsondata.template.outputs[1].listCard.items[i].link.web +=
          '&name=' + users.name + '&hospno=' + users.hospno
      }
      let responseBody = JSON.stringify(jsondata)
      res.status(200).send(responseBody);
    } else {
      //당일 첫방문
      //db update recentdate
      let chatUser = require("./users/dbuser_schema");
      let date = new Date()
      // try {
      //   console.log("update start")
      //   chatUser.updateOne({
      //     id: botid
      //   }, {
      //     $set: {
      //       recentdate: date,
      //       name : '수수수'
      //     }
      //   }, {multi:true,new:true})
      // } catch (err) {
      //   console.log('update error')
      // }
      var query = {
        id: botUserKey
      };
      var update = {
        recentdate: date
      };
      var options = {
        new: false
      };
      chatUser.findOneAndUpdate(query, update, options, function(err, users) {
        // Done!
        // doc.title = "new title"
        console.log("users ===> ", users)
        responseBody = response_json.response_json("login_ok");
        responseBody.template.outputs[0].basicCard.title =
          "안녕하세요 " + users.name + "(" + users.hospno + ") 님";
        res.status(200).send(responseBody);
      });
      //
    }
  }
});

module.exports = router;
