//deptlist.json 생성 플로어

const express = require("express");
const router = express.Router();
//const request = require("request");

const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;
var fs = require('fs')

//console.log("nodecraw start");
var dataArr = [];
var dataPath = __dirname + '/reservation_deptlist.json'
const getHtml = async () => {
  try {
    return await axios.get("https://www.fatimahosp.co.kr/pages/department");
  } catch (error) {
    console.error(error);
  }
};

//https://www.fatimahosp.co.kr/pages/department?deptdoctor=MA
getHtml()
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    //console.log(html.data)
    const $bodyList = $("div.medical_list ul").children("li.col-md-2");
    var str;
    var deptcode;

    $bodyList.each(function(i, elem) {
      var data = {
        label: $(this)
          .find("h3.field-title")
          .text(),
        action: "message",
        messageText: $(this)
          .find("h3.field-title")
          .text() + ' 예약',

      };

      dataArr.push(data);
    });
    fs.writeFileSync(dataPath, JSON.stringify(dataArr), function(error, data) {
      if (error) {
        throw error
      };
      //const data = ulList.filter(n => n.name);
      //return data;
    });
    //.then(res => {
    //log(res);
    //objectJSON = JSON.stringify(ulList1);

  });
