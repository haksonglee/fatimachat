var express = require("express");
var router = express.Router();

//var chatUser = require("../model/post")

//read router
router.get("/ocsuser", function(req, res) {
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

router.get("/yetime", function(req, res) {
  let data = [
    { drcode : "01929", ddate: "3월 1일(월)", ampm:"오전", yetime: "10:10"},
    { drcode : "01929", ddate: "3월 2일(화)", ampm:"오전", yetime: "10:10, 10:20 ..."},
    { drcode : "01929", ddate: "3월 3일(수)", ampm:"오후", yetime: "10:10, 10:20 ..."},
    { drcode : "01929", ddate: "3월 4일(목)", ampm:"오전", yetime: "10:10"},
    { drcode : "01929", ddate: "3월 5일(금)", ampm:"오후", yetime: "10:10"},
    { drcode : "01929", ddate: "3월 6일(토)", ampm:"오전", yetime: "10:10, 10:20 ..."},
    { drcode : "01929", ddate: "3월 7일(월)", ampm:"오후", yetime: "10:10, 10:20 ..."},
    { drcode : "01929", ddate: "3월 8일(화)", ampm:"오전", yetime: "10:10"},
    { drcode : "01929", ddate: "3월 9일(수)", ampm:"오후", yetime: "10:10, 10:20 ..."},
    { drcode : "01929", ddate: "3월10일(목)", ampm:"오전", yetime: "10:10, 10:20 ..."},
    { drcode : "01929", ddate: "3월11일(금)", ampm:"오후", yetime: "10:10, 10:20 ..."},
    { drcode : "01929", ddate: "3월12일(토)", ampm:"오후", yetime: "10:10, 10:20 ..."},
    { drcode : "01929", ddate: "3월13일(월)", ampm:"오전", yetime: "10:10"},
    { drcode : "01929", ddate: "3월14일(화)", ampm:"오후", yetime: "10:10, 10:20, ..."},
    { drcode : "01929", ddate: "3월15일(수)", ampm:"오전", yetime: "10:10, 10:20 ..."},
    { drcode : "01929", ddate: "3월16일(목)", ampm:"오후", yetime: "10:10"},
    { drcode : "01929", ddate: "3월17일(금)", ampm:"오전", yetime: "10:10, 10:20 ..."},
    { drcode : "01929", ddate: "3월18일(토)", ampm:"오후", yetime: "10:10, 10:20 ..."},
    { drcode : "01929", ddate: "3월19일(월)", ampm:"오전", yetime: "10:10, 10:20 ..."},
    { drcode : "01929", ddate: "3월20일(화)", ampm:"오후", yetime: "10:10"},
    { drcode : "01929", ddate: "3월21일(수)", ampm:"오전", yetime: "10:10, 10:20 ..."},
    { drcode : "01929", ddate: "3월22일(목)", ampm:"오후", yetime: "10:10, 10:20 ..."},
    { drcode : "01929", ddate: "3월23일(금)", ampm:"오전", yetime: "10:10"},
    { drcode : "01929", ddate: "3월24일(토)", ampm:"오후", yetime: "10:10"},
    { drcode : "01929", ddate: "3월25일(월)", ampm:"오후", yetime: "10:10, 10:20 ..."},
    { drcode : "01929", ddate: "3월26일(화)", ampm:"오후", yetime: "10:10, 10:20 ..."},
    { drcode : "01929", ddate: "3월27일(수)", ampm:"오전", yetime: "10:10"},

  ];
  //console.log("data type ", typeof data);
  res.json(data);
});
module.exports = router;
