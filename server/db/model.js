"use strict";

const EasyPostgres = require("easy-postgres");
const { createArtistModel } = require("./artist");

const db = new EasyPostgres();

// const model = {
//   Artist: createArtistModel(db),
// };

module.exports = {
  models: {
    Artist: createArtistModel(db),
  },
};
