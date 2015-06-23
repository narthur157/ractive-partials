requirejs([
  'ractive',
  'ractive-partials!view',
  'ractive-partials!normalPartial'
], function (Ractive, view, normalPartial) {

  var instance = new Ractive({
    template: function() { return view; },
    partials: {
      'normalPartial': normalPartial
    },
    data: {
      x: 'Some data in a template',
      y: ' Data inside of an automatically resolved partial',
      z: ' Data inside of a normal partial parsed by ractive-partials'
    },
    el: '#container'
  });
});