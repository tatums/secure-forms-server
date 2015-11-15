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


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// User Routes

router.get('/users', function(req, res) {
  User.find(function(err, users) {
    if (err)
      res.send(err);
    res.json(users);
  });
});

router.post('/users', function(req, res) {

  var user = new User();
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;

  // save the user and check for errors
  user.save(function(err) {
    if (err)
      res.send(err);
    res.json({ message: 'User created!' });
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
