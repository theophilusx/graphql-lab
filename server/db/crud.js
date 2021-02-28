"use strict";

const utils = require("./utils");

function create(db, table, values) {
  let placeholders = [];
  let params = [];

  try {
    let i = 1;
    for (let v of Object.values(values)) {
      placeholders.push(`\$${i}`);
      params.push(v);
      i += 1;
    }
    let stmt = utils.sql`insert into ${table} (${Object.keys(
      values
    )}) values (${placeholders})`;
    return db.execSQL(stmt, params);
  } catch (err) {
    throw new Error(`create: ${err.message} Values ${JSON.stringify(values)}`);
  }
}

function read(db, from, columns, filter, sort) {
  try {
    let stmt = utils.sql`select ${columns} from ${from} ${utils.filtersToStr(
      filter
    )} ${utils.orderToStr(sort)}`;
    return db.execSQL(stmt.trim());
  } catch (err) {
    throw new Error(
      `read: ${err.message} Filter: ${JSON.stringify(
        filter
      )} Sort: ${JSON.stringify(sort)}`
    );
  }
}

function update(db, table, values, filter) {
  let colList = [];
  let params = [];

  try {
    let i = 1;
    for (let [col, val] of Object.entries(values)) {
      colList.push(`${col} = \$${i}`);
      params.push(val);
      i += 1;
    }
    let stmt = utils.sql`update ${table} set ${colList} ${utils.filtersToStr(
      filter
    )} returning *`;
    return db.execSQL(stmt.trim(), params);
  } catch (err) {
    throw new Error(
      `update: ${err.message} Values: ${JSON.stringify(
        values
      )} Filter: ${JSON.stringify(filter)}`
    );
  }
}

function del(db, table, filter) {
  try {
    let stmt = `delete from ${table} ${utils.filtersToStr(filter)} returning *`;
    return db.execSQL(stmt.trim());
  } catch (err) {
    throw new Error(
      `delete: ${err.message} Table: ${table} Filter: ${JSON.stringify(filter)}`
    );
  }
}

module.exports = {
  create,
  read,
  update,
  del,
};
