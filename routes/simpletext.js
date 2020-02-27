// simpletext.js

const router = require('express').Router();

//localhost:3000/simpletext/test
router.post('/test', function(req, res) {
  //var name = req.body.action.name;
  //var name = req.body.contexts.params."의사명".value;
  //console.log(name)
  var name2 = req.body;
  console.log(JSON.stringify(name2))

  //var patient = req.body.contexts[0].params.환자정보.value;
  var params = req.body.action.params
  var patient = params['환자정보']
  console.log(patient)
  //var reqjson = JSON.stringify(req.body)


  //console.log(reqjson)
  /*
  const responseBody = {
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText: {
            text: "hello I'm Ryan"
          }
        }
      ]
    }
  }; */
  const responseBody = {
  "version": "2.0",
  "template": {
    "outputs": [
      {
        "basicCard": {
          "title": "보물상자",
          "description": "보물상자 안에는 뭐가 있을까",
          "thumbnail": {
            "imageUrl": "http://k.kakaocdn.net/dn/83BvP/bl20duRC1Q1/lj3JUcmrzC53YIjNDkqbWK/i_6piz1p.jpg"
          },
          "profile": {
            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4BJ9LU4Ikr_EvZLmijfcjzQKMRCJ2bO3A8SVKNuQ78zu2KOqM",
            "nickname": "보물상자"
          },
          "social": {
            "like": 1238,
            "comment": 8,
            "share": 780
          },
          "buttons": [
            {
              "action": "message",
              "label": "열어보기",
              "messageText": "짜잔! 우리가 찾던 보물입니다"
            },
            {
              "action":  "webLink",
              "label": "구경하기",
              "webLinkUrl": "https://e.kakao.com/t/hello-ryan"
            }
          ]
        }
      }
    ]
  },
  "context": {
    "values":[
      {
        "name":"deptname",
        "lifesPan":5,
        "params": {
          "진료과명": {"value":"심장내과"}
        }
      }
    ]
  }
};
  res.status(200).send(responseBody);
});

module.exports = router;
