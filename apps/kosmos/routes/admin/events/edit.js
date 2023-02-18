var form = require('./_form.js');

module.exports = function(Model, Params) {
	var module = {};
	var Event = Model.Event;

	module.index = function(req, res, next) {
		var id = req.params.event_id;

		Event.findById(id).exec(function(err, event) {
			if (err) return next(err);

			res.render('admin/events/edit.pug', { event: event });
		});

	};


	module.form = function(req, res, next) {
		var id = req.params.event_id;

		Event.findById(id).exec(function(err, event) {
			if (err) return next(err);

			form('back', event, req, res, next);
		});
	};


	return module;
};