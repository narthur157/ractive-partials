define(['exports', 'ractive', './text', 'module'], function (exports, _ractive, _text, _module2) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.load = load;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _Ractive = _interopRequireDefault(_ractive);

  var _text2 = _interopRequireDefault(_text);

  var _module3 = _interopRequireDefault(_module2);

  // Finds all '{{> partialName }}' in the template
  var findPartial = /{{>\s?([^\s]+?)\s?}}/gi;

  function load(modulePath, require, done) {
    var config = _module3['default'].config();
    var delim = config.pathDelimeter || '$';
    var extension = config.fileExtension || 'mustache';
    var prefix = config.pathPrefix || '';

    // prevent .mustache.mustache
    var extensionCheck = new RegExp('.' + extension + '$');
    modulePath = extensionCheck.test(modulePath) ? modulePath : '' + modulePath + '.' + extension;

    _text2['default'].get(require.toUrl(modulePath), function (text) {
      var toGet = [];

      var repartial = text.replace(findPartial, function (match, partial) {
        // replace slash with $
        var safePartialKey = partial.replace(/\//g, delim);

        // remember to grab partial
        if (partial.indexOf('/') !== -1) {
          toGet.push({
            safeKey: safePartialKey,
            path: partial
          });
        }

        return '{{> ' + safePartialKey + ' }}';
      });

      var compiled = _Ractive['default'].parse(repartial);
      if (toGet.length) {
        require(toGet.map(function (_ref) {
          var path = _ref.path;
          return '' + _module3['default'].id + '!' + prefix + '' + path;
        }), function () {
          for (var _len = arguments.length, parsed = Array(_len), _key = 0; _key < _len; _key++) {
            parsed[_key] = arguments[_key];
          }

          toGet.forEach(function (partial, i) {
            _Ractive['default'].partials[partial.safeKey] = parsed[i];
          });
          done(compiled);
        });
      } else {
        done(compiled);
      }
    });
  }
});
