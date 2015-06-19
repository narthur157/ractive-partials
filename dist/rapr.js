'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.load = load;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ractive = require('ractive');

var _ractive2 = _interopRequireDefault(_ractive);

// Finds all '{{> partialName }}' in the template
var findPartial = /{{>\s?([^\s]+)\s?}}/gi;

function load(moduleName, require, done) {
  require('text!' + moduleName, function (text) {

    var toGet = [];

    var repartial = text.replace(findPartial, function (match, partial) {
      // replace slash with $
      var safePartialKey = partial.replace(/\//g, '$');

      // remember to grab partial
      if (~partial.indexOf('/')) {
        toGet.push({
          safeKey: safePartialKey,
          path: partial
        });
      }

      return '{{> ' + safePartialKey + ' }}';
    });

    var compiled = _ractive2['default'].parse(repartial);

    if (toGet.length) {
      require(toGet.map(function (partial) {
        return partial.path;
      }), function () {
        for (var _len = arguments.length, parsed = Array(_len), _key = 0; _key < _len; _key++) {
          parsed[_key] = arguments[_key];
        }

        toGet.forEach(function (partial, i) {
          return _ractive2['default'].partials[partial.safeKey] = parsed[i];
        });
        done(compiled);
      });
    } else {
      done(compiled);
    }
  });
}

