var shortid = require('shortid');
var form = require('./_form.js');

module.exports = function(Model, Params) {
	var module = {};
	var Work = Model.Work;
	var Category = Model.Category;

	module.index = function(req, res, next) {
		Category.find().exec(function(err, categorys) {
			if (err) return next(err);

			res.render('admin/works/add.pug', { categorys: categorys });
		});
	};


	module.form = function(req, res, next) {
		var work = new Work();

		work._short_id = shortid.generate();
		
		form(true, work, req, res, next);
	};


	return module;
};