var express = require('express')
var router = express.Router();

var chatUser = require("./users/dbuser_schema")

//insert router
router.post('/', function(req, res, next) {
  var postModel = new chatUser();
  postModel.id = '1'
  postModel.name = '1'
  postModel.birth = '2020-01-01'
  postModel.hospno = '1'
  postModel
    .save()
    .then(cuser => {
      console.log("create ccomplete");
      res.status(200).json({
        message: "create success",
        data : {
          post : cuser
        }
      })
    })
    .catch(err => {
      res.status(500).json({
        message: err
      })
    })
  });

//read router
router.get('/', function(req, res, next) {

  chatUser
    .find()
    .then(cuser => {
      res.status(200).json({
        message: "read success",
        data : {
          post : cuser
        }
      })
    })
    .catch(err => {
      res.status(500).json({
        message: err
      })
    })
  });

//update router
router.put('/:id', async function(req, res, next) {

  const user_id = req.params.id;
  const {id, name, birth, hospno} = req.body;
  console.log("user_id = " + user_id)

  try {
    var user = await chatUser.findOne({id:user_id});
    console.log(user)
    if (!user) return res.status(404).json({ message : "user not found"})
    //user.id = id;
    user.name = 'updateuser';
    user.birth = user.birth;
    user.hospno = user.hospno;
    var output = await user.save();
    console.log("update complete");
    res.status(200).json({
      message:"update success",
      data :{
        user : output
      }
    });
  } catch (err) {
    res.status(500).json({
      message : err
    })
  }
})

//read router
router.get('/insert', function(req, res, next) {

  var call_func = require('./dbuser_insert')
  call_func.call_insert();
  res.send("")
});


router.get('/search', function(req, res, next) {

  var chatUser = require("./dbuser_schema")
  //var call_func = require('../callfunc/search')
  //var search_user = call_func.call_search();
  //console.log("return value = " + search_user[0])
  //res.status(200).json(search_user[0])
  var input_id = 3;
  chatUser.find({id : input_id}, function (err, users) {
    if (err) {return handleError(err);}
  //console.log(users)
    console.log("users.length = " + users.length)
    if (users.length == 0){
    //insert
      var postModel = new chatUser();
          postModel.id = input_id,
          postModel.name = '1'
          postModel.birth = '2020-01-01'
          postModel.hospno = '1'
          postModel.save()
      } else {
        for (var i=0;i< users.length;i++) {
          console.log(users[i].name + users[i].id + users[i].birth + users[i].hospno)
          //var name = users[i].name
          //databody.push({name});
        }
      }
  })
});

module.exports = router;
