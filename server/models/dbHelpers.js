var pool = require('./dbConnection.js');

exports.addUser = (username, cb) => {
  var query = "INSERT INTO users (username) VALUES ($1);";
  pool.query(query, [username], function (err, result) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, true);
    }
  });
};

exports.addLocation = (name, coordinates, cb) => {
  var query = "INSERT INTO locations (name, coordinates) VALUES ($1, $2);";
  pool.query(query, [name, coordinates], function (err, result) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, true);
    }
  });
};

exports.addPhoto = (locationId, userId, uri, cb) => {
  var query = "INSERT INTO photos (location_id, user_id, uri, date) VALUES ($1, $2, $3, CURRENT_TIMESTAMP);";
  pool.query(query, [locationId, userId, uri], function (err, result) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, true);
    }
  });
};

exports.getPhotoUrl = (photoId, cb) => {
  var query = "SELECT uri FROM photos WHERE id = $1;";
  pool.query(query, function (err, result) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result.rows[0].uri);
    }
  });
};

exports.getAllPhotos = (cb) => {
  var query = "SELECT * FROM public.photos";
  pool.query(query, function(err, result) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result.rows);
    }
  });
};

exports.addLocationComment = (locationId, userId, content, cb) => {
  var query = "INSERT INTO comments (location_id, user_id, content, date) VALUES ($1, $2, $3, CURRENT_TIMESTAMP);";
  pool.query(query, [locationId, userId, content], function (err, result) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, true);
    }
  });
};

