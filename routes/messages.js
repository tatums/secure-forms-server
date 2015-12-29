var express = require('express');
var router = express.Router();

var Message   = require('./../models/message');

router.post('/', function(req, res) {
  var message = new Message();
  message.to = req.body.to;
  message.from = req.body.from;
  message.body = req.body.body;
  message.iv = req.body.iv;
  message.tag = req.body.tag;
  message.encapsulation = req.body.encapsulation;

  // save the form and check for errors
  message.save(function(err) {
    console.log('errr', err)
    if (err)
      res.send(err);
    res.json(message);
  });
});

router.get('/', function(req, res) {
  Message.find(function(err, messages) {
    if (err)
      res.send(err);
    res.json(messages);
  });
});


module.exports = router;
