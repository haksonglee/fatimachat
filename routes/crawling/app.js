var express = require("express");
var app = express();
var router = express.Router();

var aRoute = require("./crawling/nodecraw");

app.use("/nodecraw", aRoute);

app.listen(3000, function() {
  console.log("connected");
});
