var mongoose = require('mongoose');
var Carousel = mongoose.model('Carousel');

module.exports.carouselGet = function(req, res) {
	Carousel.find(function(err, carousels){
		if(err) res.send(err);
		res.json(carousels);
	});

}

module.exports.carouselPost = function(req, res) {
	
	var carousels = new Carousel();

	req.body.postedBy = req.decoded._doc._id;

	carousels.carouselImage = req.body.carouselImage;

	carousels.save(function(err) {
			if(err) res.send(err);
			res.json(carousels);
	console.log(carousels);
		});
}

module.exports.carouselGetId = function(req, res) {
	Carousel.findById(req.params.carouselId, function(err,carousel) {
		if(err) res.send(err);
		res.json(carousel);
	})
}

module.exports.carouselPutId = function(req, res) {
	Carousel.findById(req.params.carouselId, function(err, carousel) {
		if(err) res.send(err);
		carousel.time = req.body.time;
		carousel.save(function(err) {
			if(err) res.send(err);
			res.json(carousel);
		})
	})
}

module.exports.carouselDeleteId = function(req, res) {
	Carousel.remove({
		_id: req.params.carouselId
	}, function(err, carousel) {
		if(err) res.send(err);
		res.json({ message:'Successfully delete'});
	});
}