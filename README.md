Including every partial your templates might from your ractive code need is a pain.

That's why we use ractive-partials.
-------------------------------


Instead of doing this:

in yourJavascriptFile.js:

```
require(['originalTemplate', 'templates/long/path/to/your/parital'], function(originalTemplate, partial) {
  var ractive = new Ractive({
    /* your options and such */
    template: originalTemplate,
  })
  ractive.partials['partial'] = partial;
});
```

and in yourMustacheTemplate.mustache (.html currently not supported)

`{{>partial}}`

You can instead do:

in yourJavascriptFile.js:

```
require(['ractive-partials!originalTemplate'], function(originalTemplate) {
  var ractive = new Ractive({
    /* your options and such */
    template: originalTemplate,
  })
});
```

in yourTemplate.mustache:

`{{>templates/long/path/to/your/partial}}`

This is great, because now we don't have to worry about updating your javascript every time your template changes! Yes!

-------------------------------

To build: `babel --module amd rapr.js > dist/rapr.js`

If you don't have babel: npm install -g babel

-------------------------------

The samples folder contains two samples using the plug-in, one of which is a short text adventure that was hacked together and the other is
a basic test of functionality. You can switch between them by loading test.js instead of game.js and vice versa.

As far as testing that the plug-in is not completely broken goes, loading either of these and checking the console for
errors will make sure it works at least a little bit, though nothing beyond that.

An easy way to run them is by running `python -m SimpleHTTPServer 8080` and then going to localhost:8080/samples
Note that if you just go to index.html you will get cross-origin request errors.




Some supported features

  - pathPrefix config option as used in this project's config.js which can prefix all paths
  - more to come

This plugin is currently missing a number of features including but certainly not limited to:

  - Support for template paths other than the one given by pathPrefix or from root
  - An implementation of requirejs's write method
