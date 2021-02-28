"use strict";

const { DateTime } = require("luxon");

function valueToStr(v) {
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

function arrayToStr(arr) {
  let s = "";

  let strValues = arr.map((v) => {
    return Array.isArray(v) ? arrayToStr(v) : valueToStr(v);
  });
  return `[${strValues.join(", ")}]`;
}

function termToStr(term) {
  const t = {
    op: "=",
    ...term,
  };

  let s = `${t.column} ${t.op}`;
  if (t.op.toLowerCase() === "between") {
    s = `${s} ${valueToStr(t.value1)} and ${valueToStr(t.value2)}`;
  } else {
    s = Array.isArray(t.value)
      ? `${s} ${arrayToStr(t.value)}`
      : `${s} ${valueToStr(t.value)}`;
  }
  return s.trim();
}

function filtersToStr(filters) {
  let s = "";

  if (filters) {
    let filterArray = Array.isArray(filters) ? filters : [filters];
    for (let term of filterArray) {
      s = s.startsWith("where")
        ? `${s} and ${termToStr(term)}`
        : `where ${termToStr(term)}`;
    }
  }
  return s;
}

function orderToStr(sort) {
  if (sort) {
    return `order by ${sort.columns.join(", ")} ${sort.direction || "asc"}`;
  }
  return "";
}

function valuesToSetStr(values) {
  let termStrings = [];

  for (let [k, v] of Object.entries(values)) {
    termStrings.push(`${k} = ${valueToStr(v)}`);
  }
  return termStrings.join(", ");
}

function selectorToFilter(selector) {
  let filter = [];
  for (let [col, val] of Object.entries(selector)) {
    filter.push({
      column: col,
      value: val,
    });
  }
  return filter;
}

function sql(strings, ...values) {
  let str = "";

  for (let i = 0; i < strings.length; i++) {
    if (i > 0) {
      if (typeof values[i - 1] === "object") {
        if (Array.isArray(values[i - 1])) {
          str = `${str}${values[i - 1].join(", ")}`;
        }
      } else {
        str = `${str}${values[i - 1]}`;
      }
    }
    str = `${str}${strings[i]}`;
  }
  return str;
}

module.exports = {
  valueToStr,
  termToStr,
  filtersToStr,
  orderToStr,
  valuesToSetStr,
  selectorToFilter,
  sql,
};
