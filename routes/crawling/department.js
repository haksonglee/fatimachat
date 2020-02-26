//deptlist.json 생성 플로어

const express = require("express");
const router = express.Router();
//const request = require("request");

const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;
var fs=require('fs')

//console.log("nodecraw start");
var dataArr=[];
var dataPath = __dirname + '/deptlist.json'
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
    const $bodyList = $("div.medical_list ul").children("li.col-md-2");
    var str;
    var deptcode;

    $bodyList.each(function(i, elem) {
      var str = $(this)
        .find("div.mask a")
        .attr("onclick");

      str = str.substr(17, str.length - 18);
      idx = str.indexOf('deptdoctor=')
      //console.log(idx, str.length)
      deptcode = str.substr(idx + 11, str.length - idx - 1)
      //console.log(deptcode)

      var datai = {
        //web: str
        web : "소화기내과"
      };

      var data = {
        deptcode: deptcode,
        title: $(this)
          .find("h3.field-title")
          .text(),
        imageUrl: $(this)
          .find("div.card-content-img img")
          .attr("src"),
        link: datai,
      };

      dataArr.push(data);
    });
    fs.writeFileSync(dataPath, JSON.stringify(dataArr), function(error, data){
      if (error) {throw error};
    //const data = ulList.filter(n => n.name);
    //return data;
  });
  //.then(res => {
    //log(res);
    //objectJSON = JSON.stringify(ulList1);

  });
