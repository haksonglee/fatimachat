var express = require('express')
var router = express.Router();

//var chatUser = require("../model/post")

//read router

  router.get('/', function(req, res, next) {

   if (req.session.user) {
     console.log("pass")
    var id = req.session.user.id
    var intent = req.session.user.intent
}
    res.end(id + intent)
    });
module.exports = router;
