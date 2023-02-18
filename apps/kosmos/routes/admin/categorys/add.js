var shortid = require('shortid');
var form = require('./_form.js');

module.exports = function(Model, Params) {
	var module = {};
	var Category = Model.Category;

	module.index = function(req, res) {
		res.render('admin/categorys/add.pug');
	};

	module.form = function(req, res, next) {
		var category = new Category();

		category._short_id = shortid.generate();

		form('/admin/categorys', category, req, res, next);
	};

	return module;
};