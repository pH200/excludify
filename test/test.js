var test = require('tape');
var ignorify = require('../');
var transformTools = require('browserify-transform-tools');

var content = {
  content: 'require("foo.css");require("bar.less");'
};

test("replace foo.css with wildcard pattern", function(t){
  t.plan(2);
  var transform = ignorify.configure({
    excludes: ['*.css']
  });

  transformTools.runTransform(transform, __filename, content, function (err, result) {
    t.equal(err, null);
    t.equal(result, '"use IGNORE require(\'foo.css\')";require("bar.less");');
    t.end();
  });
});

test("replace bar.less with regex", function(t){
  t.plan(2);
  var transform = ignorify.configure({
    excludes: [/\.less$/]
  });

  transformTools.runTransform(transform, __filename, content, function (err, result) {
    t.equal(err, null);
    t.equal(result, 'require("foo.css");"use IGNORE require(\'bar.less\')";');
    t.end();
  });
});

test("replace multiple requires", function(t){
  t.plan(2);
  var transform = ignorify.configure({
    excludes: [/./]
  });

  transformTools.runTransform(transform, __filename, content, function (err, result) {
    t.equal(err, null);
    t.equal(result, '"use IGNORE require(\'foo.css\')";"use IGNORE require(\'bar.less\')";');
    t.end();
  });
});

test("allow multiple patterns", function(t){
  t.plan(2);
  var transform = ignorify.configure({
    excludes: ['*.css', /\.less$/]
  });

  transformTools.runTransform(transform, __filename, content, function (err, result) {
    t.equal(err, null);
    t.equal(result, '"use IGNORE require(\'foo.css\')";"use IGNORE require(\'bar.less\')";');
    t.end();
  });
});

test("allow string for subargs usage", function(t){
  t.plan(2);
  var transform = ignorify.configure({
    excludes: '*.css'
  });

  transformTools.runTransform(transform, __filename, content, function (err, result) {
    t.equal(err, null);
    t.equal(result, '"use IGNORE require(\'foo.css\')";require("bar.less");');
    t.end();
  });
});
