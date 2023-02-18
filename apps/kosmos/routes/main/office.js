var fs = require('fs');
var async = require('async');
var setLocaleFallback = require('./_localeFallback').setLocaleFallback;

module.exports = function(Model) {
	var module = {};

	var Award = Model.Award;
	var Publication = Model.Publication;
	var Event = Model.Event;
	var People = Model.People;

	module.index = function(req, res, next) {
		async.parallel({
			cv: function(callback) {
				fs.readFile(__app_root + '/static/cv_' + req.locale + '.html', 'utf8', function(err, content) {
					callback(null, content || '');
				});
			},
			cv_fallback: function(callback) {
				fs.readFile(__app_root + '/static/cv_en.html', 'utf8', function(err, content) {
					callback(null, content || '');
				});
			},
			image: function(callback) {
				fs.readFile(__app_root + '/static/image.html', 'utf8', function(err, content) {
					callback(null, content || '');
				});
			},
			desc: function(callback) {
				fs.readFile(__app_root + '/static/desc_' + req.locale + '.html', 'utf8', function(err, content) {
					callback(null, content || '');
				});
			},
			desc_fallback: function(callback) {
				fs.readFile(__app_root + '/static/desc_en.html', 'utf8', function(err, content) {
					callback(null, content || '');
				});
			},
			adress: function(callback) {
				fs.readFile(__app_root + '/static/adress_' + req.locale + '.html', 'utf8', function(err, content) {
					callback(null, content || '');
				});
			},
			adress_fallback: function(callback) {
				fs.readFile(__app_root + '/static/adress_en.html', 'utf8', function(err, content) {
					callback(null, content || '');
				});
			},
			awards: function(callback) {
				Award.where('status').ne('hidden').sort('-year').exec(callback);
			},
			press: function(callback) {
				Publication.where('status').ne('hidden').sort('-date').exec(callback);
			},
			peoples: function(callback) {
				People.where('status').ne('hidden').sort('date').exec(callback);
			},
			events: function(callback) {
				Event.where('status').ne('hidden').sort('-year').exec(callback);
			}
		}, function(err, results) {
			if (err) return next(err);

			results.cv = results.cv || results.cv_fallback;
			results.desc = results.desc || results.desc_fallback;
			results.adress = results.adress || results.adress_fallback;

			results.peoples.map(function(peoplesItem) {
				setLocaleFallback(peoplesItem, [
					'name',
					'description'
				])
			});

			results.press.map(function(pressItem) {
				setLocaleFallback(pressItem, [
					'title',
					's_title'
				])
			});

			results.awards.map(function(awardsItem) {
				setLocaleFallback(awardsItem, [
					'title',
					's_title',
					'place'
				])
			});

			results.events.map(function(eventsItem) {
				setLocaleFallback(eventsItem, [
					'title',
					's_title',
					'place'
				])
			});

			res.render('main/office.pug', results);
		});
	};

	return module;
};