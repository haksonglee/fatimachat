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
            }
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
