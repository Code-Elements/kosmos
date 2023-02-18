var i18n = require('i18n');

module.exports.checkNested = function (obj, layers) {
	if (typeof layers == 'string') {
		layers = layers.split('.');
	}

	for (var i = 0; i < layers.length; i++) {
		if (!obj || !Object.hasOwnProperty.call(obj, layers[i])) {
			return false;
		}
		obj = obj[layers[i]];
	}
	return true;
};

// get collection locales
module.exports.getCollectionLocales = function(collection) {
  var result = i18n.getLocales().filter(function(locale) {
    return !!collection[locale];
  });

  return result || [i18n.getLocale()];
}