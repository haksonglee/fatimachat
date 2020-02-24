// quickreplies.js

const router = require('express').Router();

router.post('/listcard', function(req, res) {
  const responseBody = {
  version: "2.0",
  template: {
    outputs: [
      {
        listCard: {
          header: {
            title: "창원파티마병원 소화기내과",
            description: "창원파티마병원 소화기내과 의료진소개입니다",
            //imageUrl: "http://k.kakaocdn.net/dn/xsBdT/btqqIzbK4Hc/F39JI8XNVDMP9jPvoVdxl1/2x1.jpg",
            link: {
              web: "https://www.fatimahosp.co.kr/pages/department?deptdoctor=MA"
            }
          },
          items: [
            {
              title: "박종호",
              description: "위, 식도, 대장, 간, 췌담도",
              imageUrl: "http://www.fatimahosp.co.kr/uploads/clinicimg/20100824070913_2.jpg",
              link: {
              web: "https://www.fatimahosp.co.kr/pages/department?drcode=02127"
              }
            },
            {
              title: "이주용",
              description: "상하부위장관, 간질환, 췌담도",
              imageUrl: "https://www.fatimahosp.co.kr/uploads/clinicimg/20100824071828_5.jpg",
              link: {
              web: "https://www.fatimahosp.co.kr/pages/department?drcode=02727"
              }
            },
            {
              title: "신재욱",
              description: "위, 대장, 췌담도",
              imageUrl: "https://www.fatimahosp.co.kr/uploads/clinicimg/20120302090906_8.jpg",
              link: {
              web: "https://www.fatimahosp.co.kr/pages/department?drcode=03127"
              }
            },
            {
              title: "진수신",
              description: "위, 식도, 대장, 간, 췌담도",
              imageUrl: "https://www.fatimahosp.co.kr/uploads/clinicimg/20150309054345_소화기내과 진수진과장.jpg",
              link: {
              web: "https://www.fatimahosp.co.kr/pages/department?drcode=03420"
              }
            },
            {
              title: "김완철",
              description: "위, 식도, 대장, 간, 췌담도",
              imageUrl: "https://www.fatimahosp.co.kr/uploads/clinicimg/04201_f473b54943f0d08928de267f7f6c2c3c.png",
              link: {
              web: "https://www.fatimahosp.co.kr/pages/department?drcode=04201"
              }
            },

          ],
          buttons: [
            {
              label: "모바일 홈페이지",
              action: "webLink",
              webLinkUrl: "https://www.fatimahosp.co.kr/pages/department?deptdoctor=MA"
            }
          ]
        }
      }
    ]
  }
}
  res.status(200).send(responseBody);
});

module.exports = router;
