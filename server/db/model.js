"use strict";

const EasyPostgres = require("easy-postgres");
const { createArtistModel } = require("./artist");
const { createSongModel } = require("./song");

const db = new EasyPostgres();

module.exports = {
  models: {
    Artist: createArtistModel(db),
    Song: createSongModel(db),
  },
};
