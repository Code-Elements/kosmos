var form = require('./_form.js');

module.exports = function(Model, Params) {
	var module = {};
	var Publication = Model.Publication;

	module.index = function(req, res, next) {
		var id = req.params.publication_id;

		Publication.findById(id).exec(function(err, publication) {
			if (err) return next(err);

			res.render('admin/publications/edit.pug', { publication: publication });
		});
	};

	module.form = function(req, res, next) {
		var id = req.params.publication_id;

		Publication.findById(id).exec(function(err, publication) {
			if (err) return next(err);

			form(false, publication, req, res, next);
		});
	};

	return module;
};