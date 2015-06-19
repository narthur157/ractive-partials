import Ractive from 'ractive';
import text from './text';
import module from 'module';
// Finds all '{{> partialName }}' in the template
let findPartial = /{{>\s?([^\s]+)\s?}}/gi;

export function load(moduleName, require, done) {

  require([`text!${moduleName}`], (text) => {

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
        partial => `${module.id}!${partial.path}`
      ), function(...parsed) {
        toGet.forEach((partial, i) => {
          Ractive.partials[partial.safeKey] = parsed[i];
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
