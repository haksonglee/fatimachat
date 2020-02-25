const express = require("express");
const router = express.Router();
//const request = require("request");

const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;
var fs=require('fs')

//var dept;
//dept = 'PD'
function getDrlist(dept) {  //console.log("nodecraw start");

  //console.log("1")
  var dataArr=[];
  var dataPath = __dirname + '/drlist.json'
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

  getHtml().then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("div.doctor_list ul").children("li.col-md-6");

    $bodyList.each(function(i, elem) {
      var datai = {
        web: "https://www.fatimahosp.co.kr/pages/department?drcode=" +
                $(this)
                .find("footer.schedule_calendar")
                .attr("data-drcode")
      };

      var data = {
        dept: dept,
        title: $(this)
          .find("span.name")
          .text(),
        description: $(this)
          .find("div.card-content-textarea dl dd")
          .text(),
        imageUrl: $(this)
          .find("div.card-content-img img")
          .attr("src"),
        link: datai,
      };

      var drcode = $(this)
              .find("footer.schedule_calendar")
              .attr("data-drcode")

      dataArr.push(data);
    });

    //console.log(JSON.stringify(dataArr))

    fs.appendFileSync(dataPath, JSON.stringify(dataArr), function(error, data){
      if (error) {throw error};
    })
    //const data = ulList.filter(n => n.name);
    //return data;
  });// .then(res => console.log(res));
  //return ulList;
  //console.log(ulList)
  //return 'testreturn'
};

module.exports = getDrlist ;
