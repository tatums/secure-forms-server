var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var FormSchema   = new Schema({
    title: String,
    body: String,
    owner: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Form', FormSchema);
