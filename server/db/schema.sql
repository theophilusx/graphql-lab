DROP TABLE if EXISTS graphql_lab.artists CASCADE;
DROP TABLE if EXISTS graphql_lab.songs CASCADE;
DROP TABLE if EXISTS graphql_lab.playlists CASCADE;
DROP TABLE if EXISTS graphql_lab.playlist_songs CASCADE;

CREATE TABLE if NOT EXISTS graphql_lab.artists (
  artist_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE index artist_name_uidx
  ON graphql_lab.artists(name);

CREATE TABLE if NOT EXISTS graphql_lab.songs (
  song_id SERIAL PRIMARY KEY,
  artist_id INT REFERENCES graphql_lab.artists(artist_id),
  title VARCHAR(100) NOT NULL,
  location TEXT,
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE index songs_uidx
  ON graphql_lab.songs(song_id, artist_id);

CREATE index song_title_idx
  ON graphql_lab.songs(title);

CREATE TABLE if NOT EXISTS graphql_lab.playlists (
  playlist_id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  created TIMESTAMP
);

CREATE UNIQUE index playlist_name_uidx
  ON graphql_lab.playlists(name);

CREATE TABLE if NOT EXISTS graphql_lab.playlist_songs (
  entry_id SERIAL PRIMARY KEY,
  playlist_id INTEGER REFERENCES graphql_lab.playlists(playlist_id),
  song_id INTEGER REFERENCES graphql_lab.songs(song_id),
  song_order SERIAL
);

CREATE index playlist_song_order_idx
  ON graphql_lab.playlist_songs(song_order);
