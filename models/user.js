
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    firstName: String,
    lastName: String,
    publicKey: String
});

module.exports = mongoose.model('User', UserSchema);
