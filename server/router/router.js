var router = require('express').Router();
var bodyParser = require('body-parser');
var controllers = require('../controllers/controllers.js');

router.post('/login', controllers.login.post);

router.post('/logout', controllers.logout.post);

router.post('/signup', controllers.signup.post);

router.post('/search/results', controllers.tilePane.post);

router.post('/tilePage/getPhotosInRange', controllers.listPhotos.post);

router.post('/images/upload', controllers.imageUpload.post);

router.post('/locationPage/getContent', controllers.getLocationContent.post);

router.post('/locationPage/postComment', controllers.postComment.post);

router.post('/bigmap/popupSubmit', controllers.bigmapSubmit.post);

module.exports = router;
