const dataPath = __dirname + '/crawling/drlist.json'
var fs = require('fs')

exports.call_drlist = function(deptname) {

  //deptname = params['진료과명'] //시나리오 필수파라미터 이름 동일해야함
  var string = fs.readFileSync(dataPath, 'utf-8');
  var data = JSON.parse(string)
  var body = [];
  var dept
  //console.log(data.length)

  for (var i = 0; i < data.length; i++) {
    var item = data[i];
    if (item.deptname == '[' + deptname + ']' || item.title == deptname) {
      dept = item.dept
      item.title = item.title + '  ' + item.deptname
      body.push(item)
      //deptname_or_drname = true
    } else if (item.description.indexOf(deptname) >= 0){
      dept = item.dept
      item.title = item.title + '  ' + item.deptname
      body.push(item)
    }


  };

  var buttonstr;
  //console.log('deptname = ' + deptname)
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

  return responseBody
}
