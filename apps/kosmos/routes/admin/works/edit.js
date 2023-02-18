var form = require('./_form.js');

module.exports = function(Model, Params) {
	var module = {};
	var Work = Model.Work;
	var Category = Model.Category;
	var previewImages = Params.upload.preview;

	module.index = function(req, res, next) {
		var id = req.params.work_id;

		Work.findById(id).exec(function(err, work) {
			if (err) return next(err);

			Category.find().exec(function(err, categorys) {
				if (err) return next(err);

				previewImages(work.images, function(err, images_preview) {
					if (err) return next(err);

					res.render('admin/works/edit.pug', { work: work, categorys: categorys, images_preview: images_preview });
				});
			});
		});

	};


	module.form = function(req, res, next) {
		var id = req.params.work_id;

		Work.findById(id).exec(function(err, work) {
			if (err) return next(err);

			form(false, work, req, res, next);
		});
	};


	return module;
};