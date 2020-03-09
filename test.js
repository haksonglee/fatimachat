const router = require('express').Router();

router.get('/', function(req, res) {

    var responseBody;
    responseBody = {name:"test router"}
    res.status(200).send(responseBody );
}); // router

module.exports = router;
