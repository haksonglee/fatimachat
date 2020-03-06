var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
  id:  {type : String, required:true, unique:true},
  name: String,
  birth: String,
  hospno: String
});
module.exports = mongoose.model('fatima_users', UserSchema);
