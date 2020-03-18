var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
  id:  {type : String, required:true, unique:true},
  name: String,
  //birth: String,
  hospno: String,
  recentdate : Date
});
module.exports = mongoose.model('fatima_users', UserSchema);
