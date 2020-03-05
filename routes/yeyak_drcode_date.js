const router = require('express').Router();

//크롤링

var dept, deptname, drname

router.post('/', function(req, res) {
  // 로그인 체크
  try {
    var patient_name = req.body.contexts[1].params.patient_name.value;
    var patient_birth = req.body.contexts[1].params.patient_birth.value;
    console.log('patient_name is : ' + patient_name)
    console.log('patient_birth is : ' + patient_birth)
  } catch (e) {
    //console.log(e)
    console.log("로그인 없음")
  }

  var params = req.body.action.params

  deptname = params['진료과명'] //시나리오 필수파라미터 이름 동일해야함
  drname = params['진료의사']
  yedate = params['예약일자']

  ydate_json = JSON.parse(yedate)
  yeyakdate = ydate_json.date

  console.log("진료과명 : " + deptname)
  console.log("진료의사 : " + drname)
  console.log("예약일자 : " + ydate_json.date)

  var body = [];

  if (deptname == undefined && drname == undefined) {
    var deptlist_script = require('./call_deptlist');
    var deptlist_bodydata = JSON.stringify(deptlist_script.call_deptlist())
    var responseBody = deptlist_bodydata;
  }
  else {
      var drlist_script = require('./call_drlist');
      var drlist_bodydata = drlist_script.call_drlist(deptname, drname, 'dept')
      var itemlength = drlist_bodydata.template.outputs[0].listCard.items.length

      for (var i=0;i<itemlength;i++){
        drlist_bodydata.template.outputs[0].listCard.items[i].link.web =
        drlist_bodydata.template.outputs[0].listCard.items[i].link.web + '&patient_name='+'이학송' +
        '&patient_hospno='+'000602887'
      };
      //var drlist_bodydata2 = JSON.stringify(drlist_bodydata1)
      responseBody = drlist_bodydata
    }
  res.status(200).send(responseBody);
});

module.exports = router;
