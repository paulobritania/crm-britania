"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = _default;

var _postcss = _interopRequireDefault(require("postcss"));

var _autoprefixer = _interopRequireDefault(require("autoprefixer"));

var _package = require("/package.json");

function _default(css, pathname) {
  var prefixer = (0, _postcss.default)([(0, _autoprefixer.default)({
    overrideBrowserslist: _package.browserslist ? _package.browserslist : [">0.25%", "not dead"]
  })]);

  try {
    return prefixer.process(css, {
      from: null
    }).css;
  } catch (error) {
    if (error.name === "CssSyntaxError") {
      throw new Error("Pathname: " + pathname + " " + error.toString());
    }

    throw error;
  }
}