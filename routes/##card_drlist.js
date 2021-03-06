const router = require('express').Router();

//크롤링

//const getDrlist = require(__dirname + '/crawling/drlist.js')
const dataPath = __dirname + '/crawling/drlist_card.json'
var fs = require('fs')

//http://localhost:3000/api/listcard_drlist/
var dept = "";
var deptname = "";

router.post('/', function(req, res) {
  var params = req.body.action.params
  //console.log(params['진료과명'])
  //dept = params['dept']
  //console.log(JSON.stringify(params))
  deptname = params['진료과명'] //시나리오 필수파라미터 이름 동일해야함
  //console.log("진료과명 : " + deptname)
  //dept = "ET"
  //deptname = "이비인후과"
  //getDrlist(dept);
  //var name2 = req.body;
  //console.log(JSON.stringify(name2))

  var string = fs.readFileSync(dataPath, 'utf-8');
  var data = JSON.parse(string)
  var body = [];
  //console.log(data.length)

  for (var i = 0; i < data.length; i++) {
    var item = data[i];
    if (item.deptname == '[' + deptname + ']') {
      dept = item.dept
      body.push(item)
    }

  };

  const responseBody = {
    "version": "2.0",
    "template": {
      "outputs": [{
        "carousel": {
          "type": "basicCard",
          "items": body
        }
      }]
    }
  }
  res.status(200).send(responseBody);
});

module.exports = router;
