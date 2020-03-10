const dataPath = __dirname + '/crawling/reservation_deptlist.json'
var fs = require('fs')

exports.call_deptlist = function(intent, yeyakdate) {

  var string = fs.readFileSync(dataPath, 'utf-8');
  var data = JSON.parse(string)
  var body = [];
  let responseBody;

  console.log('intent ', intent)
  if (intent !== '내과분야' && intent !== '내과분야예약') {
    let interdept = {
      "label": "내과분야",
      "action": "message",
      "messageText": "내과분야 예약"
    }
    body.push(interdept)
  }

  for (var i = 0; i < data.length; i++) {
    var item = data[i];
    //item.imageUrl = 'https://www.fatimahosp.co.kr' + item.imageUrl
    if (yeyakdate != undefined) {
      item.messageText = item.messageText + ' ' + yeyakdate
    }
    if (intent === '내과분야' || intent === '내과분야예약') {
      switch (item.label) {
        case '소화기내과':
        case '호흡기내과':
        case '심장내과':
        case '내분비내과':
        case '혈액종양내과':
        case '신장내과':
        case '류마티스내과':
        case '감염내과':
        body.push(item)
          break;
        default:
      }
    } else {
      switch (item.label) {
        case '소화기내과':
        case '호흡기내과':
        case '심장내과':
        case '내분비내과':
        case '혈액종양내과':
        case '신장내과':
        case '류마티스내과':
        case '감염내과':
          break;
        default:
          body.push(item)
      }
    };
  }

  responseBody = {
    version: "2.0",
    template: {
      outputs: [{
        simpleText: {
          text: "진료과명을 선택해 주십시오"
        }
      }],
      quickReplies: body
    }
  };

  return responseBody
}
