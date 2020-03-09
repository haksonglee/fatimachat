exports.response_json = function(gubun) {

  let responseBody;

  switch (gubun) {
    case 'login_fail':
      responseBody = {
        "version": "2.0",
        "template": {
          "outputs": [{
            "basicCard": {
              "title": "죄송합니다. 사용자 정보를 찾을수 없습니다",
              "description": "병원 처음 방문하신 분은 컨택센터를 이용부탁드립니다.",
              "buttons": [{
                  "action": "message",
                  "label": "다시 로그인",
                  "messageText": "로그인"
                },
                {
                  "action": "phone",
                  "label": "컨택센터 전화예약",
                  "phoneNumber": "055-270-1000"
                }
              ]
            }
          }]
        }
      } // responseBody
      break;
    case 'login_ok':
      responseBody = {
        "version": "2.0",
        "template": {
          "outputs": [{
            "basicCard": {
              "title": "안녕하세요 " + "patient_name" + "(" + "patient_hospno" + ") 님",
              "description": "창원파티마병원 예약 시스템 로그인 완료",
              "buttons": [{
                  "action": "message",
                  "label": "진료예약 계속",
                  "messageText": "진료예약"
                },
                {
                  "action": "message",
                  "label": "로그아웃",
                  "messageText": "로그아웃"
                }
              ]
            }
          }]
        }
      }
      break;
    default:
    responseBody = {message : "not found"}
  }
  return responseBody
}
