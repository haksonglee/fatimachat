const router = require('express').Router();

//크롤링

//const getDrlist = require(__dirname + '/crawling/drlist.js')
const dataPath = __dirname + '/crawling/drlist.json'
var fs = require('fs')

//http://localhost:3000/api/listcard_drlist/
var dept;
var deptname;
var drname;

router.post('/', function(req, res) {
  var params = req.body.action.params
  //console.log(params['진료과명'])
  //dept = params['dept']
  //console.log(JSON.stringify(params))
  deptname = params['진료과명'] //시나리오 필수파라미터 이름 동일해야함
  drname = params['진료의사']
  //yedate = params['예약일자']
  //ydate_json = JSON.parse(yedate)
  console.log("진료과명 : " + deptname)
  console.log("진료의사 : " + drname)
  //console.log("예약일자 : " + ydate_json.date)
  //dept = "ET"
  //deptname = "이비인후과"
  //getDrlist(dept);
  //var name2 = req.body;
  //console.log(JSON.stringify(name2))
  //var name2 = req.body;
  //console.log(JSON.stringify(name2))

  try {
    var patient_name = req.body.contexts[1].params.patient_name.value;
    var patient_birth = req.body.contexts[1].params.patient_birth.value;
    console.log('patient_name is : ' + patient_name)
    console.log('patient_birth is : ' + patient_birth)
  } catch (e) {
    //console.log(e)
    console.log("로그인 없음")
  }

  var string = fs.readFileSync(dataPath, 'utf-8');
  var data = JSON.parse(string)
  var body = [];
  //console.log(data.length)
/*
  for (var i = 0; i < data.length; i++) {
    var item = data[i];

    if (drname == undefined) {
      if (item.deptname == '[' + deptname + ']') {
        item.title = item.title + '  ' + item.deptname
        dept = item.dept
        body.push(item)
      }

    } else {
      if (item.title == drname) {
        item.title = item.title + '  ' + item.deptname
        dept = item.dept
        item.link.web = item.link.web + '&patient_name='+ patient_name + '&patient_birth=' + patient_birth
        //console.log(item.link.web)
        body.push(item)
      }
    }
  }
*/
  var drlist_script = require('./call_drlist');
  var drlist_bodydata = JSON.stringify(drlist_script.call_drlist(deptname, drname, 'dept'))
  //console.log(drlist_bodydata)
  responseBody = drlist_bodydata
  res.status(200).send(responseBody);
});

module.exports = router;
