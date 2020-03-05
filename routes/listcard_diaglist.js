const router = require('express').Router();

var diagname = "";

router.post('/', function(req, res) {
  var params = req.body.action.params
  diagname = params['상병명'] //시나리오 필수파라미터 이름 동일해야함

  var drlist_script = require('./call_drlist');
  var drlist_bodydata = JSON.stringify(drlist_script.call_drlist(diagname))

  res.status(200).send(drlist_bodydata);
});

module.exports = router;





  diagname = params['상병명'] //시나리오 필수파라미터 이름 동일해야함

  //dept = "ET"

  //deptname = "이비인후과"
  //getDrlist(dept);

  //console.log("diagname = " + diagname)
  var string = fs.readFileSync(dataPath, 'utf-8');
  var data = JSON.parse(string)
  var body = [];
  //console.log(data.length)

  for (var i = 0; i < data.length; i++) {
    var item = data[i];
    var desc = item.description;
    if (desc.indexOf(diagname) >= 0) {
      item.title = item.title + '  ' + item.deptname
      body.push(item)
    }

  };

  const responseBody = {
    version: "2.0",
    template: {
      outputs: [{
        listCard: {
          header: {
            title: "전문과목 의료진 찾기 : " + diagname,
            imageUrl: "" //"https://www.fatimahosp.co.kr/pages/department?deptdoctor="+ dept
          },
          items: body,
          buttons: [{
            label: "모바일 홈페이지",
            action: "webLink",
            webLinkUrl: "" //"https://www.fatimahosp.co.kr/pages/department?deptdoctor=" + dept
          }]
        }
      }]
    }
  }
  res.status(200).send(responseBody);

});

module.exports = router;
