var moment = require('moment');

var locale = require('../_params/locale');
var checkNested = locale.checkNested;
var getCollectionLocales = locale.getCollectionLocales;

var upload = require('../_params/upload');
var uploadImage = upload.image;
var uploadFile = upload.file;

module.exports = function(isAddMode, people, req, res, next) {
  var post = req.body;
  var files = req.files;

  var addModeOptions = {
    photo_del: null,
    attach_cv_del: null,
    redirect: '/admin/peoples',
  }

  var editModeOptions = {
    photo_del: post.photo_del,
    attach_cv_del: post.attach_cv_del,
    redirect: 'back',
  }

  var modeOptions = isAddMode ? addModeOptions : editModeOptions;

  people.status = post.status;
  people.type = post.type;
  people.link = post.link;
  people.sym = post.sym ? post.sym : undefined;
  people.date = moment(post.date.date + 'T' + post.date.time.hours + ':' + post.date.time.minutes);

  var locales = getCollectionLocales(post);

  locales.forEach(function(locale) {
    checkNested(post, [locale, 'name'])
      && people.setPropertyLocalised('name', post[locale].name, locale);

    checkNested(post, [locale, 'description'])
      && people.setPropertyLocalised('description', post[locale].description, locale);
  });

  uploadImage(people, 'peoples', 'photo', 400, files.photo && files.photo[0], modeOptions.photo_del, function(err, people) {
    if (err) return next(err);

    uploadFile(people, 'peoples', 'attach_cv', files.attach_cv && files.attach_cv[0], modeOptions.attach_cv_del, function(err, people) {
      if (err) return next(err);

      people.save(function(err, people) {
        if (err) return next(err);

        res.redirect(modeOptions.redirect);
      });
    });
  });
}