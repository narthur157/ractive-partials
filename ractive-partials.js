import Ractive from 'ractive';
import text from './text';
import module from 'module';

// Finds all '{{> partialName }}' in the template
let findPartial = /{{>\s?([^\s]+)\s?}}/gi;

export function load(modulePath, require, done, config) {
  // TODO: Support relative paths from '.'
  var raprConfig = module.config();

  // TODO: Support paths that don't use the prefix
  if (modulePath.charAt(0) !== '/') {
    if (raprConfig.pathPrefix) {
      modulePath = `${raprConfig.pathPrefix}${modulePath}`;
    }
  }

  if (modulePath) {
    require([`text!${modulePath}.mustache`], (text) => {

      let toGet = [];

      let repartial = text.replace(findPartial, function(match, partial) {
        // replace slash with $
        var safePartialKey = partial.replace(/\//g, '$');

        // remember to grab partial
        if (~partial.indexOf('/')) {
          toGet.push({
            safeKey: safePartialKey,
            path: partial
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
          });
          done(compiled);
        });
      }
      else {
        done(compiled);
      }
    });
  }
}