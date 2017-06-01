var pool = require('./dbConnection.js');

exports.addPhoto = (locationId, userId, uri, cb) => {
  var query = "INSERT INTO photos (location_id, user_id, uri, date) VALUES ($1, $2, $3, CURRENT_TIMESTAMP);";
  pool.query(query, [locationId, userId, uri], function (err, result) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, true);
    }
  });
}

exports.getPhotoUrl = (photoId, cb) => {
  var query = "SELECT uri FROM photos WHERE id = $1;";
  pool.query(query, [photoId], function (err, result) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result.rows[0].uri);
    }
  });
}

exports.addLocationComment = (locationId, userId, content, cb) => {
  var query = "INSERT INTO comments (location_id, user_id, content, date) VALUES ($1, $2, $3, CURRENT_TIMESTAMP);";
  pool.query(query, [locationId, userId, content], function (err, result) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, true);
    }
  });
}

