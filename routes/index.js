var express = require("express");
var router = express.Router();

//var chatUser = require("../model/post")

//read router
router.get("/", function(req, res) {
  let data = [
    { name: "환자명1", birth: "20200101", hospno: "000100001", phone: "0074" },
    { name: "환자명2", birth: "20200102", hospno: "000200002", phone: "8237" }
  ];
  //console.log("data type ", typeof data);
  res.json(data);
});

module.exports = router;
