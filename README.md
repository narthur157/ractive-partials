Including every partial your templates might need is a pain.

That's why we use ractive-partials.


Instead of

in yourJavascriptFile.js:

require(['originalTemplate', 'templates/long/path/to/your/parital'], function(originalTemplate, partial) {
  var ractive = new Ractive({
    /* your options and such */
    template: originalTemplate,
  })
  ractive.partials['partial'] = partial;
});

and in yourMustacheTemplate.mustache (.html currently not supported)

{{>partial}}

You can instead do:

in yourJavascriptFile.js:

require(['ractive-partials!originalTemplate'], function(originalTemplate) {
  var ractive = new Ractive({
    /* your options and such */
    template: originalTemplate,
  })
});

{{>templates/long/path/to/your/partial}}

This is great, because now we don't have to worry about updating your javascript every time your template changes! Yes!

To build: babel --module amd rapr.js > dist/rapr.js

If you don't have babel: npm install -g babel


Changelog:

Test folder has been re-named to samples to better its contents.

Some supported features

  - pathPrefix config option as used in this project's config.js which can prefix all paths
  - more to come

This plugin is currently missing a number of features including but certainly not limited to:

  - Support for template paths other than the one given by pathPrefix or from root
  - An implementation of requirejs's write method
