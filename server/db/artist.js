"use strict";

const crud = require("./crud");

const createArtistModel = (db) => {
  return {
    find: (filter, order) => {
      return crud.read(db, "graphql_lab.artists", filter, order);
    },
    create: (newRecord) => {
      return crud.create(db, "graphql_lab.artists", newRecord);
    },
    update: (updateValues, filter) => {
      return crud.update(db, "graphql_lab.artists", updateValues, filter);
    },
    delete: (filter) => {
      return crud.del(db, "graphql_lab.artists", filter);
    },
  };
};

module.exports = {
  createArtistModel,
};
