var mongoose = require('mongoose');
var Article = mongoose.model('Article');

module.exports.commentsGet = function(req, res) {
	Article.findById(req.params.articleId)
	        .populate('comments.postedBy')
	        .exec(function (err, article) {
	        if (err) return next(err);
	        res.json(article.comments);
            console.log(article);
	    });
		
}

module.exports.commentsPost = function(req, res) {
	Article.findById(req.params.articleId, function (err, article) {
        if (err) return next(err);
        req.body.postedBy = req.decoded._doc._id;
        console.log(req.decoded._doc);
        article.comments.push(req.body);
        article.save(function (err, article) {
            if (err) return next(err);
            console.log('Updated Comments!');
            res.json(article);
        });
    });
}

module.exports.commentsDelete = function(req, res) {
	Article.findById(req.params.articleId, function (err, article) {
        if (err) return next(err);
        for (var i = (article.comments.length - 1); i >= 0; i--) {
            article.comments.id(article.comments[i]._id).remove();
        }
        article.save(function (err, result) {
            if (err) return next(err);
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Deleted all comments!');
        });
    });
}

module.exports.commentsGetId = function(req, res) {
	Article.findById(req.params.articleId)
        .populate('comments.postedBy')
        .exec(function (err, article) {
        if (err) return next(err);
        res.json(article.comments.id(req.params.commentId));
    });
}

module.exports.commentsPutId = function(req, res) {
	Article.findById(req.params.articleId, function (err, article) {
        if (err) return next(err);
        article.comments.id(req.params.commentId).remove();
                req.body.postedBy = req.decoded._id;
        article.comments.push(req.body);
        article.save(function (err, article) {
            if (err) return next(err);
            console.log('Updated Comments!');
            res.json(article);
        });
    });
}

module.exports.commentsDeleteId = function(req, res) {
	Article.findById(req.params.articleId, function (err, article) {
        if (article.comments.id(req.params.commentId).postedBy
           != req.decoded._id) {
            var err = new Error('You are not authorized to perform this operation!');
            err.status = 403;
            return next(err);
        }
        article.comments.id(req.params.commentId).remove();
        article.save(function (err, resp) {
            if (err) return next(err);
            res.json(resp);
        });
    });
}