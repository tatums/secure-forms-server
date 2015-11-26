var express = require('express');
var router  = express.Router();
var bodyParser = require('body-parser')
var morgan  = require('morgan');
var app     = express();
var port    = process.env.PORT || 8080;

var mongoose   = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/secureForms');

app.use(morgan('dev'));

// Models
var Form   = require('./models/form');
var User   = require('./models/user');
var Message   = require('./models/message');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Message Routes

router.post('/messages', function(req, res) {
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

router.get('/messages', function(req, res) {
  Message.find(function(err, messages) {
    if (err)
      res.send(err);
    res.json(messages);
  });
});

// User Routes

router.get('/users/:id/messages', function(req, res) {
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

router.get('/users/:id', function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
});

router.get('/users', function(req, res) {
  User.find(function(err, users) {
    if (err)
      res.send(err);
    res.json(users);
  });
});

router.delete('/users/:id', function (req, res) {
  User.remove({
    _id: req.params.id
  }, function(err, user) {
    if (err)
      res.send(err);
    res.json({ message: 'Successfully deleted' });
  });
});

router.put('/users/:id', function(req, res) {
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

router.post('/users', function(req, res) {
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


// Form Routes
router.get('/forms', function(req, res) {
  Form.find(function(err, forms) {
    if (err)
      res.send(err);
    res.json(forms);
  });
});

router.post('/forms', function(req, res) {

  var form = new Form();
  form.title = req.body.title;

  // save the form and check for errors
  form.save(function(err) {
    if (err)
      res.send(err);
    res.json({ message: 'Form created!' });
  });

});


app.use('/api', router);

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
