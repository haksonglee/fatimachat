
//크롤링
//const getDrlist = require('./crawling/drlist.js')
//getDrlist('NS');
//console.log("2222222222222222222222 ")
const dataPath='./test1.json'
var fs=require('fs')

var string= fs.readFileSync(dataPath, 'utf-8');
//console.log(string)
var data=JSON.parse(string)

var drlist_script = require('./routes/call_drlist');
var drlist_bodydata1 = drlist_script.call_drlist('외과', undefined, 'dept')

//console.log(drlist_bodydata1)
//var data = JSON.parse(drlist_bodydata1)

var itemlength = drlist_bodydata1.template.outputs[0].listCard.items.length

for (var i=0;i<itemlength;i++){
  drlist_bodydata1.template.outputs[0].listCard.items[i].link.web =
  drlist_bodydata1.template.outputs[0].listCard.items[i].link.web + '&patient_name='+'이학송' +
  '&patient_hospno='+'000602887'
  console.log(drlist_bodydata1.template.outputs[0].listCard.items[i].link.web)
  //var name = item.title;
//  var image_url = item.imageUrl;
  //var special = item.description;
  //var drcode = item.link;
  //console.log(name+image_url+special+drcode)
};
