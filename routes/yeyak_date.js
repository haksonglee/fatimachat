const router = require('express').Router();

//크롤링

//const getDrlist = require(__dirname + '/crawling/drlist.js')
//const dataPath = __dirname + '/crawling/drlist.json'
//var fs = require('fs')

//http://localhost:3000/api/listcard_drlist/
var dept;
var deptname;
var drname;

var responseBody;

router.post('/', function(req, res) {
  var params = req.body.action.params
  let intent = req.body.intent.name;
  //console.log(params['진료과명'])
  //dept = params['dept']
  //console.log(JSON.stringify(params))
  deptname = params['진료과명'] //시나리오 필수파라미터 이름 동일해야함
  drname = params['진료의사']
  yedate = params['예약일자']
  //ydate_json = JSON.parse(yedate)
  //yeyakdate = ydate_json.date
  console.log("진료과명 : " + deptname)
  console.log("진료의사 : " + drname)
  console.log("예약일자 : " + yedate)

  var body = [];


  var drlist_script = require('./call_yedate');
  var drlist_bodydata = JSON.stringify(drlist_script.call_yedate(deptname, drname, yedate))
  responseBody = drlist_bodydata

res.status(200).send(responseBody);
});

module.exports = router;
