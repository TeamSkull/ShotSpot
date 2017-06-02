var models = require('../models/models.js');
var dbHelpers = require('../models/dbHelpers.js');

module.exports = {
  tilePane: {
    post: function(req, res) {
      console.log('This is the search bar result from the controller: ', req.body);
      res.send(true);
    }
  },
  listPhotos: {
    get: function(req, res) {
      dbHelpers.getAllPhotos(function(err, result) {
        if (err) {
          console.log('This is an error inside controllers for getting all photos: ', err);
        }
        console.log('This is the result from getAllPhotos: ', result);
      });
      res.send('Got to the end of the listPhotos call in controllers');
    }
  }
};