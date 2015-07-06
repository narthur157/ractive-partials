// RequireJS common config
// TODO: Use fewer relative paths
require.config({
  baseUrl: '../bower_components',
  paths: {
    ractive: 'ractive/ractive',
    rapr: '../dist/ractive-partials',
    text: 'text/text',
    module: 'module/module',
    templates: '../samples/templates'
  },
  config: {
    '../dist/ractive-partials': {
      pathPrefix: '/samples/templates/',
      pathDelimeter: '$',
      fileExtension: 'mustache'
    }
  },
  map: {
    '*': {
      rap: '../dist/ractive-partials'
    }
  }
});
