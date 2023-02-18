var shortid = require('shortid');
var form = require('./_form.js');

module.exports = function(Model, Params) {
	var module = {};
	var People = Model.People;

	module.index = function(req, res, next) {
		res.render('admin/peoples/add.pug');
	};


	module.form = function(req, res, next) {
		var people = new People();

		people._short_id = shortid.generate();
		
		form(true, people, req, res, next);
	};


	return module;
};