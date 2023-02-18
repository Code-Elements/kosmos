var shortid = require('shortid');
var form = require('./_form.js');

module.exports = function(Model, Params) {
	var module = {};
	var Publication = Model.Publication;

	module.index = function(req, res, next) {
		res.render('admin/publications/add.pug');
	};


	module.form = function(req, res, next) {
		var publication = new Publication();

		publication._short_id = shortid.generate();

		form(true, publication, req, res, next);
	};


	return module;
};