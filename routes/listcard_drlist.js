const router = require('express').Router();

//크롤링

//const getDrlist = require(__dirname + '/crawling/drlist.js')
const dataPath = __dirname + '/crawling/drlist.json'
var fs = require('fs')

//http://localhost:3000/api/listcard_drlist/
var dept = "";
var deptname = "";
var drname = "";

router.post('/', function(req, res) {
  var params = req.body.action.params
  //console.log(params['진료과명'])
  //dept = params['dept']
  //console.log(JSON.stringify(params))
  deptname = params['진료과명'] //시나리오 필수파라미터 이름 동일해야함
  drname = params['진료의사']
  console.log("진료과명 : " + deptname)
  console.log("진료의사 : " + drname)
  //dept = "ET"
  //deptname = "이비인후과"
  //getDrlist(dept);
  //var name2 = req.body;
  //console.log(JSON.stringify(name2))
  //var name2 = req.body;
  //console.log(JSON.stringify(name2))


  var string = fs.readFileSync(dataPath, 'utf-8');
  var data = JSON.parse(string)
  var body = [];
  //console.log(data.length)

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
        console.log(item.link.web)
        body.push(item)
      }
    }
  }

  var buttonstr;
  console.log('deptname = ' + deptname)
  switch (deptname) {
    case '피부과':
    case '안과':
    case '비뇨의학과':
    case '정신건강의학과':
    case '재활의학과':
    case '치과':
      buttonstr = {
        label: "컨택센터 전화예약",
        action: "phone",
        phoneNumber: "055-270-1000"
      }
      break;

    default:
      buttonstr = {
        label: "모바일예약 이동",
        action: "webLink",
        webLinkUrl: "https://www.fatimahosp.co.kr/pages/department?deptdoctor=" + dept
      }

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
          items: body,
          buttons: [
            buttonstr
          ]
        }
      }]
    }
  }
  res.status(200).send(responseBody);
});

module.exports = router;
