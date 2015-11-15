var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var FormSchema   = new Schema({
    title: String
});

module.exports = mongoose.model('Form', FormSchema);
