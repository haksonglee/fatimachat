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
    return users
  })

  //console.log('resonseBody', resonseBody)
  //responseBody = {"patient_hospno" : '444'}
  return result

}
