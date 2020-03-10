//drlist.json생성 플로어
exports.drlist = function() {

  const express = require("express");
  const router = express.Router();
  //const request = require("request");

  const axios = require("axios");
  const cheerio = require("cheerio");
  const log = console.log;
  var fs = require('fs')

  //var dept;
  //dept = 'PD'

  //const getDrlist = require(__dirname + '/drlist.js')

  const dataPath = __dirname + '/deptlist.json'
  const dataPath2 = __dirname + '/drlist.json'
  console.log('dataPath ' , dataPath)
  var dataArr = [];

  //console.log(dataPath)
  var fs = require('fs')

  async function getDrlist(dept) { //console.log("nodecraw start");

    //console.log(dept)
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
          deptname: $(this).find("span.department").text(),
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
        fs.writeFileSync(dataPath2, JSON.stringify(dataArr), function(error, data) {
          if (error) {
            throw error
          };
        });

      });


      //console.log(dataArr)
      //const data = ulList.filter(n => n.name);
      //return data;
    }); // .then(res => console.log(res));
    //return ulList;
    //console.log(str)
    //return 'testreturn'
    //return str;
  };

  var string = fs.readFileSync(dataPath, 'utf-8');
  //console.log(JSON.parse(string))
  var data = JSON.parse(string)
  var body = [];
  //console.log(data.length)
  for (var i = 0; i < data.length; i++) {
    var item = data[i];
    //body.push(item.deptcode)
    //if(item.deptcode == 'GS') {
    getDrlist(item.deptcode);
    //}
  };

  return {}
}

//console.log('end dataArr')
//console.log(body)
//fs.appendFileSync(dataPath, JSON.stringify(dataArr), function(error, data){
//if (error) {throw error};
//})

//module.exports = getDrlist ;
