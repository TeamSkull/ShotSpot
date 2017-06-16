var Flickr = require("flickrapi");
var request = require('request');

var flickrOptions = {
  api_key: process.env.FLICKR_API_KEY,
  secret: process.env.FLICKR_API_SECRET,
  permissions: "delete",
  user_id: process.env.FLICKR_USER_ID,
  access_token: process.env.FLICKR_ACCESS_TOKEN,
  access_token_secret: process.env.FLICKR_ACCESS_TOKEN_SECRET
};

var getPhotoUrl = function(photoId, cb) {
  var endpoint = 'https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=' + flickrOptions.api_key + '&photo_id=' + photoId +'&format=json&nojsoncallback=1';
  request(endpoint, function (err, response, body) {
    if (err) {
      cb (err, null);
    } else {
      body = JSON.parse(body).photo;
      var photoUrl = 'https://farm' + body.farm + '.staticflickr.com/' + body.server + '/' + body.id + '_' + body.secret + '.jpg';
      cb (null, photoUrl);
    }
  });
}

exports.upload = function(title, fileLocation, cb) {
  var uploadOptions = {
    photos: [{
      title: title,
      photo: fileLocation
    }]
  };

  Flickr.upload(uploadOptions, flickrOptions, function(err, result) {
    if(err) {
      cb(err, null);
    } else {
      getPhotoUrl(result, (err, url) => {
        if (err) {
          cb(err, null);
        } else {
          cb(null, url);
        }
      });
    }
  });
}
