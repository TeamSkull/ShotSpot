// Should rename to countWorker or something

var dbHelpers = require('./server/models/dbHelpers.js');

dbHelpers.updateCommentLikeCount((err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
  }
});
dbHelpers.updateLocationLikeCount((err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
  }
});
dbHelpers.updatePhotoLikeCount((err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
  }
});

dbHelpers.updateCommentLikeCount((err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
  }
});