var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CarouselSchema = new Schema({
	created:{
		type:Date,
		default:Date.now
	},
	carouselImage:{
		type: String
	}
});

module.exports = mongoose.model('Carousel', CarouselSchema);