var fs = require('fs');
var async = require('async');
var Upload = require('./_params/upload');

exports.edit = function(req, res) {
	async.series({
		link: function(callback) {
			fs.readFile(__app_root + '/static/link.html', 'utf8', callback);
		},
		cv_ru: function(callback) {
			fs.readFile(__app_root + '/static/cv_ru.html', 'utf8', callback);
		},
		cv_en: function(callback) {
			fs.readFile(__app_root + '/static/cv_en.html', 'utf8', callback);
		},
		cv_fr: function(callback) {
			fs.readFile(__app_root + '/static/cv_fr.html', 'utf8', callback);
		},
		cv_de: function(callback) {
			fs.readFile(__app_root + '/static/cv_de.html', 'utf8', callback);
		},
		desc_ru: function(callback) {
			fs.readFile(__app_root + '/static/desc_ru.html', 'utf8', callback);
		},
		desc_en: function(callback) {
			fs.readFile(__app_root + '/static/desc_en.html', 'utf8', callback);
		},
		desc_fr: function(callback) {
			fs.readFile(__app_root + '/static/desc_fr.html', 'utf8', callback);
		},
		desc_de: function(callback) {
			fs.readFile(__app_root + '/static/desc_de.html', 'utf8', callback);
		},
		adress_ru: function(callback) {
			fs.readFile(__app_root + '/static/adress_ru.html', 'utf8', callback);
		},
		adress_en: function(callback) {
			fs.readFile(__app_root + '/static/adress_en.html', 'utf8', callback);
		},
		adress_fr: function(callback) {
			fs.readFile(__app_root + '/static/adress_fr.html', 'utf8', callback);
		},
		adress_de: function(callback) {
			fs.readFile(__app_root + '/static/adress_de.html', 'utf8', callback);
		},
		image: function(callback) {
			fs.readFile(__app_root + '/static/image.html', 'utf8', callback);
		}
	}, function(err, results) {
		res.render('admin/cv.pug', { content: results });
	});
};

exports.edit_form = function(req, res, next) {
	var post = req.body;
	var file = req.file;

	async.series({
		link: function(callback) {
			fs.writeFile(__app_root + '/static/link.html', post.link || '', callback);
		},
		cv_ru: function(callback) {
			fs.writeFile(__app_root + '/static/cv_ru.html', post.cv.ru || '', callback);
		},
		cv_en: function(callback) {
			fs.writeFile(__app_root + '/static/cv_en.html', post.cv.en || '', callback);
		},
		cv_fr: function(callback) {
			fs.writeFile(__app_root + '/static/cv_fr.html', post.cv.fr || '', callback);
		},
		cv_de: function(callback) {
			fs.writeFile(__app_root + '/static/cv_de.html', post.cv.de || '', callback);
		},
		desc_ru: function(callback) {
			fs.writeFile(__app_root + '/static/desc_ru.html', post.desc.ru || '', callback);
		},
		desc_en: function(callback) {
			fs.writeFile(__app_root + '/static/desc_en.html', post.desc.en || '', callback);
		},
		desc_fr: function(callback) {
			fs.writeFile(__app_root + '/static/desc_fr.html', post.desc.fr || '', callback);
		},
		desc_de: function(callback) {
			fs.writeFile(__app_root + '/static/desc_de.html', post.desc.de || '', callback);
		},
		adress_ru: function(callback) {
			fs.writeFile(__app_root + '/static/adress_ru.html', post.adress.ru || '', callback);
		},
		adress_en: function(callback) {
			fs.writeFile(__app_root + '/static/adress_en.html', post.adress.en || '', callback);
		},
		adress_fr: function(callback) {
			fs.writeFile(__app_root + '/static/adress_fr.html', post.adress.fr || '', callback);
		},
		adress_de: function(callback) {
			fs.writeFile(__app_root + '/static/adress_de.html', post.adress.de || '', callback);
		},
		image: function(callback) {
			if (!post.image && !file && !post.image_del) return callback(null);
			
			var uploadImage = Upload.image;

			uploadImage({_id: 'office', field_name: 'image'}, 'cv', 'image', 508, file, post.image_del, function(err, elem) {
				if (err) return next(err);

				var img = post.image_del === 'on' ? '' : '<img src="' + elem.image + '" alt="" />';
			
				fs.writeFile(__app_root + '/static/image.html', img, callback);
			});
		}
	}, function(err, results) {
		res.redirect('back');
	});
};