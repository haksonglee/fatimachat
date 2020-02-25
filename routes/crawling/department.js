const express = require("express");
const router = express.Router();
//const request = require("request");

const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;

var dept;

dept = "OS";

//console.log("nodecraw start");

const getHtml = async () => {
  try {
    return await axios.get("https://www.fatimahosp.co.kr/pages/department");
  } catch (error) {
    console.error(error);
  }
};

//https://www.fatimahosp.co.kr/pages/department?deptdoctor=MA
var ulList1 = [];

getHtml()
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("div.medical_list ul").children("li.col-md-2");
    var str;

    $bodyList.each(function(i, elem) {
      var str = $(this)
        .find("div.mask a")
        .attr("onclick");

      str = str.substr(17, str.length - 18);

      ulList[i] = {
        name: $(this)
          .find("h3.field-title")
          .text(),
        depturl: str
      };

      ulList1[i] = new Array();
      ulList1[i][0] = ulList[i].name;
      ulList1[i][1] = ulList[i].depturl;
    });

    const data = ulList.filter(n => n.name);
    return data;
  })
  .then(res => {
    //log(res);
    //objectJSON = JSON.stringify(ulList1);
    for (var i = 1; i < ulList1.length; i++) {
      //console.log(ulList1[i][0]);
      if (ulList1[i][0] == "외과") {
        console.log(ulList1[i][1]);
      }
    }
  });
