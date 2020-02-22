const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');

const apiRouter = express.Router();

app.use(logger('dev', {}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/api', apiRouter);

apiRouter.post('/sayHello', function(req, res) {
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
  };

  res.status(200).send(responseBody);
});

apiRouter.post('/rep1', function(req, res) {
  var params = req.body.action.params
  const responseBody = {
    version: "2.0",
    data: {
      menu: "bulgogi",
      date: "2월 22일",
      favorite: params['파라1']
    }
  };

  res.status(200).send(responseBody);
});

apiRouter.post('/quickReplies', function(req, res) {
  const responseBody = {
    version: "2.0",
    template: {
      quickReplies: [
        {
          type: "text",
          label: "처음으로",
          message: "처음으로",
          data: {}
        },
        {
          type: "block",
          label: "처음으로",
          message: "처음으로",
          data: {
            blockId: "5e4a22e6ffa7480001f96311",
            extra: {"": ""
            }
          }
        }
    ]
  }
};

  res.status(200).send(responseBody);
});

apiRouter.post('/showHello', function(req, res) {
  console.log(req.body);

  const responseBody = {
    version: "2.0",
    template: {
      outputs: [
        {
          simpleImage: {
            imageUrl: "https://t1.daumcdn.net/friends/prod/category/M001_friends_ryan2.jpg",
            altText: "hello I'm Ryan"
          }
        }
      ]
    }
  };

  res.status(200).send(responseBody);
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Example skill server listening on port 3000!');
});
