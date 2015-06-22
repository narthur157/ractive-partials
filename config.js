// RequireJS common config
// TODO: Use fewer relative paths
require.config({
  baseUrl: '../bower_components',
  paths: {
    es6: './requirejs-babel/es6',
    babel: './requirejs-babel/babel-4.6.6.min',
    ractive: 'ractive/ractive',
    rapr: '../dist/rapr',
    text: 'text/text',
    module: 'module/module'
  },
  config: {
    '../dist/rapr': {
      pathPrefix: '/tests/templates/'
    }
  },
  map: {
    '*': {
      rapr: '../dist/rapr'
    }
  }
});