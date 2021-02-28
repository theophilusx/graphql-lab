"use strict";

require("dotenv").config();

const chai = require("chai");
const expect = chai.expect;
const EasyPostgres = require("easy-postgres");
const crud = require("../db/crud");

describe("CRUD tests", function () {
  let db;

  before("setup", async function () {
    let create =
      "create table test.crud_tst " +
      "(crud_id SERIAL PRIMARY KEY, crud_name VARCHAR(50), crud_n NUMERIC(5,2), crud_t TIMESTAMP)";
    db = new EasyPostgres();
    await db.execSQL(create);
  });

  after("cleanup", async function () {
    let drop = "DROP TABLE test.crud_tst";
    await db.execSQL(drop);
    await db.close();
  });

  it("create record", async function () {
    let values = {
      crud_name: "test name",
      crud_n: 50.5,
      crud_t: new Date(),
    };
    let rslt = await crud.create(db, "test.crud_tst", values);
    return expect(rslt.rowCount).to.equal(1);
  });

  it("read record", async function () {
    let rslt = await crud.read(db, "test.crud_tst", "*");
    expect(rslt.rowCount).to.equal(1);
    let rec = rslt.rows[0];
    return expect(rec.crud_name).to.equal("test name");
  });

  it("read record with filter", async function () {
    let filter = {
      column: "crud_id",
      op: ">",
      value: 0,
    };
    let rslt = await crud.read(db, "test.crud_tst", "*", filter);
    expect(rslt.rowCount).to.equal(1);
    return expect(rslt.rows[0].crud_name).to.equal("test name");
  });

  it("read record with array cols", async function () {
    let rslt = await crud.read(db, "test.crud_tst", ["*"]);
    expect(rslt.rowCount).to.equal(1);
    let rec = rslt.rows[0];
    return expect(rec.crud_name).to.equal("test name");
  });

  it("read record with array cols and filter", async function () {
    let filter = {
      column: "crud_id",
      op: ">",
      value: 0,
    };
    let rslt = await crud.read(db, "test.crud_tst", ["*"], filter);
    expect(rslt.rowCount).to.equal(1);
    return expect(rslt.rows[0].crud_name).to.equal("test name");
  });

  it("read record with specific cols and filter", async function () {
    let filter = {
      column: "crud_id",
      op: ">",
      value: 0,
    };
    let rslt = await crud.read(
      db,
      "test.crud_tst",
      ["crud_name", "crud_n"],
      filter
    );
    expect(rslt.rowCount).to.equal(1);
    return expect(rslt.rows[0].crud_name).to.equal("test name");
  });
  it("delete record with filter", async function () {
    let filter = {
      column: "crud_name",
      value: "test name",
    };
    let rslt = await crud.del(db, "test.crud_tst", filter);
    return expect(rslt.rowCount).to.equal(1);
  });

  it("delete record", async function () {
    let rslt = await crud.del(db, "test.crud_tst");
    return expect(rslt.rowCount).to.equal(0);
  });
});
