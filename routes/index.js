var express = require("express");
var router = express.Router();

//var chatUser = require("../model/post")

//read router
router.get("/", function(req, res) {
  let data = [
    { name: "이태봄", birth: "20080229", hospno: "001042679", phone: "0099" },
    { name: "이학송", birth: "19711108", hospno: "000602887", phone: "0074" },
    { name: "김영숙", birth: "19770125", hospno: "000947029", phone: "5521" },
    { name: "김영숙", birth: "19770125", hospno: "000880099", phone: "9903" },
    { name: "이룸",   birth: "20080229", hospno: "001042679", phone: "0080" },
    { name: "최금선", birth: "19500808", hospno: "000988990", phone: "0063" },
    { name: "김금자", birth: "19410105", hospno: "000655506", phone: "9877" },
  ];
  //console.log("data type ", typeof data);
  res.json(data);
});

module.exports = router;
