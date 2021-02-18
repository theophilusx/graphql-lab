CREATE TABLE if NOT EXISTS graphql_lab.artists (
  artist_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE index artist_idx ON
  graphql_lab.artists(name);

CREATE TABLE if NOT EXISTS graphql_lab.songs (
  song_id SERIAL PRIMARY KEY,
  artist_id INTEGER REFERENCES graphql_lab.artists(artist_id),
  title VARCHAR(100) NOT NULL,
  location TEXT,
  created TIMESTAMP DEFAULT current_timestamp
);

CREATE UNIQUE index song_idx ON
  graphql_lab.songs(artist_id, title);

CREATE TABLE if NOT EXISTS graphql_lab.playlists (
  list_id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE if NOT EXISTS graphql_lab.playlist_songs (
  song_order INTEGER,
  list_id INTEGER REFERENCES graphql_lab.playlists(list_id),
  song_id INTEGER REFERENCES graphql_lab.songs(song_id),
  PRIMARY KEY (list_id, song_id)
);
