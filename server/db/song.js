"use strict";

const crud = require("./crud");

function mkSong(r) {
  console.log(`Song rec: ${JSON.stringify(r)}`);
  return {
    song_id: r.song_id,
    artist: {
      artist_id: r.artist_id,
      name: r.name,
      created: r.artist_created.toString(),
    },
    title: r.title,
    created: r.created.toString(),
  };
}

const doFind = async (db, filter, sort) => {
  let records = [];
  let columns = [
    "s.song_id",
    "s.title",
    "s.location",
    "s.created",
    "s.artist_id",
    "a.name",
    "a.created artist_created",
  ];
  let table =
    "graphql_lab.songs s join graphql_lab.artists a " +
    "on s.artist_id = a.artist_id";
  let rs = await crud.read(db, table, columns, filter, sort);
  for (let r of rs.rows) {
    records.push(mkSong(r));
  }
  return records;
};

const createSongModel = (db) => {
  return {
    find: async (filter, sort) => {
      return await doFind(db, filter, sort);
    },
    create: async (newRecord) => {
      let rs = await crud.create(db, "graphql_lab.songs", newRecord);
      let song_id = rs.rows[0].song_id;
      rs = await doFind(db, { column: "song_id", value: song_id });
      console.log(`create returning: ${JSON.stringify(rs[0])}`);
      return rs[0];
    },
    update: async (values, filter) => {
      let rs = await crud.update(db, "graphql_lab.songs", values, filter);
      let result = [];
      for (let r of rs.rows) {
        let song_id = r.song_id;
        let rs2 = await doFind(db, { column: "song_id", value: song_id });
        result.push(rs2[0]);
      }
      return result;
    },
    delete: async (filter) => {
      let matches = await doFind(db, filter);
      let rs = await crud.del(db, "graphql_lab.songs", filter);
      return matches;
    },
  };
};

module.exports = {
  createSongModel,
};
