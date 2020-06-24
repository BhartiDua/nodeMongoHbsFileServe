var mongoose = require('mongoose');
var data = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String
});
 
var smp = mongoose.model('smp', data);
 
module.exports = smp;