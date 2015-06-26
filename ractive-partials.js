import Ractive from 'ractive';
import text from './text';
import module from 'module';

// Finds all '{{> partialName }}' in the template
let findPartial = /{{>\s?([^\s]+)\s?}}/gi;

export function load(modulePath, require, done) {
  var config = module.config(),
      delim = config.pathDelimeter || '$',
      extension = config.fileExtension || 'mustache',
      invalidDelims = "@#^&*()+<>\/\\|=;~`%.,{}[]";

  if (config.pathPrefix) {
    modulePath = `${config.pathPrefix}${modulePath}`;
  }

  if (modulePath.indexOf(`.${extension}`) !== -1) {
    throw new Error('Module path must not contain file extension');
  }

  for (let letter of invalidDelims) {
    if (delim.indexOf(letter) !== -1) {
      throw new Error("Path delimeter must not contain any of the following: " + invalidDelims.split('').join(' '));
    }
  }

  text.get(`${modulePath}.${extension}`, (text) => {
    let toGet = [];

    let repartial = text.replace(findPartial, function(match, partial) {
      // replace slash with $
      var safePartialKey = partial.replace(/\//g, delim);

      // remember to grab partial
      if (partial.indexOf('/') !== -1) {
        toGet.push({
          safeKey: safePartialKey,
          path: partial
        });
      }

      return `{{> ${safePartialKey} }}`;
    });

    let compiled = Ractive.parse(repartial);
    if (toGet.length) {
      require(toGet.map(({ path })  => `${module.id}!${path}`), function(...parsed) {
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
