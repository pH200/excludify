var transformTools = require('browserify-transform-tools');
var wildcard = require('wildcard');

function makeIgnoreString(arg) {
  return '"use IGNORE require(\'%\')"'.replace('%', arg);
}

module.exports = transformTools.makeRequireTransform('excludify', {
  jsFilesOnly: true
}, function (args, opts, cb) {
  var ignores = opts.config ? opts.config.excludes : null;

  if (typeof ignores === 'string') {
    ignores = [ignores];
  }

  if (Array.isArray(ignores)) {
    for (var i = 0; i < ignores.length; i++) {
      var pattern = ignores[i];
      if (typeof pattern === 'string') {
        if (wildcard(pattern, args[0])) {
          return cb(null, makeIgnoreString(args[0]));
        }
      } else if (pattern instanceof RegExp) {
        if (pattern.test(args[0])) {
          return cb(null, makeIgnoreString(args[0]));
        }
      }
    }
  }

  return cb();
});
