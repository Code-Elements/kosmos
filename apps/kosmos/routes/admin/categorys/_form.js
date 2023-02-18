var locale = require('../_params/locale');
var checkNested = locale.checkNested;
var getCollectionLocales = locale.getCollectionLocales;

module.exports = function(redirect, category, req, res, next) {
  var post = req.body;

  category.status = post.status;

  if (post.sym == '') {
    return next(new Error('Synonym field is required!'));
  }

  if (/\s/g.test(post.sym)) {
    return next(new Error('Synonym should not include spaces!'));
  }

  category.sym = post.sym && post.sym.toLowerCase();

  var locales = getCollectionLocales(post);

  locales.forEach(function(locale) {
    checkNested(post, [locale, 'title'])
      && category.setPropertyLocalised('title', post[locale].title, locale);
  });

  category.save(function(err, category) {
    if (err) return next(err);

    res.redirect(redirect);
  });
}