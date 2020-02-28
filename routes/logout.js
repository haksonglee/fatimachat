const router = require('express').Router();

//크롤링

//const getDrlist = require(__dirname + '/crawling/drlist.js')
//const dataPath=__dirname + '/crawling/drlist.json'
//var fs=require('fs')

//http://localhost:3000/api/listcard_drlist/
var dept = "";
var deptname=  "";

router.post('/', function(req, res) {
  //var params = req.body.action.params
  //var patient_name = params['patient_name']
  //var patient_birth = params['patient_birth']
  //try {
  //      var patient_hospno = req.body.contexts[0].params.patient_confirm.value;
  //    } catch (err) {
    //console.error(err)
  //      patient_hospno = "undefined"
  //      }

   //dept = params['dept']
  //console.log(JSON.stringify(params))
  //deptname = params['진료과명'] //시나리오 필수파라미터 이름 동일해야함
  //console.log("patient_name : " + patient_name)
  //console.log("patient_birth : " + patient_birth)
  //console.log("patient_confirm : " + patient_hospno)
  //dept = "ET"
  //deptname = "이비인후과"
  //getDrlist(dept);
  //var name2 = req.body;
  //console.log(JSON.stringify(name2))
  //var name2 = req.body;
  //console.log(JSON.stringify(name2))
  //console.log('pass login module')

  //break;

  //var string= fs.readFileSync(dataPath, 'utf-8');
  //var data=JSON.parse(string)
  var body=[];
  /*
  var responseBody = {
      "version": "2.0",
      "template": {
        "outputs": [
            {
                "simpleText": {
                    "text": "로그아웃 되었습니다."
                }
            }
        ]
      },
      "context": {
          "values":[
            {
              "name":"patient_info",
              "lifeSpan":0
            }
          ]
        }
      } */
    var responseBody = {
    "version": "2.0",
    "template": {
        "outputs": [
            {
                "simpleText": {
                    "text": "간단한 텍스트 요소입니다."
                }
            }
        ]
    }
}
    res.status(200).send(responseBody);
});

module.exports = router;
