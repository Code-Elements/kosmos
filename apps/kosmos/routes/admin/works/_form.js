var moment = require('moment');
var async = require('async');

var locale = require('../_params/locale');
var checkNested = locale.checkNested;
var getCollectionLocales = locale.getCollectionLocales;

var upload = require('../_params/upload');
var uploadImages = upload.images;
var uploadImage = upload.image;
var filesUpload = upload.files_upload;
var filesDelete = upload.files_delete;

var helpers = require('../_params/helpers');
var youtubeId = helpers.youtubeId;
var vimeoId = helpers.vimeoId;

module.exports = function(isAddMode, work, req, res, next) {
  var post = req.body;
  var files = req.files;

  var addModeOptions = {
    hold: null,
    poster_del: null,
    poster_column_del: null,
    redirect: '/admin/works',
  }

  var editModeOptions = {
    hold: post.hold,
    poster_del: post.poster_del,
    poster_column_del: post.poster_column_del,
    redirect: 'back',
  }

  var modeOptions = isAddMode ? addModeOptions : editModeOptions;

  work.status = post.status;
  work.date = moment(post.date.date + 'T' + post.date.time.hours + ':' + post.date.time.minutes);
  work.categorys = post.categorys.filter(function(category) { return category != 'none'; });
  work.year = post.year;
  work.type = post.type;
  work.sym = post.sym ? post.sym : undefined;

  if (youtubeId(post.embed)) {
    work.embed = {
      provider: 'youtube',
      id: youtubeId(post.embed)
    }
  } else if (vimeoId(post.embed)) {
    work.embed = {
      provider: 'vimeo',
      id: vimeoId(post.embed)
    }
  } else {
    work.embed = undefined;
  }

  var locales = getCollectionLocales(post);

  locales.forEach(function(locale) {
    checkNested(post, [locale, 'title'])
      && work.setPropertyLocalised('title', post[locale].title, locale);

    checkNested(post, [locale, 's_title'])
      && work.setPropertyLocalised('s_title', post[locale].s_title, locale);

    checkNested(post, [locale, 'area'])
      && work.setPropertyLocalised('area', post[locale].area, locale);

    checkNested(post, [locale, 'client'])
      && work.setPropertyLocalised('client', post[locale].client, locale);

    checkNested(post, [locale, 'description'])
      && work.setPropertyLocalised('description', post[locale].description, locale);

  });

  async.series([
    async.apply(uploadImages, work, 'works', modeOptions.hold, post.images),
    async.apply(uploadImage, work, 'works', 'poster', 600, files.poster && files.poster[0], modeOptions.poster_del),
    async.apply(uploadImage, work, 'works', 'poster_column', 600, files.poster_column && files.poster_column[0], modeOptions.poster_column_del),
    async.apply(filesDelete, work, 'files', post, files),
    async.apply(filesUpload, work, 'works', 'files', post, files),
  ], function(err, results) {
    if (err) return next(err);

    work.save(function(err, work) {
      if (err) return next(err);

      res.redirect(modeOptions.redirect);
    });
  });
}