var moment = require('moment');
var locale = require('../_params/locale');
var checkNested = locale.checkNested;
var getCollectionLocales = locale.getCollectionLocales;

module.exports = function(redirect, award, req, res, next) {
  var post = req.body;

  award.status = post.status;
  award.date = moment(post.date.date + 'T' + post.date.time.hours + ':' + post.date.time.minutes);
  award.year = post.year;

  var locales = getCollectionLocales(post);

  locales.forEach(function(locale) {
    checkNested(post, [locale, 'title'])
      && award.setPropertyLocalised('title', post[locale].title, locale);

    checkNested(post, [locale, 's_title'])
      && award.setPropertyLocalised('s_title', post[locale].s_title, locale);

    checkNested(post, [locale, 'place'])
      && award.setPropertyLocalised('place', post[locale].place, locale);
  });

  award.save(function(err, award) {
    if (err) return next(err);

    res.redirect(redirect);
  });
}