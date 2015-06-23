// RequireJS common config
// TODO: Use fewer relative paths
require.config({
  baseUrl: '../bower_components',
  paths: {
    es6: './requirejs-babel/es6',
    babel: './requirejs-babel/babel-4.6.6.min',
    ractive: 'ractive/ractive',
    rapr: '../dist/ractive-partials',
    text: 'text/text',
    module: 'module/module'
  },
  config: {
    '../dist/ractive-partials': {
      pathPrefix: '/samples/templates/'
    }
  },
  map: {
    '*': {
      'ractive-partials': '../dist/ractive-partials'
    }
  }
});