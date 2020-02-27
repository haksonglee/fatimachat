const express = require("express");
const router = express.Router();
//const request = require("request");

const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;

var dept;
dept = 'GS'
var drlist = function () {  //console.log("nodecraw start");

  const getHtml = async () => {
    try {
      return await axios.get("https://www.fatimahosp.co.kr/pages/department", {
        params: {
          deptdoctor: dept
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  //https://www.fatimahosp.co.kr/pages/department?deptdoctor=MA
  var str;
  var ulList = [];

  getHtml().then(html => {
    //let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("div.doctor_list ul").children("li.col-md-6");

    $bodyList.each(function(i, elem) {
      ulList[i] = {
        name: $(this)
          .find("span.name")
          .text(),
        image_url: $(this)
          .find("div.card-content-img img")
          .attr("src"),
        special: $(this)
          .find("div.card-content-textarea dl dd")
          .text(),
        drcode: $(this)
          .find("footer.schedule_calendar")
          .attr("data-drcode")
      };
    });

    const data = ulList.filter(n => n.name);
    return data;
  }).then(res => log(res));
};

drlist();
