// simpletext.js

const router = require('express').Router();

//localhost:3000/simpletext/test
router.post('/test', function(req, res) {
  var name = req.body.action.name;
  //var name = req.body.contexts.params."의사명".value;
  //console.log(name)
  //var name2 = req.body.contexts;
  //console.log(JSON.stringify(name2))

  var patient = req.body.contexts[0].params.환자정보.value;
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
    version: "2.0",
    data: {
      patient: patient
    }
  };
  res.status(200).send(responseBody);
});

module.exports = router;
