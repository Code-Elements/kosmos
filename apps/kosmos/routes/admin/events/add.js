var shortid = require('shortid');
var form = require('./_form.js');

module.exports = function(Model, Params) {
	var module = {};
	var Event = Model.Event;

	module.index = function(req, res, next) {
		res.render('admin/events/add.pug');
	};


	module.form = function(req, res, next) {
		var event = new Event();

		event._short_id = shortid.generate();

		form('/admin/events', event, req, res, next);
	};


	return module;
};