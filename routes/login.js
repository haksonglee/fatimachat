const router = require('express').Router();

//http://localhost:3000/api/listcard_drlist/
var dept = "";
var deptname = "";
var responseBody;

router.post('/', function(req, res) {

      var botids = req.body.bot
      var botid = botids['id']

      console.log("bot id :  " + botid)

      //var dbuser = require('./dbuser_search');
      //var dbuser_data = dbuser.dbuser_search(botid)

      //console.log("druser dbsearch result = " + dbuser_data)

      var params = req.body.action.params

      var patient_name = params['patient_name']
      var patient_birth = params['patient_birth']
      console.log("login.js : patient_name = " + patient_name)
      console.log("login.js : patient_birth = " + patient_birth)

      //var drlist_script = require('./call_login');
      //var drlist_jsondata = drlist_script.call_login(patient_name, patient_birth)

      var patient_hospno = 'patient_hospno'

      // db 로그인 정보
      var chatUser = require("./dbuser_schema")
      //if (drlist_jsondata.patient_hospno != undefined) {
        console.log("db insert test start 111")

        chatUser.findOne({
            id: botid
          }, function(err, users) {
            if (err) {
              return res.status(404).json({
                  message: "user not found"
                })
              }
              else {
                if (users == null) {
                  //insert
                  var userModel = new chatUser();
                  userModel.id = botid
                  userModel.name = patient_name
                  userModel.birth = patient_birth
                  userModel.hospno = 'patient_hospno'
                  userModel.save()

                  responseBody = {
                    "version": "2.0",
                    "template": {
                      "outputs": [{
                        "basicCard": {
                          "title": "안녕하세요 " + patient_name + "(" + patient_hospno + ") 님",
                          "description": "창원파티마병원 예약 시스템 로그인 완료",
                          "buttons": [{
                              "action": "message",
                              "label": "진료예약 계속",
                              "messageText": "진료예약"
                            },
                            {
                              "action": "message",
                              "label": "로그아웃",
                              "messageText": "로그아웃"
                            }
                          ]
                        }
                      }]
                    }
                  }
                } else {
                  console.log(users.id)
                  console.log(users.name)
                  console.log(users.birth)
                  console.log(users.hospno)
                  responseBody = {
                    "version": "2.0",
                    "data": {
                      "id": users.id,
                      "name": users.name,
                      "birth": users.birth,
                      "hospno":users.hospno
                    }
                  };
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
                }
              });

          //}
          //db
          //var drlist_bodydata = JSON.stringify(drlist_script.call_login(patient_name, patient_birth))


          res.status(200).send(responseBody);
        });

      module.exports = router;
