exports.call_insert = function() {

  var chatUser = require("./dbuser_schema")
  var postModel = new chatUser();
      postModel.id = '4'
      postModel.name = '1'
      postModel.birth = '2020-01-01'
      postModel.hospno = '1'
      postModel
        .save()
        .then(cuser => {
          //console.log(cuser)
        })
        .catch(err => {
          console.log(err)
        })
}
