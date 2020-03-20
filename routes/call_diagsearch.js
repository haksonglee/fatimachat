//const dataPath = __dirname + '/crawling/drlist.json'
//var fs = require('fs')

exports.call_diagsearch = function(diagname) {
  const data = require('./crawling/drlist.json')

    let quickbody = "[";
  let tempbody;
  let filterbody = data.filter(item => {
    return (item.description.indexOf(diagname) >= 0)
  })

  let shortdeptname;
  let dept;
  let drlink_web;
  //console.log("filterbody.length", filterbody.length)
  for (let i = 0; i < filterbody.length; i++) {
    shortdeptname = filterbody[i].deptname
    dept = filterbody[i].dept
    //drlink_web = filterbody[i].link.web

    shortdeptname = shortdeptname.substring(1, shortdeptname.length - 1)
    tempbody = `{ "label": "${filterbody[i].title}",
      "action": "message",
      "messageText": "${shortdeptname} ${filterbody[i].title} 예약"
    }`
    //console.log("tempbody", typeof tempbody)
    if (i === filterbody.length - 1) {
      quickbody += tempbody
    } else {
      quickbody += tempbody + ','
    }
    //console.log("quickbody", quickbody)
  }

  quickbody = JSON.parse(quickbody + "]")

  let buttonstr1;
  buttonstr1 = `{
      "label": "다른 진료과 선택",
      "action": "message",
      "messageText": "진료예약" }`

  //console.log(buttonstr1)
  buttonstr1 = JSON.parse(buttonstr1)

  //console.log('deptname = ' + deptname)
  switch (shortdeptname) {
    case '피부과':
    case '안과':
    case '비뇨의학과':
    case '정신건강의학과':
    case '재활의학과':
    case '치과':
      buttonstr2 = {
        label: "컨택센터 전화예약",
        action: "phone",
        phoneNumber: "055-270-1000"
      }
      //texthelp = "해당 진료과는 전화예약만 가능합니다. 컨텍센터로 연락부탁드립니다."
      texthelp = "진료를 원하시는 의료진을 선택해주세요."
      break;

    default:
      buttonstr2 = {
        label: "모바일예약 이동",
        action: "webLink",
        webLinkUrl: "https://www.fatimahosp.co.kr/pages/department?deptdoctor=" + dept
      }
      texthelp = "진료를 원하시는 의료진을 선택해주세요."
  }

  const responseBody = {
    version: "2.0",
    template: {
      outputs: [{
          simpleText: {
            text: texthelp
          }
        },
        {
          listCard: {
            header: {
              title: "창원파티마병원 의료진",
              imageUrl: "https://www.fatimahosp.co.kr/assets/images/sub/sub_visual5.jpg"
            },
            items: filterbody,
            buttons: [
              buttonstr1,
              buttonstr2
            ]
          }
        }
      ],
      quickReplies: quickbody
    }
  }

  return responseBody
}
