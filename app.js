require('dotenv').config({silent: true})

var express = require('express');
var router  = express.Router();
var bodyParser = require('body-parser')
var morgan  = require('morgan');
var app     = express();
var port    = process.env.PORT || 8080;
var cors = require('cors');
var sendgrid  = require('sendgrid')(process.env.SENDGRID_API_KEY);
app.use(cors());

var mongoose   = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI);

app.use(morgan('dev'));

// Models
var Form   = require('./models/form');
var User   = require('./models/user');
var Message   = require('./models/message');


var payload   = {
  to      : 'tatum@ashlandstudios.com',
  from    : 'from@other.com',
  subject : 'Saying Hi',
  text    : 'This is my first email through SendGrid'
}

//sendgrid.send(payload, function(err, json) {
//  if (err) { console.error(err); }
//  console.log(json);
//});



// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.send('Secure Forms');
});

var messages = require('./routes/messages');
app.use('/api/messages', messages);

var users = require('./routes/users');
app.use('/api/users', users);

var forms = require('./routes/forms');
app.use('/api/forms', forms);

app.use('/api', router);

var server = app.listen(port, function () {
  //var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening on port %s', port);
});
