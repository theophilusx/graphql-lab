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

  let first = true;
  for (let v of arr) {
    if (Array.isArray(v)) {
      s = first ? `[${arrayToString(v)}` : `${s}, ${arrayToString(v)}`;
    } else {
      s = first ? `[${valueToString(v)}` : `${s}, ${valueToString(v)}`;
    }
    first = false;
  }
  return `${s}]`;
}

function termToString(term) {
  const t = {
    op: "=",
    value: undefined,
    ...term,
  };

  let s = `${t.column} ${t.op}`;
  if (t.op === "between" || t.op === "BETWEEN") {
    s = `${s} ${valueToString(t.value1)} and ${valueToString(t.value2)}}`;
  } else {
    const v = t.value;
    if (Array.isArray(v)) {
      s = `${s} ${arrayToString(v)}`;
    } else {
      s = `${s} ${valueToString(v)}`;
    }
  }
  return s.trim();
}

function filtersToString(filters) {
  let s = "";
  for (let term of filters) {
    if (s.startsWith("where")) {
      s = `${s} and ${termToString(term)}`;
    } else {
      s = `where ${termToString(term)}`;
    }
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
  sort = {
    direction: "ASC",
    ...sort,
  };
  let s = " ORDER BY ";
  let first = true;
  for (let col of sort.columns) {
    s = first ? `${col}` : `, ${col}`;
    first = false;
  }
  return `${s} ${sort.direction}`;
}

module.exports = {
  termToString,
  mkFilterString,
  mkOrderString,
};
