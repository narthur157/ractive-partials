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
  var findPartial = /{{>\s?([^\s]+)\s?}}/gi;

  function load(modulePath, require, done) {
    var defaultDelim = '$';
    var config = _module3['default'].config(),
        extension = config.fileExtension || 'mustache',
        invalidDelims = '@#^&*()+<>/\\|=;~`%.,{}[]';

    if (config.pathPrefix) {
      modulePath = '' + config.pathPrefix + '' + modulePath;
    }

    // if config.pathDelimeter is invalid, reset to default
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = invalidDelims[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var letter = _step.value;

        if (config.pathDelimeter.indexOf(letter) !== -1) {
          console.warn('Invalid config.pathDelimeter value: ' + delim + ' replaced by ' + defaultDelim);
          // changing config.pathDelimeter prevents from getting this warning multiple times
          config.pathDelimeter = defaultDelim;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    var delim = config.pathDelimeter;
    // prevent .mustache.mustache
    modulePath.replace('.' + extension + '$', '');

    _text2['default'].get('' + modulePath + '.' + extension, function (text) {
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
          return '' + _module3['default'].id + '!' + path;
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

