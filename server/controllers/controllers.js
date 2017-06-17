require('dotenv').config()
var flickr = require('../models/flickr/upload.js');
var dbHelpers = require('../models/dbHelpers.js');
var NodeGeocoder = require('node-geocoder');
var distance = require('gps-distance');
var path = require('path');
var fs = require('fs');
var auth = require('../authCheck.js');
var options = {
  provider: 'google'
};
var geocoder = NodeGeocoder(options);
var bcrypt = require('bcrypt-nodejs');

var shortid = require('shortid');

exports.tilePane = {
  post: function(req, res) {
    geocoder.geocode(req.body.search, function(error, result) {
      var coordinates = {};
      if(error){
        console.log('The error is: ', error);
      } else {
        coordinates['Latitude'] = result[0].latitude;
        coordinates['Longitude'] = result[0].longitude;
        coordinates['Search'] = true;
        coordinates['City'] = result[0].formattedAddress;
        res.send(coordinates);
      }
    });
  }
}

exports.bigmapSubmit = {
  post: function(req, res) {
    console.log(req.body);
    res.sendStatus(200);
  }
}

exports.login = {
  post: function(req, res) {
    console.log('These are the values from login: ', req.body);
  }
}

exports.listPhotos = {
  post: function(req, res) {
      let radiustoSearch = 25; //Miles
      let locationstosend = {
        locations: [],
        searchCoordinates: [req.body.latitude, req.body.longitude],
        sessionUser: auth.checkSession(req.session)
      };
      dbHelpers.getLocationsAndCoverPhotos((err, result) => {
        if (err) {
          console.log('There is an error in the controller on getLocationsAndCoverPhotos: ', err);
        } else {
          result.forEach(function(location) {
            let content = {
              id: '',
              name: '',
              category: '',
              coordinates: '',
              coverPhoto: [],
              comments: [],
              likeCount: '',
              commentCount: ''
            };
            let splitcoords = location.coordinates.split(',');
            let result = distance(req.body.latitude, req.body.longitude, splitcoords[0], splitcoords[1]);
            let milediff = result * 0.621371;
            if (milediff < radiustoSearch) {
              content.id = location.id;
              content.name = location.name;
              content.category = location.category;
              content.coverPhoto.push(location.uri);
              content.coordinates = {latitude: splitcoords[0], longitude: splitcoords[1]};
              content.likeCount = location.likecount;
              content.commentCount = location.commentcount;
              locationstosend.locations.push(content);
            }
          });
          res.send(locationstosend);
        }
      });
    }
  }

exports.postComment = {
  post: (req, res) => {
    console.log(req.body);
    dbHelpers.addLocationComment(req.body.locationId, req.body.username, req.body.content, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.sendStatus(200);
      }
    })
  }
}

// Should refactor this to use promises to avoid the cb pyramid
exports.getLocationContent = {
  post: (req, res) => {
    var content = {
      id: '',
      name: '',
      coordinates: '',
      comments: [],
      photos: [],
      sessionUser: auth.checkSession(req.session)
    };
    dbHelpers.getLocationInfo(req.body.locationId, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        result.forEach((location) => {
          content.id = location.id;
          content.name = location.name;
          content.coordinates = location.coordinates;
        });
      }
      dbHelpers.getLocationComments(req.body.locationId, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          result.forEach((comment) => {
            content.comments.push(comment);
          });
        }
        dbHelpers.getLocationPhotos(req.body.locationId, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            result.forEach((photo) => {
              content.photos.push(photo);
            });
          }
          res.send(content);
        });
      });
    });
  }
}

exports.imageUpload = {
  post: (req, res) => {
    if(!req.files){
      res.send('There was no image selected! Please try again');
    }
    let image = req.files.imageToUpload;
    let newName = shortid.generate();
    let testimage = image.name.split('.')
    image.mv(path.join(__dirname, '../../public/images/') + image.name, function(err) {
      if(err) {
        return res.send(err);
      }
      res.redirect(200, 'http://localhost:3000/')
    })
    
    var uniqueFileName = path.join(__dirname, '../../public/images/' + newName + '.' + testimage[1])
    console.log('this is the unique file name: ', uniqueFileName)
    fs.renameSync(path.join(__dirname, '../../public/images/'+ image.name), uniqueFileName)
    flickr.upload(image.name, uniqueFileName, (err, url) => {
      if (err) {
        console.log(err);
      } else {
        console.log(req.body.username);
        dbHelpers.addPhoto(req.body.locationId, auth.checkSession(req.session), url, (err, result) => {
          if (err) {
            console.log(err);
          }
        })
      }
    })
    fs.unlink(uniqueFileName, (err) => {
      if (err) {
          console.log("failed to delete local image:" + err);
      } else {
          console.log('successfully deleted local image');                                
      }
    });
  }
}

exports.signup = {
  post: (req, res) => {
    console.log('beginning of model function for signup');
    dbHelpers.getUser(req.body.username, (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        if (result.length !== 0) {
          console.log('USER EXISTS', result);
          res.send('user exists');
        } else {
          // hash password and store
          let salt = bcrypt.genSaltSync(10);
          bcrypt.hash(req.body.password, salt, null, function (err, hash) {
            if (err) {
              console.log('Error hashing password', err);
              res.send(err);
            } else {
              dbHelpers.addUser(req.body.username, hash, (err, result) => {
                if (err) {
                  console.log(err);
                  res.send(err);
                } else {
                  req.session.user = req.body.username;
                  console.log('User successfully created');
                  res.send('user created');
                }
              });
            }
          });
        }
      }
    });
  }
}

exports.login = {
  post: (req, res) => {
    // update the logic. Get hashed password (err if null) => bcrypt compare if they match 
    dbHelpers.getUser(req.body.username, (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        if (result.length === 0) {
          console.log('Wrong login or password');
          res.send('Wrong login or password');
        } else {
          let retrievedPassword = result[0].password;
          bcrypt.compare(req.body.password, retrievedPassword, function (err, result) {
            if (err) {
              console.log('Wrong login or password');
              res.send('Wrong login or password');
            } else {
              if (result === true) {
                req.session.user = req.body.username;
                console.log('User successfully logged in Models');
                res.send('user logged in');
              } else {
                console.log('Wrong login or password');
                res.send('Wrong login or password');
              }
            }
          });
        }
      }
    });
  }
}

exports.logout = {
  post: function(req, res) {
    console.log('controllers.js logout post');
    req.session.destroy(function(err) {
      if (err) {
        res
          .status(404)
          .send();
      } else {
        res
          .status(200)
          .send('Logout Successful');
      }
    });
  }
}