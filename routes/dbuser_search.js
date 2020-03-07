exports.dbuser_search = function(botid) {

  var chatUser = require("./dbuser_schema");
  var patient_hospno;

  chatUser.findOne({id : botid}, function (err, users) {
    if (err) {return handleError(err);}
  //console.log(users)
    //console.log("users.length = " + users.length)
    if (users.length > 0){
        patient_hospno = user.patient_hospno
      }
    })
    return patient_hospno
}
