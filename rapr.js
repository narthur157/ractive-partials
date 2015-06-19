import Ractive from 'ractive';

// Finds all '{{> partialName }}' in the template
let findPartial = /{{>\s?([^\s]+)\s?}}/gi;

export function load(moduleName, require, done) {
  var requireMod = [];
  requireMod.push(`text!${moduleName}`);
  // TODO: Why was [`text!${moduleName}`] not producing an array? (babel is suspect)
  require(requireMod, (text) => {

    let toGet = [];

    let repartial = text.replace(findPartial, function(match, partial) {
      // replace slash with $
      var safePartialKey = partial.replace(/\//g, '$');

      // remember to grab partial
      if (~partial.indexOf('/')) {
        toGet.push({
          safeKey: safePartialKey,
          path: `${partial}.mustache`
        });
      }

      return `{{> ${safePartialKey} }}`;
    });

    let compiled = Ractive.parse(repartial);
    if (toGet.length) {
      require(toGet.map(
        partial => `text!${partial.path}`
      ), function(...parsed) {
        toGet.forEach((partial, i) => {
          Ractive.partials[partial.safeKey] = Ractive.parse(parsed[i]);
          console.log(partial);
        });
        done(compiled);
      });
    }
    else {
      done(compiled);
    }
  });
}
