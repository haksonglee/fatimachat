const request = require("request");

exports.request_ocsuser = function request_ocsuser(input_name, input_birth) {
  return new Promise(function(resolve, reject) {
    request({
      uri: "http://localhost:3000/index",
      json: true
    }, function(
      err,
      res,
      body
    ) {
      if (err) {
        reject(err);
      }
      let patient_result = body.length;
      let patient_data = body.filter(function(item) {
        //console.log('chk1 ' , input_name, input_birth, item.name, item.birth)
        return item.name === input_name && item.birth === input_birth
      })
      //console.log("pass 00000000000000", patient_result, patient_data);
      resolve(patient_data);
    });
  });
}
