const router = require('express').Router();

router.get('/schema', function(req, res) {
  var mongoose = require('mongoose');
  Schema = mongoose.Schema;
  var UserSchema = new Schema({
    id: String,
    name: String,
    birth: String,
    hospno: String
  });
  var User = mongoose.model('fatima_user', UserSchema);
  var sampledata = {id:'f4a33e57ce3a74d74c0c554e029bcffaa8e51e94ce76d1291d1dfd0be40dee1102',
                    name:'이학송2',
                    birth:'2010-01-11',hospno:"000602887"}
  var user = new User(sampledata);
  user.save(function(err) {
    if (err) {
      return next(err);
    } else {
      res.json(user); 
    }
  });
});

router.get('/model', function(req, res) {
  var dbuser_insert = require('./dbuser_insert');
  res.send(dbuser_insert.dbuser_insert())

});

module.exports = router;
