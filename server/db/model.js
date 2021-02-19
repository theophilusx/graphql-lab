"use strict";

const EasyPostgres = require("easy-postgres");
const { createArtistModel } = require("./artist");
const { createSongModel } = require("./song");
const { createPlaylistModel } = require("./playlist");
const { createPlaylistSongModel } = require("./playlistSong");

const db = new EasyPostgres();

const model = {
  Artist: createArtistModel(db),
  Song: createSongModel(db),
  Playlist: createPlaylistModel(db),
  PlaylistSong: createPlaylistSongModel(db),
};

module.exports = model;
