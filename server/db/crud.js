"use strict";

const utils = require("./utils");

function create(db, table, values) {
  let columns = Object.getOwnPropertyNames(values);
  let placeholders = [];
  let params = [];

  for (let i = 1; i <= columns.length; i++) {
    placeholders.push(`\$${i}`);
  }
  for (let col of columns) {
    params.push(values[col]);
  }
  let stmt = `insert into ${table} (${columns.join(
    ", "
  )}) values (${placeholders.join(", ")})`;
  return db.execSQL(stmt, params);
}

function read(db, table, filter, sort) {
  let stmt = `select * from ${table}`;

  if (filter) {
    stmt = `${stmt} ${utils.mkFilterString(filter)}`;
  }
  if (sort) {
    stmt = `${stmt} ${utils.mkOrderString(sort)}`;
  }
  return db.execSQL(stmt);
}

function update(db, table, values, filter) {
  let columns = Object.getOwnPropertyNames(values);
  let colList = [];
  let params = [];

  let i = 1;
  for (let col of columns) {
    colList.push(`${col} = \$${i}`);
    params.push(values[col]);
    i += 1;
  }
  let stmt = `update ${table} set ${colList.join(", ")}`;
  if (filter) {
    stmt = `${stmt} ${utils.mkFilterString(filter)}`;
  }
  return db.execSQL(stmt, params);
}

function del(db, table, filter) {
  let stmt = `delete from ${table}`;

  if (filter) {
    stmt = `${stmt} ${utils.mkFilterString(filter)}`;
  }
  return db.execSQL(stmt);
}

module.exports = {
  create,
  read,
  update,
  del,
};
