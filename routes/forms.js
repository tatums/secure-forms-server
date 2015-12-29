var express = require('express');
var router = express.Router();

var Form   = require('./../models/form');

router.get('/', function(req, res) {
  Form.find(function(err, forms) {
    if (err)
      res.send(err);
    res.json(forms);
  });
});


router.get('/:id', function(req, res) {
  Form.findById(req.params.id, function(err, form) {
    if (err)
      res.send(err);
    res.json(form);
  });
});


router.post('/', function(req, res) {
  var form = new Form();
  form.title = req.body.title;
  form.body = req.body.body;
  form.owner = req.body.owner

  // save the form and check for errors
  form.save(function(err) {
    if (err)
      res.send(err);
      res.json(form);
  });
});

module.exports = router;

