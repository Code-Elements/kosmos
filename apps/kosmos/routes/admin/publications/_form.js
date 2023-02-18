var moment = require('moment');

var locale = require('../_params/locale');
var checkNested = locale.checkNested;
var getCollectionLocales = locale.getCollectionLocales;

var upload = require('../_params/upload');
var uploadImage = upload.image;
var uploadFile = upload.file;

module.exports = function(isAddMode, publication, req, res, next) {
  var post = req.body;
  var files = req.files;

  var addModeOptions = {
    poster_del: null,
    attach_del: null,
    redirect: '/admin/publications',
  }

  var editModeOptions = {
    poster_del: post.poster_del,
    attach_del: post.attach_del,
    redirect: 'back',
  }

  var modeOptions = isAddMode ? addModeOptions : editModeOptions;

  publication.status = post.status;
  publication.date = moment(post.date.date + 'T' + post.date.time.hours + ':' + post.date.time.minutes);
  publication.year = post.year;
  publication.link = post.link;

  var locales = getCollectionLocales(post);

  locales.forEach(function(locale) {
    checkNested(post, [locale, 'title'])
      && publication.setPropertyLocalised('title', post[locale].title, locale);

    checkNested(post, [locale, 's_title'])
      && publication.setPropertyLocalised('s_title', post[locale].s_title, locale);
  });

  uploadImage(publication, 'publications', 'poster', 600, files.poster && files.poster[0], modeOptions.poster_del, function(err, publication) {
    if (err) return next(err);

    uploadFile(publication, 'publications', 'attach', files.attach && files.attach[0], modeOptions.attach_del, function(err, publication) {
      if (err) return next(err);

      publication.save(function(err, publication) {
        if (err) return next(err);

        res.redirect(modeOptions.redirect);
      });
    });
  });
}