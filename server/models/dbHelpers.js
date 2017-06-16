var pool = require('./dbConnection.js');

exports.addUser = (username, password, cb) => {
  var query = 'INSERT INTO users (username, password) VALUES ($1, $2);';
  pool.query(query, [username, password], function (err, result) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, true);
    }
  });
};

exports.getUser = (username, cb) => {
  var query = 'SELECT * FROM users WHERE username = $1;';
  pool.query(query, [username], function (err, result) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result.rows);
    }
  });
};

exports.addLocation = (name, coordinates, cb) => {
  var query = 'INSERT INTO locations (name, coordinates) VALUES ($1, $2);';
  pool.query(query, [name, coordinates], function (err, result) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, true);
    }
  });
};

exports.addPhoto = (locationId, username, uri, cb) => {
  var query = 'INSERT INTO photos (location_id, user_id, uri, date) VALUES ($1, (SELECT id FROM users WHERE username = $2), $3, CURRENT_TIMESTAMP);';
  pool.query(query, [locationId, username, uri], function (err, result) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, true);
    }
  });
};

exports.getPhotoUrl = (photoId, cb) => {
  var query = 'SELECT uri FROM photos WHERE id = $1;';
  pool.query(query, function (err, result) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result.rows[0].uri);
    }
  });
};

exports.addLocationComment = (locationId, username, content, cb) => {
  var query = 'INSERT INTO comments (location_id, user_id, content, date) VALUES ($1, (SELECT id FROM users WHERE username = $2), $3, CURRENT_TIMESTAMP);';
  pool.query(query, [locationId, username, content], function (err, result) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, true);
    }
  });
};

exports.getLocationPhotos = (locationId, cb) => {
  var query = 'SELECT photos.id, uri, username FROM photos, users WHERE user_id = users.id AND location_id = $1;';
  pool.query(query, [locationId], function (err, result) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result.rows);
    }
  });
};

exports.getLocationComments = (locationId, cb) => {
  var query = 'SELECT comments.id, content, username FROM comments, users WHERE user_id = users.id AND location_id = $1;';
  pool.query(query, [locationId], function (err, result) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result.rows);
    }
  });
};

exports.getLocationInfo = (locationId, cb) => {
  var query = 'SELECT id, name, coordinates FROM locations WHERE id = $1;';
  pool.query(query, [locationId], function (err, result) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result.rows);
    }
  });
};

exports.getLocationsAndCoverPhotos = (cb) => {
  var query = 'SELECT categories.name AS category, locations.id AS id, locations.name AS name, \
  locations.coordinates AS coordinates, uri, locations.like_count AS likeCount, locations.comment_count AS commentCount \
  FROM locations, photos, categories \
  WHERE locations.cover_photo_id = photos.id \
  AND locations.category_id = categories.id;';
  pool.query(query, function(err, result) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result.rows);
    }
  });
};

exports.addLike = (targetClass, targetId, userId, cb) => {
  var query = 'INSERT INTO likes (target_class, target_id, user_id) \
  SELECT CAST($1 AS VARCHAR), $2, $3 \
  WHERE NOT EXISTS (\
    SELECT * \
    FROM likes \
    WHERE target_class = $1 \
    AND target_id = $2 \
    AND user_id = $3\
  );';
  pool.query(query, [targetClass, targetId, userId], function (err, result) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, true);
    }
  });
};

// unfortuantely these three function can't be wrapped into one with our current design
exports.updateCommentLikeCount = (cb) => {
  var query = "WITH counted AS (\
    SELECT target_class, target_id, COUNT(*) \
    FROM likes \
    GROUP BY target_id, target_class) \
  UPDATE comments \
  SET like_count = c.count \
  FROM counted c \
  WHERE c.target_class = 'comment' \
  AND c.target_id = id;";
  pool.query(query, function (err, result) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result.command + ' ' + result.rowCount);
    }
  });
};

exports.updatePhotoLikeCount = (cb) => {
  var query = "WITH counted AS (\
    SELECT target_class, target_id, COUNT(*) \
    FROM likes \
    GROUP BY target_id, target_class) \
  UPDATE photos SET like_count = c.count \
  FROM counted c \
  WHERE c.target_class = 'photo' \
  AND c.target_id = id;";
  pool.query(query, function (err, result) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result.command + ' ' + result.rowCount);
    }
  });
};

exports.updateLocationLikeCount = (cb) => {
  var query = "WITH counted AS (\
    SELECT target_class, target_id, COUNT(*) \
    FROM likes \
    GROUP BY target_id, target_class) \
  UPDATE locations SET like_count = c.count \
  FROM counted c \
  WHERE c.target_class = 'location' \
  AND c.target_id = id;";
  pool.query(query, function (err, result) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result.command + ' ' + result.rowCount);
    }
  });
};

exports.updateLocationCommentCount = (cb) => {
  var query = "WITH counted AS ( \
    SELECT location_id, \
    COUNT(*) \
    FROM comments \
    GROUP BY location_id) \
  UPDATE locations SET comment_count = c.count \
  FROM counted c \
  WHERE c.location_id = id;";
  pool.query(query, function (err, result) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result.command + ' ' + result.rowCount);
    }
  });
};

exports.updateCoverPhotos = (cb) => {
  var query = "WITH maxes AS (\
    SELECT photos.id, photos.location_id, photos.like_count \
    FROM photos \
    INNER JOIN (\
      SELECT location_id, MAX(like_count) max \
      FROM photos \
      GROUP BY location_id) a \
    ON a.location_id = photos.location_id \
    AND max = photos.like_count) \
  UPDATE locations \
  SET cover_photo_id = m.id \
  FROM maxes m\
  WHERE m.location_id = locations.id;";
  pool.query(query, function (err, result) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result);
    }
  });
};
