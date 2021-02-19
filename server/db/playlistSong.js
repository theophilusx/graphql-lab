"use strict";

const crud = require("./crud");

const createSongModel = (db) => {
  return {
    find: (filters, order) => {
      return crud.read(db, "graphql_lab.songs", filters, order);
    },
    create: (newRecord) => {
      return crud.create(db, "graphql_lab.songs", newRecord);
    },
    update: (updateValues, filter) => {
      return crud.update(db, "graphql_lab.songs", updateValues, filter);
    },
    delete: (filter) => {
      return crud.del(db, "graphql_lab.songs", filter);
    },
  };
};

module.exports = {
  createSongModel,
};
