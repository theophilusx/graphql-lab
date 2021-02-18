"use strict";

const chai = require("chai");
const expect = chai.expect;
const utils = require("../db/utils");
const { DateTime } = require("luxon");

describe("DB Util Tests", function () {
  describe("termToString tests", function () {
    it("basic operator with string tests", function () {
      return expect(
        utils.termToString({
          column: "col1",
          op: "=",
          value: "val1",
        })
      ).to.equal("col1 = 'val1'");
    });
    it("basic operand with number", function () {
      return expect(
        utils.termToString({
          column: "col1",
          op: "=",
          value: 23.5,
        })
      ).to.equal("col1 = 23.5");
    });
    it("basic operand with boolean", function () {
      return expect(
        utils.termToString({
          column: "col1",
          op: "=",
          value: true,
        })
      ).to.equal("col1 = true");
    });
    it("basic operand with DateTime", function () {
      let now = DateTime.now();
      return expect(
        utils.termToString({
          column: "col1",
          op: "=",
          value: now,
        })
      ).to.equal(`col1 = '${now.toISO()}'`);
    });
    it("basic operand with Date", function () {
      let now = new Date();
      return expect(
        utils.termToString({
          column: "col1",
          op: "=",
          value: now,
        })
      ).to.equal(`col1 = '${DateTime.fromJSDate(now).toISO()}'`);
    });
    it("is null test", function () {
      return expect(
        utils.termToString({
          column: "col1",
          op: "is null",
        })
      ).to.equal("col1 is null");
    });
    it("is not null test", function () {
      return expect(
        utils.termToString({
          column: "col1",
          op: "is not null",
        })
      ).to.equal("col1 is not null");
    });
    it("in tests", function () {
      return expect(
        utils.termToString({
          column: "col1",
          op: "in",
          value: ["a", "b", "c"],
        })
      ).to.equal("col1 in ['a', 'b', 'c']");
    });
  });

  describe("mkFilterString tests", function () {
    describe("Single filter", function () {
      it("simple op string", function () {
        return expect(
          utils.mkFilterString({
            column: "col1",
            value: "value",
          })
        ).to.equal("where col1 = 'value'");
      });
      it("simple op number", function () {
        return expect(
          utils.mkFilterString({
            column: "col1",
            value: 10,
          })
        ).to.equal("where col1 = 10");
      });
      it("in op with strings", function () {
        return expect(
          utils.mkFilterString({
            column: "col1",
            op: "in",
            value: ["a", "b", "c"],
          })
        ).to.equal("where col1 in ['a', 'b', 'c']");
      });
      it("in op with numbers", function () {
        return expect(
          utils.mkFilterString({
            column: "col1",
            op: "in",
            value: [1, 2, 3],
          })
        ).to.equal("where col1 in [1, 2, 3]");
      });
    });
  });
});
