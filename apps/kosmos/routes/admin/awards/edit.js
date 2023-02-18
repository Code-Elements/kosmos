var form = require('./_form.js');

module.exports = function(Model, Params) {
	var module = {};
	var Award = Model.Award;

	module.index = function(req, res, next) {
		var id = req.params.award_id;

		Award.findById(id).exec(function(err, award) {
			if (err) return next(err);

			res.render('admin/awards/edit.pug', { award: award });
		});

	};


	module.form = function(req, res, next) {
		var id = req.params.award_id;

		Award.findById(id).exec(function(err, award) {
			if (err) return next(err);

			form('back', award, req, res, next);
		});
	};


	return module;
};