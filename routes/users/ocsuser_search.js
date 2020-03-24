const request = require("request");

exports.request_ocsuser = function request_ocsuser(input_name, input_birth) {
  return new Promise(function(resolve, reject) {
    request({
      //uri: "http://fatimachat.herokuapp.com/index",
      uri: "http://localhost:3000/index/ocsuser",
      json: true
    }, function(err,res,body) {
      if (err) {
        reject(err);
      }
      try{
        let patient_result = body.length;
      }catch(err){
        console.log("ocsuser_search error ", err)
      }
      let patient_data = body.filter(function(item) {
        //console.log('chk1 ' , input_name, input_birth, item.name, item.birth)
        return item.name === input_name && item.birth === input_birth
      })
      //console.log("pass 00000000000000", patient_result, patient_data);
      resolve(patient_data);
    });
  });
}

exports.request_yetime = function request_yetime(input_drcode) {
  return new Promise(function(resolve, reject) {
    request({
      uri: "http://localhost:3000/index/yetime",
      json: true
    }, function(err,res,body) {
      if (err) {
        reject(err);
      }
      try{
        let patient_result = body.length;
      }catch(err){
        console.log("yetime error ", err)
      }
      let yetime_data = body.filter(function(item) {
        //console.log('chk1 ' , input_name, input_birth, item.name, item.birth)
        return item.drcode === input_drcode
      })
      //console.log("pass 00000000000000", patient_result, patient_data);
      resolve(yetime_data);
    });
  });
}
