const router = require('express').Router();

//크롤링

//const getDrlist = require(__dirname + '/crawling/deptlist.js')
const dataPath=__dirname + '/crawling/reservation_deptlist.json'
var fs=require('fs')

//http://localhost:3000/api/listcard_drlist/
var dept = "";
var deptname=  "";

router.post('/', function(req, res) {
  //var params = req.body.action.params
  //console.log(params['진료과명'])
  //dept = params['dept']
  //deptname = params['진료과명'] //시나리오 필수파라미터 이름 동일해야함
  //console.log("진료과명 : " + deptname)
  //dept = "ET"
  //deptname = "이비인후과"
  //getDrlist(dept);

  var string= fs.readFileSync(dataPath, 'utf-8');
  var data=JSON.parse(string)
  var body=[];
  //console.log(data.length)

// 전체목록 listcard 최대 5개
// 초과시 에러 ...
  for (var i=0;i<data.length;i++){
     var item = data[i];
     //item.imageUrl = 'https://www.fatimahosp.co.kr' + item.imageUrl
     body.push(item)
  };

  const responseBody = {
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText:{
            text:"진료과명을 선택해 주십시오"
          }
        }
      ],
      quickReplies: [
        body
    ]
  }
};
  res.status(200).send(responseBody);

});

module.exports = router;
