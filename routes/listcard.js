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
            title: "카카오 i 디벨로퍼스를 소개합니다",
            imageUrl: "http://k.kakaocdn.net/dn/xsBdT/btqqIzbK4Hc/F39JI8XNVDMP9jPvoVdxl1/2x1.jpg"
          },
          items: [
            {
              title: "Kakao i Developers",
              description: "새로운 AI의 내일과 일상의 변화",
              imageUrl: "http://k.kakaocdn.net/dn/APR96/btqqH7zLanY/kD5mIPX7TdD2NAxgP29cC0/1x1.jpg",
              link: {
              web: "https://namu.wiki/w/%EB%9D%BC%EC%9D%B4%EC%96%B8(%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%94%84%EB%A0%8C%EC%A6%88)"
              }
            }
          ],
          buttons: [
            {
              label: "구경가기",
              action: "webLink",
              webLinkUrl: "https://namu.wiki/w/%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%94%84%EB%A0%8C%EC%A6%88"
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
