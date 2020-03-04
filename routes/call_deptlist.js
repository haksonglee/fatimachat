const dataPath = __dirname + '/crawling/reservation_deptlist.json'
var fs = require('fs')

exports.call_deptlist = function() {

  var string = fs.readFileSync(dataPath, 'utf-8');
  var data = JSON.parse(string)
  var body = [];
  let responseBody;

  for (var i = 0; i < data.length; i++) {
    var item = data[i];
    //item.imageUrl = 'https://www.fatimahosp.co.kr' + item.imageUrl
    body.push(item)
  };

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
