const router = require('express').Router();

//크롤링

//const getDrlist = require(__dirname + '/crawling/drlist.js')
const dataPath=__dirname + '/crawling/drlist.json'
var fs=require('fs')

//http://localhost:3000/api/listcard_drlist/
var dept = "";
var deptname=  "";

router.post('/', function(req, res) {
  var params = req.body.action.params
  var patient_name = params['patient_name']
  var patient_birth = params['patient_birth']
  //dept = params['dept']
  //console.log(JSON.stringify(params))
  //deptname = params['진료과명'] //시나리오 필수파라미터 이름 동일해야함
  //console.log("진료과명 : " + deptname)
  //dept = "ET"
  //deptname = "이비인후과"
  //getDrlist(dept);
  //var name2 = req.body;
  //console.log(JSON.stringify(name2))
  var name2 = req.body;
  console.log(JSON.stringify(name2))
  //console.log('pass login module')

  //break;

  // fatimahosp 접속 환자명 + 생년월일 로 환자정보 getElementsByClassName()

  //if 존재하면 pass else "없다는 정보 - 전화접수 안내 message "

  var check_yn = 'Y'

    var string= fs.readFileSync(dataPath, 'utf-8');
    var data=JSON.parse(string)
    var body=[];
    var responseBody;
    //console.log(data.length)

    if (patient_name != '다시') {
        responseBody = {
            "version": "2.0",
            "template": {
              "outputs": [
                {
                  "basicCard": {
                    "title": "안녕하세요 " + patient_name + "님",
                    "description": "창원파티마병원 예약 시스템 로그인 완료",
                    "buttons": [
                      {
                        "action": "message",
                        "label": "진료예약 계속",
                        "messageText": "진료예약"
                      }
                    ]
                  }
                }
              ]
            },
            "context": {
              "values":[
                {
                  "name":"patient_info",
                  "lifesPan":5,
                  "params": {
                    "patient_confirm": {"value":"confirm","resolvedValue":"confirm"}
                  }
                }
              ]
            }
          }
      } else {
          responseBody = {
              "version": "2.0",
              "template": {
                "outputs": [
                  {
                    "basicCard": {
                      "title": "안녕하세요 " + patient_name + "님",
                      "description": "환자정보를 찾을수 없습니다 \n 다시 로그인 부탁드립니다",
                      "buttons": [
                        {
                          "action": "message",
                          "label": "로그인",
                          "messageText": "login"
                        }
                      ]
                    }
                  }
                ]
              }
            }
      }
    res.status(200).send(responseBody);
});

module.exports = router;
