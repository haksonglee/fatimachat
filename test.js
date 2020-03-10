const router = require('express').Router();

var response_json = require('./routes/call_response_json')
var search = require('./routes/users/dbuser_search')

router.get('/', async function(req, res) {
  var dbuser = await search.dbuser_search('1e1bf6a492690d00019eb692!');
  console.log('1', dbuser)


  if (dbuser !== null) {
    console.log("dbuser = " + dbuser.hospno)
    var responseBody = dbuser.hospno;

    res.status(200).send(responseBody);
  } else {
    var responseBody = response_json.response_json('login_fail')
    res.status(200).send(responseBody);
  }

}); // router

module.exports = router;
