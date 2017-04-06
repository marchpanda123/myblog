var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.userPutId = function(req, res) {
	User.findById(req.params.userId,function(err,user) {
			if(err) res.send(err);
			user.age = req.body.age;
			user.gender = req.body.gender;
			user.save(function(err){
				if(err) res.send(err);
				res.json(user);
			});
		});
}

module.exports.userDeleteId = function(req, res) {
	User.remove({
			_id: req.params.userId
		}, function(err, article) {
			if(err) res.send(err);
			res.json({ message: 'Successfully deleted' });
		});
}