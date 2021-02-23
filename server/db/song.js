"use strict";

const crud = require("./crud");

function mkSong(r) {
  return {
    song_id: r.song_id,
    artist_id: r.artist_id,
    title: r.title,
    created: r.created.toString(),
  };
}

const createSongModel = (db) => {
  return {
    find: async (filter, sort) => {
      let rs = await crud.read(db, "graphql_lab.songs", ["*"], filter, sort);
      let records = [];
      for (let r of rs.rows) {
        records.push(mkSong(r));
      }
      return records;
    },
    create: async (newRecord) => {
      let rs = await crud.create(db, "graphql_lab.songs", newRecord);
      return mkSong(rs.rows[0]);
    },
    update: async (values, filter) => {
      let rs = await crud.update(db, "graphql_lab.songs", values, filter);
      let result = [];
      for (let r of rs.rows) {
        result.push(mkSong(r));
      }
      return result;
    },
    delete: async (filter) => {
      let rs = await crud.del(db, "graphql_lab.songs", filter);
      let results = [];
      for (let r of rs.rows) {
        results.push(mkSong(r));
      }
      return results;
    },
  };
};

module.exports = {
  createSongModel,
};
