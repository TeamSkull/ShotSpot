const pg = require('pg');

var config = {
  user: process.env.USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'snapspots',
  host: process.env.DB_URL || 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};

const pool = new pg.Pool(config);

pool.on('error', function (err, client) {
  // if an error is encountered by a client while it sits idle in the pool 
  // the pool itself will emit an error event with both the error and 
  // the client which emitted the original error 
  // this is a rare occurrence but can happen if there is a network partition 
  // between your application and the database, the database restarts, etc. 
  // and so you might want to handle it and at least log it out 
  console.error('idle client error', err.message, err.stack);
});

module.exports.query = function (text, values, callback) {
  return pool.query(text, values, callback);
};

module.exports.connect = function (callback) {
  return pool.connect(callback);
};
