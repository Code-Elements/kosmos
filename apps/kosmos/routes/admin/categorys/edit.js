var form = require('./_form.js');

module.exports = function(Model, Params) {
	var module = {};
	var Category = Model.Category;

	module.index = function(req, res, next) {
		var id = req.params.id;

		Category.findById(id).exec(function(err, category) {
			if (err) return next(err);

			res.render('admin/categorys/edit.pug', {category: category});
		});
	};


	module.form = function(req, res, next) {
		var id = req.params.id;

		Category.findById(id).exec(function(err, category) {
			if (err) return next(err);
						
			form('back', category, req, res, next);
		});
	};


	return module;
};