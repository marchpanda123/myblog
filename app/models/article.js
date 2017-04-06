var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	rating: {
		type:Number,
		min: 1,
		max: 10,
	},
	comment: {
		type: String,
		required: true
	},
	postedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref:'User'
	}
});

var ArticleSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String,
		default: '',
		trim: true,
		require: 'Title cannot be blank'
	},
	content: {
		type: String,
		default: '',
		trim: true
	},
	introduction: {
		type:String,
		default: '',
		trim: true
	},
	pageImage: {
		type:String,
		default: '',
		trim: true
	},// connect user
	postedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	comments: [commentSchema]
});

module.exports = mongoose.model('Article', ArticleSchema);