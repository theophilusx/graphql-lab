"use strict";

const utils = require("./utils");

function create(db, table, values) {
  let columns = Object.getOwnPropertyNames(values);
  let placeholders = [];
  let params = [];

  let i = 1;
  for (let col of columns) {
    placeholders.push(`\$${i}`);
    params.push(values[col]);
  }
  let stmt = `insert into ${table} (${columns.join(
    ", "
  )}) values (${placeholders.join(", ")}) returning *`;
  return db.execSQL(stmt, params);
}

function read(db, from, columns, filter, sort) {
  let stmt = `select ${columns ? columns.join(", ") : "*"} from ${from}`;

  console.log(`CRUD filter: ${JSON.stringify(filter)}`);
  if (filter) {
    stmt = `${stmt} ${utils.mkFilterString(filter)}`;
  }
  if (sort) {
    stmt = `${stmt} ${utils.mkOrderString(sort)}`;
  }
  console.log(`stmt: ${stmt}`);
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
  stmt = `${stmt} returning *`;
  return db.execSQL(stmt, params);
}

function del(db, table, filter) {
  let stmt = `delete from ${table}`;

  if (filter) {
    stmt = `${stmt} ${utils.mkFilterString(filter)}`;
  }
  stmt = `${stmt} returning *`;
  return db.execSQL(stmt);
}

module.exports = {
  create,
  read,
  update,
  del,
};
