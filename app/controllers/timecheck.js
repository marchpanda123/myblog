var mongoose = require('mongoose');
var TimeCheck = mongoose.model('TimeCheck');

module.exports.timecheckGet = function(req, res) {
	var reqId = req.decoded._doc._id;
	TimeCheck.find({postedBy:reqId},function(err, timechecks){
		if(err) res.send(err);
		res.json(timechecks);
	}).populate('postedBy');

}

module.exports.timecheckPost = function(req, res) {
	
	var timechecks = new TimeCheck();

	req.body.postedBy = req.decoded._doc._id;

	timechecks.time = req.body.time;
	timechecks.postedBy = req.body.postedBy;

	timechecks.save(function(err) {
			if(err) res.send(err);
			res.json(timechecks);
	console.log(timechecks);
		});
}

module.exports.timecheckGetId = function(req, res) {
	TimeCheck.findById(req.params.timecheckId, function(err,timecheck) {
		if(err) res.send(err);
		res.json(timecheck);
	})
}

module.exports.timecheckPutId = function(req, res) {
	TimeCheck.findById(req.params.timecheckId, function(err, timecheck) {
		if(err) res.send(err);
		timecheck.time = req.body.time;
		timecheck.save(function(err) {
			if(err) res.send(err);
			res.json(timecheck);
		})
	})
}



module.exports.timecheckDeleteId = function(req, res) {
	TimeCheck.remove({
		_id: req.params.timecheckId
	}, function(err, timecheck) {
		if(err) res.send(err);
		res.json({ message:'Successfully delete'});
	});
}