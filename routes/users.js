var express = require('express');
var router = express.Router();


// Models
var User   = require('./../models/user');
var Form   = require('./../models/form');
var Message = require('./../models/message');

// Routes
router.get('/:id/messages', function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err)
      res.send(err);

    Message.find({to: user._id},function(err, messages) {
      if (err)
        res.send(err);
      res.json(messages);
    });

  });
});


router.get('/:id/forms', function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err)
      res.send(err);

    Form.find({owner: user._id},function (err, forms) {
      if (err)
        res.send(err);
      res.json(forms);
    });

  });
});


router.get('/:id', function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
});

router.get('/', function(req, res) {
  User.find(function(err, users) {
    if (err)
      res.send(err);
    res.json(users);
  });
});

router.delete('/:id', function (req, res) {
  User.remove({
    _id: req.params.id
  }, function(err, user) {
    if (err)
      res.send(err);
    res.json({ message: 'Successfully deleted' });
  });
});

router.put('/:id', function(req, res) {
  User.findById(req.params.id, function(err, user) {
   if (err)
      res.send(err);
    user.publicKey = req.body.publicKey;
    user.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'user updated!' });
    });
  });
});

router.post('/', function(req, res) {
  var user = new User();
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.publicKey = req.body.publicKey;
  // save the user and check for errors
  user.save(function(err) {
    if (err)
      res.send(err);
    res.json(user);
  });

});


module.exports = router;

