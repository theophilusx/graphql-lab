"use strict";

const crud = require("./crud");

const createPlaylistModel = (db) => {
  return {
    find: (filter, order) => {
      return crud.read(db, "graphql_lab.playlists", filter, sort);
    },
    create: (newRecord) => {
      return crud.create(db, "graphql_lab.playlists", newRecord);
    },
    update: (newValues, filter) => {
      return crud.update(db, "graphql_lab.playlists", newValues, filter);
    },
    delete: (filter) => {
      return crud.del(db, "graphql_lab.playlists", filter);
    },
  };
};

module.exports = {
  createPlaylistModel,
};
