exports.call_login = function(patient_name, patient_birth) {

  //var data = JSON.parse(string)
  var body = [];
  let responseBody;


    //로그인 상태 체크
    var patient_hospno;
    var patient_hospno2;

    // fatimahosp 접속 환자명 + 생년월일 로 환자정 보 getElementsByClassName()
    //if 존재하면 pass else "없다는 정보 - 전화접수 안내 message "
    if (patient_name != undefined && patient_birth != undefined) {
      patient_hospno = '000602887' //returj 값
    }


      if (patient_hospno == '000602887') {
        responseBody = {
          "version": "2.0",
          "template": {
            "outputs": [{
              "basicCard": {
                "title": "안녕하세요 " + patient_name + "(" + patient_hospno + ") 님",
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
          },
          "context": {
            "values": [{
              "name": "patient_info",
              "lifeSpan": 10,
              "params": {
                "patient_confirm": patient_hospno
              }
            }]
          }
        }
      } else {
        responseBody = {
          "version": "2.0",
          "template": {
            "outputs": [{
              "basicCard": {
                "title": "안녕하세요 " + patient_name + "님",
                "description": "환자정보를 찾을수 없습니다 \n 로그인 부탁드립니다",
                "buttons": [{
                  "action": "message",
                  "label": "로그인",
                  "messageText": "login"
                }]
              }
            }]
          }
        }
      };

      responseBody.patient_hospno = patient_hospno
      responseBody.patient_hospno2 = patient_hospno2

  return responseBody

}
