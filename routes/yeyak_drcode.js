const router = require('express').Router();

//const getDrlist = require(__dirname + '/crawling/drlist.js')
const dataPath = __dirname + '/crawling/drlist.json'
const response_json = require('./call_response_json')

var fs = require('fs')
var dept, deptname, drname;

router.post('/', async function(req, res) {
  //파라미터
  var params = req.body.action.params;
  var intent = req.body.intent.name;
  //let intent = req.body.intent.name;
  deptname = params['진료과명'] //시나리오 필수파라미터 이름 동일해야함
  drname = params['진료의사']
  var botids = req.body.bot
  var botid = botids['id']
  //console.log("진료과명 : " + deptname)
  //console.log("진료의사 : " + drname)


  //사용자 확인
  var search = require('./users/dbuser_search')
  var users = await search.dbuser_search(botid); // db connect find trying OK...
  if (users === null || users === undefined) {
    //login message
    var responseBody = response_json.response_json('welcome')
    req.session.user = {
      id : botid,
      intent : intent
    };
    console.log('first intent = ', intent)
    //var patient_name = responseBody.name;
    //var patient_hospno = responseBody.hospno;
    //console.log(responseBody)
    //responseBody.template.outputs[0].basicCard.title = "안녕하세요 " + patient_name + "(" + patient_hospno + ") 님"
    //res.status(200).send(resultdata);
  } else { // 로그인 확인
    if (req.session.user) {
      console.log('second intent = ', intent)
      console.log('session intent = ', req.session.user.intent)

    }
    var string = fs.readFileSync(dataPath, 'utf-8');
    var data = JSON.parse(string)
    var body = [];
    //console.log(data.length)
    /*
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
            item.link.web = item.link.web + '&patient_name='+ patient_name + '&patient_birth=' + patient_birth
            //console.log(item.link.web)
            body.push(item)
          }
        }
      }
    */
    var drlist_script = require('./call_drlist');
    var drlist_bodydata = JSON.stringify(drlist_script.call_drlist(deptname, drname, 'dept'))
    //console.log(drlist_bodydata)
    responseBody = drlist_bodydata
  }
  res.status(200).send(responseBody);
});

module.exports = router;
