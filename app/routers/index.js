var express = require('express');
var router = express.Router();
var Verify = require('./verify.js');
//image upload
var multer = require('multer');
var upload = multer({ dest: 'public/uploads/' });
//other way
/*var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();*/
//controllers
var articleCtrl = require('../controllers/article.js');
var timecheckCtrl = require('../controllers/timecheck.js')
var commentCtrl = require('../controllers/comment.js')
var carouselCtrl = require('../controllers/carousel.js')
//middleware
router.use(function(req, res, next) {
	console.log('something is happening.');
	next();
});

//articles routers
router.get('/articles', Verify.verifyOrdinaryUser, articleCtrl.articlesGet);
router.post('/articles', Verify.verifyOrdinaryUser, Verify.verifyAdmin, articleCtrl.articlesPost);
router.get('/articles/:articleId', Verify.verifyOrdinaryUser, articleCtrl.articlesGetId);
router.put('/articles/:articleId', Verify.verifyOrdinaryUser, Verify.verifyAdmin, articleCtrl.articlesPutId);
router.delete('/articles/:articleId', Verify.verifyOrdinaryUser, Verify.verifyAdmin, articleCtrl.articlesDeleteId);
//comments routers
router.get('/article/:articleId/comments', commentCtrl.commentsGet);
router.post('/article/:articleId/comments', Verify.verifyOrdinaryUser, commentCtrl.commentsPost);
router.delete('/article/:articleId/comments', Verify.verifyOrdinaryUser, Verify.verifyAdmin, commentCtrl.commentsDelete);
router.get('/article/:articleId/comments/:commentId', Verify.verifyOrdinaryUser, commentCtrl.commentsGetId);
router.put('/article/:articleId/comments/:commentId', Verify.verifyOrdinaryUser, commentCtrl.commentsPutId);
router.delete('/article/:articleId/comments/:commentId', Verify.verifyOrdinaryUser, commentCtrl.commentsDeleteId);


//get homnepages articles
router.get('/articlesUser', articleCtrl.articlesUserGet);
router.get('/articlesUser/:articleUserId', articleCtrl.articlesUserIdGet);

//timecheck router
router.get('/timecheck', Verify.verifyOrdinaryUser, timecheckCtrl.timecheckGet);
router.post('/timecheck', Verify.verifyOrdinaryUser, timecheckCtrl.timecheckPost);
router.get('/timecheck/:timecheckId', Verify.verifyOrdinaryUser, timecheckCtrl.timecheckGetId);
router.put('/timecheck/:timecheckId', Verify.verifyOrdinaryUser, timecheckCtrl.timecheckPutId);
router.delete('/timecheck/:timecheckId', Verify.verifyOrdinaryUser, timecheckCtrl.timecheckDeleteId);
//Carousel router
router.get('/carousel', carouselCtrl.carouselGet);
router.post('/carousel', carouselCtrl.carouselPost);
router.get('/carousel/:carouselId', carouselCtrl.carouselGetId);
router.put('/carousel/:carouselId', carouselCtrl.carouselPutId);
router.delete('/carousel/:carouselId', carouselCtrl.carouselDeleteId);

//upload images
router.post('/upload', upload.any(), function(req, res, next) {


	var fileName = 	req.files[0].filename;
	var html;
	console.log(fileName);
	html = "";
    html += "<script type='text/javascript'>";
    html += "    var funcNum = " + req.query.CKEditorFuncNum + ";";
    html += "    var url     = \"/uploads/" + fileName + "\";";
    html += "    var message = \"Uploaded file successfully\";";
    html += "";
    html += "    window.parent.CKEDITOR.tools.callFunction(funcNum, url, message);";
    html += "</script>";
    
    res.send(html);

});

router.post('/uploadImage', upload.any(),function(req, res) {
    var imageInfo = req.files[0];
    console.log(imageInfo);
    res.json(imageInfo);
});

module.exports = router;