
//크롤링
const getDrlist = require('./crawling/drlist.js')
getDrlist('NS');
//console.log("2222222222222222222222 ")
const dataPath='./crawling/drlist.json'
var fs=require('fs')

var string= fs.readFileSync(dataPath, 'utf-8');
var data=JSON.parse(string)
var body=""
//console.log(data.length)
for (var i=0;i<data.length;i++){
  var item = data[i];
    console.log(item)
  var name = item.title;
  var image_url = item.imageUrl;
  var special = item.description;
  var drcode = item.link;
  //console.log(name+image_url+special+drcode)
};
