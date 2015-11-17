var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MessageSchema   = new Schema({
  to: { type: Schema.Types.ObjectId, ref: 'User' },
  from: { type: Schema.Types.ObjectId, ref: 'User' },
  body: String,
  iv: String,
  tag: String,
  encapsulation: String
});

module.exports = mongoose.model('Message', MessageSchema);
