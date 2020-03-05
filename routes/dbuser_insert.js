exports.dbuser_insert = function() {
var mongoose = require('mongoose');
Schema = mongoose.Schema;
var UserSchema = new Schema({
  id: String,
  name: String,
  birth: String,
  hospno: String
});


  //var User = mongoose.model('fatima_users', 'fatima_users');
  var sampledata = new fatima_users({id:'f4a33e57ce3a74d74c0c554e029bcffaa8e51e94ce76d1291d1dfd0be40dee1102',
                    name:'이학송',
                    birth:'2010-01-01',
                    hospno:"000602887"})
  var user = new User(sampledata);
  user.save(function(err) {
    if (err) {
      return next(err);
    } else {
      return user;
    }
  });
}
