Load RactiveJS partials inside your templates
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

and in yourMustacheTemplate.mustache (.html extension is supported through the fileExtension config option)

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

Note: The default name for the plugin is ractive-partials, but the plugin can be used as `rap!someTemplate` by doing something like this in your config.js

```
  map: {
    '*': {
      rap: 'pathTo/ractive-partials'
    }
  }
```

An example of this is in the src folder

-------------------------------

To build: `npm run build`

If you don't have babel: npm install -g babel

-------------------------------

The samples folder contains two samples using the plug-in, one of which is a short text adventure that was hacked together and the other is
a basic test of functionality. You can switch between them by loading test.js instead of game.js and vice versa.

An easy way to run them is by running `python -m SimpleHTTPServer 8080` and then going to localhost:8080/samples
Note that if you just go to index.html in your filesystem you will get cross-origin request errors.




Some supported features

  - pathPrefix config option as used in this project's config.js which can prefix all paths
  - pathDelimeter config option to change the replacement character from '$' to another valid character or string
  - fileExtension config option, to tell ractive-partials what file extension to look for on templates

This plugin is currently missing a number of features including but certainly not limited to:

  - An implementation of requirejs's write method
