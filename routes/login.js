const router = require('express').Router();

//http://localhost:3000/api/listcard_drlist/
var dept = "";
var deptname = "";

router.post('/', function(req, res) {

  var botid = req.body.bot
  console.log("bot id :  " + botid['id'])

  var dbuser = require('./dbuser_search');
  var dbuser_data = dbuser.dbuser_search(botid)

  console.log("druser dbsearch result = " + dbuser_data)

  var params = req.body.action.params

  var patient_name = params['patient_name']
  var patient_birth = params['patient_birth']
  console.log("login.js : patient_name = " + patient_name)
  console.log("login.js : patient_birth = " + patient_birth)

  var drlist_script = require('./call_login');
  var drlist_jsondata = drlist_script.call_login(patient_name, patient_birth)

  // db 로그인 정보
  var chatUser = require("./dbuser_schema")
  if (drlist_jsondata.patient_hospno != undefined) {
      console.log("db insert test start 111")

      chatUser.find({id : botid}, function (err, users) {
        if (err) {return handleError(err);}
      //console.log(users)
        console.log("users.length = " + users.length)
        if (users.length == 0){
        //insert
          var userModel = new chatUser();
              userModel.id = botid
              userModel.name = patient_name
              userModel.birth = patient_birth
              userModel.hospno = drlist_jsondata.patient_hospno
              userModel.save()
          } else {
            //for (var i=0;i< users.length;i++) {
              //console.log(users[i].name + users[i].id + users[i].birth + users[i].hospno)
              //var name = users[i].name
              //databody.push({name});

          }
      })
}
  //db
  var drlist_bodydata = JSON.stringify(drlist_script.call_login(patient_name, patient_birth))

  res.status(200).send(drlist_bodydata);
  });

  module.exports = router;
