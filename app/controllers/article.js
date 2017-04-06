var mongoose = require('mongoose');
var Article = mongoose.model('Article');

module.exports.articlesGet = function(req, res) {

	var reqId = req.decoded._doc._id;
	//recive the data from user
	Article.find({postedBy:reqId}).populate('postedBy').sort('-created')
	.exec(function(err, articles) {
			if(err) res.send(err);
			res.json(articles);
		});
}


module.exports.articlesPost = function(req, res) {

	var article = new Article();

		req.body.postedBy = req.decoded._doc._id; // post with user

		article.title = req.body.title;
		article.pageImage = req.body.pageImage;
		article.content = req.body.content;
		article.introduction = req.body.introduction;
		article.postedBy = req.body.postedBy;
		article.save(function(err) {
			if(err) res.send(err);
			res.json(article);
		});
}

module.exports.articlesGetId = function(req, res) {
	Article.findById(req.params.articleId,function(err,article) {
			if(err) res.send(err);
			res.json(article);
		}).populate('postedBy').populate('comments.postedBy');
}

module.exports.articlesPutId = function(req, res) {
	Article.findById(req.params.articleId,function(err,article) {
			if(err) res.send(err);
			article.title = req.body.title;
			article.pageImage = req.body.pageImage;
			article.content = req.body.content;
			article.introduction = req.body.introduction;
			article.save(function(err){
				if(err) res.send(err);
				res.json(article);
			});
		});
}

module.exports.articlesDeleteId = function(req, res) {
	Article.remove({
			_id: req.params.articleId
		}, function(err, article) {
			if(err) res.send(err);
			res.json({ message: 'Successfully deleted' });
		});
}

//access all the articleUser
module.exports.articlesUserGet = function(req, res) {
	Article.find().populate('postedBy').populate('comments.postedBy').sort('-created')
	.exec(function(err, articles) {
			if(err) res.send(err);
			res.json(articles);
		});
}

module.exports.articlesUserIdGet = function(req, res) {
	Article.findById(req.params.articleUserId,function(err,article) {
			if(err) res.send(err);
			res.json(article);
		}).populate('postedBy').populate('comments.postedBy');
}