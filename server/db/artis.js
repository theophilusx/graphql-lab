"use strict";

const createArtistModel = (db) => {
  return {
    find: (filter, order) => {
      let stmt = "SELECT * FROM graphql_lab.artist";

      if (filter) {
        stmt = `${stmt} ${utils.mkFilterString(filter)}`;
      }
      if (order) {
        stmt = `${stmt} ${utils.mkOrderString(order)}`;
      }
      return db.execSQL(stmt);
    },
    create(newRecord) {
      otk;
    },
  };
};
