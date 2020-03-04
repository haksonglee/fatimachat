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
    if (item.deptname == '[' + deptname + ']' || item.title == deptname || desc.indexOf(deptname) >= 0) {
      dept = item.dept
      item.title = item.title + '  ' + item.deptname
      body.push(item)
      deptname_or_drname = true
    }

  };

  const responseBody = {
    version: "2.0",
    template: {
      outputs: [{
        listCard: {
          header: {
            title: "창원파티마병원 의료진",
            imageUrl: "" //"https://www.fatimahosp.co.kr/pages/department?deptdoctor="+ dept
          },
          items: body,
          buttons: [{
            label: "진료과 안내 이동",
            action: "webLink",
            webLinkUrl: "https://www.fatimahosp.co.kr/pages/department?deptdoctor=" + dept
          }]
        }
      }]
    }
  }

  return responseBody
}
