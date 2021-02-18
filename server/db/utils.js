"use strict";

const { DateTime } = require("luxon");

function valueToString(v) {
  switch (typeof v) {
    case "boolean":
      return v ? "true" : "false";
    case "number":
      return `${v}`;
    case "string":
      return `'${v}'`;
    case "object": {
      if (v instanceof Date) {
        return `'${DateTime.fromJSDate(v).toISO()}'`;
      } else if (v instanceof DateTime) {
        return `'${v.toISO()}'`;
      }
      return `'${JSON.stringify(v)}'`;
    }
    default:
      return "";
  }
}

function arrayToString(arr) {
  let s = "";

  let strValues = arr.map((v) => {
    return Array.isArray(v) ? arrayToString(v) : valueToString(v);
  });
  return `[${strValues.join(", ")}]`;
}

function termToString(term) {
  const t = {
    op: "=",
    value: undefined,
    ...term,
  };

  let s = `${t.column} ${t.op}`;
  if (t.op === "between" || t.op === "BETWEEN") {
    s = `${s} ${valueToString(t.value1)} and ${valueToString(t.value2)}`;
  } else {
    if (Array.isArray(t.value)) {
      s = `${s} ${arrayToString(t.value)}`;
    } else {
      s = `${s} ${valueToString(t.value)}`;
    }
  }
  return s.trim();
}

function filtersToString(filters) {
  let s = "";
  for (let term of filters) {
    s = s.startsWith("where")
      ? `${s} and ${termToString(term)}`
      : `where ${termToString(term)}`;
  }
  return s;
}

function mkFilterString(filter) {
  if (!Array.isArray(filter)) {
    filter = [filter];
  }
  return filtersToString(filter);
}

function mkOrderString(sort) {
  let s = {
    direction: "asc",
    ...sort,
  };
  return `order by ${s.columns.join(", ")} ${s.direction}`;
}

module.exports = {
  termToString,
  mkFilterString,
  mkOrderString,
};
