"use strict";

const crud = require("./crud");

function mkArtist(r) {
  return {
    artist_id: r.artist_id,
    name: r.name,
    created: r.created.toString(),
  };
}

const createArtistModel = (db) => {
  return {
    find: async (filter) => {
      let result = [];

      console.log(`filter: ${JSON.stringify(filter)}`);

      let rs = await crud.read(db, "graphql_lab.artists", ["*"], filter);
      for (let r of rs.rows) {
        result.push(mkArtist(r));
      }
      return result;
    },
    create: async (newRecord) => {
      let rs = await crud.create(db, "graphql_lab.artists", newRecord);
      return mkArtist(rs.rows[0]);
    },
    update: async (values, filter) => {
      let rs = await crud.update(db, "graphql_lab.artists", values, filter);
      let result = [];
      for (let r of rs.rows) {
        result.push(mkArtist(r));
      }
      return result;
    },
    delete: async (filter) => {
      let rs = await crud.del(db, "graphql_lab.artists", filter);
      let result = [];
      for (let r of rs.rows) {
        result.push(mkArtist(r));
      }
      return result;
    },
  };
};

module.exports = {
  createArtistModel,
};
