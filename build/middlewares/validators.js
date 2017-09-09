'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// contains functions for validating user inputs

var isValidInt = function isValidInt(value) {
  if (typeof value === 'number') {
    return true;
  }
  return false;
};

var iaValidStr = function iaValidStr(value) {
  if (typeof value === 'string') {
    if (value.trim()) return true;else return false;
  } else {
    return false;
  }
};

exports.isValidInt = isValidInt;
exports.isValidStr = isValidStr;