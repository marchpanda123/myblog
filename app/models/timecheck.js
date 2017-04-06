var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TimeCheckSchema = new Schema({
	created:{
		type:Date,
		default:Date.now
	},
	time:{
		type: Number
	},
	postedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
});

module.exports = mongoose.model('TimeCheck', TimeCheckSchema);