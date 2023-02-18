var form = require('./_form.js');

module.exports = function(Model, Params) {
	var module = {};
	var People = Model.People;

	module.index = function(req, res, next) {
		var id = req.params.people_id;

		People.findById(id).exec(function(err, people) {
			if (err) return next(err);

			res.render('admin/peoples/edit.pug', { people: people });
		});
	};


	module.form = function(req, res, next) {
		var id = req.params.people_id;

		People.findById(id).exec(function(err, people) {
			if (err) return next(err);

			form(false, people, req, res, next);
		});
	};


	return module;
};