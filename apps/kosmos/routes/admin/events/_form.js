var moment = require('moment');
var locale = require('../_params/locale');
var checkNested = locale.checkNested;
var getCollectionLocales = locale.getCollectionLocales;

module.exports = function(redirect, event, req, res, next) {
  var post = req.body;

  event.status = post.status;
  event.date = moment(post.date.date + 'T' + post.date.time.hours + ':' + post.date.time.minutes);
  event.year = post.year;
  event.link = post.link;

  var locales = getCollectionLocales(post);

  locales.forEach(function(locale) {
    checkNested(post, [locale, 'title'])
      && event.setPropertyLocalised('title', post[locale].title, locale);

    checkNested(post, [locale, 's_title'])
      && event.setPropertyLocalised('s_title', post[locale].s_title, locale);

    checkNested(post, [locale, 'place'])
      && event.setPropertyLocalised('place', post[locale].place, locale);
  });

  event.save(function(err, event) {
    if (err) return next(err);

    res.redirect(redirect);
  });
}