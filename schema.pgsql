-- ---
-- Table 'categories'
-- 
-- ---

DROP TABLE IF EXISTS categories CASCADE;

CREATE TABLE categories (
  id SERIAL NOT NULL,
  name VARCHAR(40),
  PRIMARY KEY (id)
);

-- ---
-- Table 'locations'
-- 
-- ---

DROP TABLE IF EXISTS locations CASCADE;

CREATE TABLE locations (
  id BIGSERIAL NOT NULL,
  name VARCHAR(40),
  category_id INTEGER,
  coordinates VARCHAR,
  cover_photo_id BIGINT DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,
  PRIMARY KEY (id)
);

-- ---
-- Table 'users'
-- 
-- ---

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id BIGSERIAL NOT NULL,
  username VARCHAR(20),
  password TEXT,
  PRIMARY KEY (id)
);

-- ---
-- Table 'photos'
-- 
-- ---

DROP TABLE IF EXISTS photos;

CREATE TABLE photos (
  id BIGSERIAL NOT NULL,
  location_id INTEGER REFERENCES locations(id),
  user_id INTEGER REFERENCES users(id),
  uri TEXT,
  date DATE,
  like_count INTEGER DEFAULT 0,
  PRIMARY KEY (id)
);

-- ---
-- Table 'comments'
-- 
-- ---

DROP TABLE IF EXISTS comments;

CREATE TABLE comments (
  id BIGSERIAL NOT NULL,
  location_id INTEGER REFERENCES locations(id),
  user_id INTEGER REFERENCES users(id),
  content TEXT,
  date DATE,
  like_count INTEGER DEFAULT 0,
  PRIMARY KEY (id)
);

-- ---
-- Table 'likes'
-- 
-- ---

DROP TABLE IF EXISTS likes;

CREATE TABLE likes (
  id BIGSERIAL NOT NULL,
  target_class VARCHAR(10),
  target_id INTEGER,
  user_id INTEGER REFERENCES users(id),
  PRIMARY KEY (id)
);

-- ---
-- Table 'quotes'
-- 
-- ---

DROP TABLE IF EXISTS quotes;

CREATE TABLE quotes (
  id BIGSERIAL NOT NULL,
  content TEXT,
  PRIMARY KEY (id)
);

-- ---
-- Table 'landing_images'
-- 
-- ---

DROP TABLE IF EXISTS landing_images;

CREATE TABLE landing_images (
  id BIGSERIAL NOT NULL,
  uri TEXT,
  name VARCHAR(20),
  PRIMARY KEY (id)
);

-- ---
-- Table 'session'
-- 
-- ---

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

INSERT INTO photos (id, uri) VALUES (0, 'https://c1.staticflickr.com/5/4208/35000849792_1f62b924ba.jpg');

INSERT INTO categories (name) VALUES 
('Street Art'), 
('Astrophotography'), 
('Architecture'), 
('Landscape'), 
('Cityscape'), 
('Tourist'), 
('Nature');
