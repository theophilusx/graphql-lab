"use strict";

const utils = require("./utils");

function create(db, table, values) {
  let columns = Object.getOwnPropertyNames(values);
  let placeholders = [];
  let params = [];

  try {
    let i = 1;
    for (let col of columns) {
      placeholders.push(`\$${i}`);
      params.push(values[col]);
      i += 1;
    }
    let stmt = `insert into ${table} (${columns.join(
      ", "
    )}) values (${placeholders.join(", ")}) returning *`;
    return db.execSQL(stmt, params);
  } catch (err) {
    throw new Error(`create: ${err.message} Values ${JSON.stringify(values)}`);
  }
}

function read(db, from, columns, filter, sort) {
  let stmt = `select ${columns ? columns.join(", ") : "*"} from ${from}`;

  try {
    if (filter) {
      stmt = `${stmt} ${utils.mkFilterString(filter)}`;
    }
    if (sort) {
      stmt = `${stmt} ${utils.mkOrderString(sort)}`;
    }
    return db.execSQL(stmt);
  } catch (err) {
    throw new Error(
      `read: ${err.message} Filter: ${JSON.stringify(
        filter
      )} Sort: ${JSON.stringify(sort)}`
    );
  }
}

function update(db, table, values, filter) {
  let columns = Object.getOwnPropertyNames(values);
  let colList = [];
  let params = [];

  try {
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
  } catch (err) {
    throw new Error(
      `update: ${err.message} Values: ${JSON.stringify(
        values
      )} Filter: ${JSON.stringify(filter)}`
    );
  }
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
