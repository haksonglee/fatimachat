const router = require('express').Router();

//크롤링

const getDrlist = require(__dirname + '/crawling/drlist.js')
const dataPath=__dirname + '/crawling/drlist.json'
var fs=require('fs')

//http://localhost:3000/api/listcard_drlist/
var dept = "";
var deptname=  "";

router.post('/', function(req, res) {
  var params = req.body.action.params
  //console.log(params['진료과명'])
  //dept = params['dept']
  console.log(JSON.stringify(params))
  deptname = params['진료과'] //시나리오 필수파라미터 이름 동일해야함
  //console.log("진료과명 : " + deptname)
  //dept = "ET"
  //deptname = "이비인후과"
  //getDrlist(dept);
  var name2 = req.body.contexts;
  console.log(JSON.stringify(name2))

  if( deptname != "진료과안내") {
    //console.log('pass 1' + deptname)
      var string= fs.readFileSync(dataPath, 'utf-8');
      var data=JSON.parse(string)
      var body=[];
      //console.log(data.length)

      for (var i=0;i<data.length;i++){
         var item = data[i];
         if(item.deptname == '['+deptname+']') {
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
                  title: "창원파티마병원 " + deptname,
                  imageUrl: "" //"https://www.fatimahosp.co.kr/pages/department?deptdoctor="+ dept
                },
                items:
                  body
                ,
                buttons: [
                  {
                    label: "모바일예약 이동",
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
} else {
  //console.log('pass 2' + deptname)
          const dataPath2=__dirname + '/crawling/reservation_deptlist.json'
          var string2= fs.readFileSync(dataPath2, 'utf-8');
          var data2=JSON.parse(string2)
          var body2=[];
          for (var i=0;i<data2.length;i++){
             var item2 = data2[i];
             //item.imageUrl = 'https://www.fatimahosp.co.kr' + item.imageUrl
             body2.push(item2)
          };

          const responseBody2 = {
            version: "2.0",
            template: {
              outputs: [
                {
                  simpleText:{
                    text:"진료과명을 선택해 주십시오"
                  }
                }
              ],
              quickReplies:
                body2
            }
        }
        res.status(200).send(responseBody2);
}


});

module.exports = router;
