var shortid = require('shortid');
var form = require('./_form.js');

module.exports = function(Model, Params) {
	var module = {};
	var Award = Model.Award;

	module.index = function(req, res, next) {
		res.render('admin/awards/add.pug');
	};


	module.form = function(req, res, next) {
		var award = new Award();

		award._short_id = shortid.generate();

		form('/admin/awards', award, req, res, next);
	};


	return module;
};