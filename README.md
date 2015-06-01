# excludify

Excludify is a transform for browserify that lets you exclude modules by
wildcards and regex patterns.

## Installation

```sh
npm install --save-dev excludify
```

## Example

package.json:

```js
{
  "excludify": {
    "excludes": [
      "*.css",
      "*.less"
    ]
  }
}
```

Shell:

```sh
browserify index.js -t [ excludify --excludes "*.css" ] > bundle.js
```

Browserify API:

```js
var b = browserify();
b.transform(excludify, {
  excludes: [
    "*.css",
    // Regex is allowed
    /\.less$/
  ]
});
```
