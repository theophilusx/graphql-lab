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
      it("in op with dates", function () {
        let d1 = DateTime.now();
        let d2 = DateTime.now();
        let d3 = DateTime.now();
        return expect(
          utils.mkFilterString({
            column: "col1",
            op: "in",
            value: [d1, d2, d3],
          })
        ).to.equal(
          `where col1 in ['${d1.toISO()}', '${d2.toISO()}', '${d3.toISO()}']`
        );
      });
    });
    describe("between filter", function () {
      it("between with strings", function () {
        return expect(
          utils.mkFilterString({
            column: "col1",
            op: "between",
            value1: "this",
            value2: "that",
          })
        ).to.equal("where col1 between 'this' and 'that'");
      });
      it("between with numbers", function () {
        return expect(
          utils.mkFilterString({
            column: "col1",
            op: "between",
            value1: 10,
            value2: 50,
          })
        ).to.equal("where col1 between 10 and 50");
      });
      it("between with dates", function () {
        let d1 = DateTime.now();
        let d2 = DateTime.now();
        return expect(
          utils.mkFilterString({
            column: "col1",
            op: "between",
            value1: d1,
            value2: d2,
          })
        ).to.equal(`where col1 between '${d1.toISO()}' and '${d2.toISO()}'`);
      });
    });

    describe("multiple simple filter tests", function () {
      it("multi-filter 1", function () {
        return expect(
          utils.mkFilterString([
            {
              column: "col1",
              value: "val1",
            },
            {
              column: "col2",
              value: "val2",
            },
          ])
        ).to.equal("where col1 = 'val1' and col2 = 'val2'");
      });
      it("multi-filter 2", function () {
        return expect(
          utils.mkFilterString([
            {
              column: "col1",
              op: "<",
              value: 10,
            },
            {
              column: "col2",
              op: ">",
              value: 20,
            },
          ])
        ).to.equal("where col1 < 10 and col2 > 20");
      });
      it("multi-filter 3", function () {
        return expect(
          utils.mkFilterString([
            {
              column: "col1",
              op: "between",
              value1: 20,
              value2: 100,
            },
            {
              column: "col2",
              op: "is null",
            },
          ])
        ).to.equal("where col1 between 20 and 100 and col2 is null");
      });
    });
  });
  describe("mkOrderString tests", function () {
    it("simple order by", function () {
      return expect(
        utils.mkOrderString({
          columns: ["col1"],
        })
      ).to.equal("order by col1 asc");
    });

    it("simple order by dsc", function () {
      return expect(
        utils.mkOrderString({
          columns: ["col1"],
          direction: "dsc",
        })
      ).to.equal("order by col1 dsc");
    });
    it("multi-col order by", function () {
      return expect(
        utils.mkOrderString({
          columns: ["col1", "col2", "col3"],
        })
      ).to.equal("order by col1, col2, col3 asc");
    });
  });
});
