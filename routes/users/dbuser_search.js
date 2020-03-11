exports.dbuser_search = function(botid) {

  var chatUser = require("./dbuser_schema");
  var patient_hospno;
  var resonseBody;

  //const result =  chatUser.findOne({ id: botid });
  //console.log(result.name)
  //return result

  const result = chatUser.findOne({
    id: botid
  }, function(err, users) {
    if (err) {
      return handleError(err);
    }
    if (users === null || users === undefined){
      //사용자 없음 -> 로그인 메세지
    } else {
      //사용자 있음 -> 환영 / 로그아웃 메세지
    }
    return users
  })

  //console.log('resonseBody', resonseBody)
  //responseBody = {"patient_hospno" : '444'}
  return result

}
