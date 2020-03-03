const router = require('express').Router();

//크롤링

//const getDrlist = require(__dirname + '/crawling/drlist.js')
//const getDrlist = require(__dirname + '/crawling/drlist.js')
const dataPath=__dirname + '/crawling/drlist.json'
var fs=require('fs')

//http://localhost:3000/api/listcard_drlist/
var dept = "";
var drname=  "";

router.post('/', function(req, res) {
  var params = req.body.action.params
  //console.log(params['진료의사'])

  //var name2 = req.body;
  //console.log(JSON.stringify(name2))

  //dept = params['dept']
  drname = params['진료의사'] //시나리오 필수파라미터 이름 동일해야함

  //console.log(drname)
  //console.log(params['진료과명'])
  //dept = params['dept']
  deptname = params['진료과명'] //시나리오 필수파라미터 이름 동일해야함

  //dept = "ET"
  //deptname = "이비인후과"
  //getDrlist(dept);

  var string= fs.readFileSync(dataPath, 'utf-8');
  var data=JSON.parse(string)
  var body=[];
  //console.log(data.length)

  for (var i=0;i<data.length;i++){
     var item = data[i];
     if(item.title == drname) {
        item.title = item.title + '  ' + item.deptname
        dept = item.dept
        body.push(item)
     }

  };

  const responseBody = {
  version: "2.0",
  template: {
    outputs: [
      {
        listCard: {
          header: {
            title: "창원파티마병원 의료진",
            title: "창원파티마병원 " + deptname,
            imageUrl: "" //"https://www.fatimahosp.co.kr/pages/department?deptdoctor="+ dept
          },
          items:
            body
          ,
          buttons: [
            {
              label: "모바일 홈페이지",
              action: "webLink",
              webLinkUrl: "https://www.fatimahosp.co.kr/pages/department?deptdoctor=" + dept
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
