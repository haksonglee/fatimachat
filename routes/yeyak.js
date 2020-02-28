const router = require('express').Router();

//크롤링

const getDrlist = require(__dirname + '/crawling/drlist.js')
const dataPath=__dirname + '/crawling/drlist.json'
var fs=require('fs')

//http://localhost:3000/api/listcard_drlist/
var dept = "";
var deptname=  "";

router.post('/', function(req, res) {
  var params = req.body.action.params
  console.log(params['patient_name'])
  console.log(params['patient_birth'])
  //dept = params['dept']
  //console.log(JSON.stringify(params))
  //deptname = params['진료과명'] //시나리오 필수파라미터 이름 동일해야함
  //console.log("진료과명 : " + deptname)
  //dept = "ET"
  //deptname = "이비인후과"
  //getDrlist(dept);
  //var name2 = req.body;
  //console.log(JSON.stringify(name2))
  //var name2 = req.body;
  //console.log(JSON.stringify(name2))
  //console.log('pass login module')

  //break;

  // fatimahosp 접속 환자명 + 생년월일 로 환자정보 getElementsByClassName()

  //if 존재하면 pass else "없다는 정보 - 전화접수 안내 message "

    var string= fs.readFileSync(dataPath, 'utf-8');
    var data=JSON.parse(string)
    var body=[];
    //console.log(data.length)

    for (var i=0;i<data.length;i++){
       var item = data[i];
       if(item.deptname == '['+deptname+']') {
         dept = item.dept
         body.push(item)
       }

    };

      const responseBody =
      {
        "version": "2.0",
        "template": {
          "outputs": [
            {
              "basicCard": {
                "title": "보물상자",
                "description": "보물상자 안에는 뭐가 있을까",
                "buttons": [
                  {
                    "action": "message",
                    "label": "진료예약 계속",
                    "messageText": "진료예약 계속"
                  }
                ]
              }
            }
          ]
        }
      }
    res.status(200).send(responseBody);
});

module.exports = router;
