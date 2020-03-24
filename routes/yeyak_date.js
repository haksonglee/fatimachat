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

router.post('/', async function(req, res) {
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

  //
  // var drlist_script = require('./call_yedate');
  // var drlist_bodydata = JSON.stringify(drlist_script.call_yedate(deptname, drname, yedate))
  // responseBody = drlist_bodydata
  //
  // console.log(JSON.stringify(drlist_bodydata))

  //const dataPath = __dirname + '/crawling/drlist.json'
  //var fs = require('fs')

  //  exports.call_yedate = async function(deptname, drname) {
  const data = require('./crawling/drlist.json')
  let ocsuser = require("./users/ocsuser_search")

  let tempbody;
  let filterbody = data.filter(item => {
    return (item.deptname === deptname && item.drname === drname)
  })

  let buttonstr1;
  let buttonstr2;

  buttonstr1 = `{
          "label": "전체의사 선택",
          "action": "message",
          "messageText": "${deptname} 예약" }`

  //console.log(buttonstr1)
  buttonstr1 = JSON.parse(buttonstr1)

  let drcode;
  let title;
  //for (let i = 0; i < filterbody.length; i++) {
  drcode = filterbody[0].drcode
  title = filterbody[0].title
  //}

  //예약 가능 시간
  let yetime_list = title + ' 예약 가능 일자' + '\n\n';
  let yetime_find = 0;
  await ocsuser.request_yetime(drcode).then(function(body) {
    yetime_find = body.length;
    for (let i = 0; i < yetime_find; i++) {
      yetime_list += body[i].ddate + ':' + body[i].ampm + ' ' + body[i].yetime + '\n'
      if(i > 0 && (i + 1) % 5 ===0){
        yetime_list += '\n'
      }
    }
  });

  console.log('yetime', yetime_list)

  let yelink = "https://www.fatimahosp.co.kr/pages/department?drcode=" + drcode
  //console.log(typeof filterbody, filterbody.bodydeptname)
  //console.log('deptname = ' + deptname)
  switch (deptname) {
    case '피부과':
    case '안과':
    case '비뇨의학과':
    case '정신건강의학과':
    case '재활의학과':
    case '치과':
      buttonstr2 = {
        label: "컨택센터 전화예약",
        action: "phone",
        phoneNumber: "055-270-1000"
      }
      //texthelp = "해당 진료과는 전화예약만 가능합니다. 컨텍센터로 연락부탁드립니다."
      break;

    default:
      buttonstr2 = {
        label: "모바일예약 이동",
        action: "webLink",
        webLinkUrl: yelink
      }
      //texthelp = "진료를 원하시는 의료진을 선택해주세요."
  }

  const responseBody = {
    version: "2.0",
    template: {
      outputs: [{
          listCard: {
            header: {
              title: "창원파티마병원 의료진",
              imageUrl: "https://www.fatimahosp.co.kr/assets/images/sub/sub_visual5.jpg"
            },
            items: filterbody,
            buttons: [
              buttonstr1,
              buttonstr2
            ]
          }
        },
        {
          simpleText: {
            text: yetime_list
          }
        }
      ]
    }
  }
  //   return responseBody
  // }


  res.status(200).send(responseBody);
});

module.exports = router;
