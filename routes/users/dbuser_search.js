exports.dbuser_search = function(botUserKey) {

  var chatUser = require("./dbuser_schema");

  const result = chatUser.findOne({
    id: botUserKey
  }, function(err, users) {
    if (err) {
      return handleError(err);
    }
    return users
  })
  return result
}
