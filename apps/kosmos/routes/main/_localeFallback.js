var i18n = require('i18n');
var locales = i18n.getLocales();
var fallbackLang = 'en';

module.exports.setLocaleFallback = function(obj, params = []) {
	checkParams(params, obj);
}

function checkParams(params, obj) {
  params.forEach(function(param) {
    if(typeof param == 'string') {
      let fallbackElement = obj[param].find(function(element) {return element.lg == fallbackLang});

      if(fallbackElement) {
        obj[param].forEach(function(element) {
          element.value = element.value || fallbackElement.value;
        });

        locales.forEach(function(locale) {
          var translation = obj[param].find(function(element) {return element.lg == locale});

          if(!translation) {
            obj[param].push({
              lg: locale,
              value: fallbackElement.value
            });
          }
        })
      }
    } else {
      for (level1 in param) {
        if(param.hasOwnProperty(level1)) {
          obj[level1].forEach(function(element) {
            checkParams(param[level1], element);
          })
        }
      }	
    }
  });
}