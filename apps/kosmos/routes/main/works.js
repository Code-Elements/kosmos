var pug = require('pug');
var setLocaleFallback = require('./_localeFallback').setLocaleFallback;

module.exports = function(Model, Type) {
	var module = {};

	var Work = Model.Work;
	var Category = Model.Category;
	var type = Type;

	module.index = function(req, res) {
		res.render('main/works.pug', { type: type });
	};

	module.get_works = function(req, res) {
		var post = req.body;

		Category.findOne({ status: { $ne: 'hidden' }, sym: post.context.category }).exec(function(err, category) {

			var Query = category
				? Work.find({ 'type': type, 'categorys': category._id })
				: Work.find({ 'type': type });

			if (category && category.status == 'special') {
				Query.where('status').equals('special');
			} else {
				Query.where('status').equals('base');
			}

			
			Query.sort('-date').skip(+post.context.skip).limit(+post.context.limit).populate('categorys').exec(function(err, works) {
				works.map(function(work) {
					setLocaleFallback(work, [
						'title',
						's_title',
						'description',
						{categorys: ['title']}
					]);
				});

				var opts = {
					locale: req.locale,
					works: works,
					compileDebug: false, debug: false, cache: true, pretty: false
				};

				if (works && works.length > 0) {
					res.send(pug.renderFile(__app_root + '/views/main/_works.pug', opts));
				} else {
					res.send('end');
				}
			});
		});
	};

	module.work = function(req, res, next) {
		var user_id = req.session.user_id;
		var id = req.params.short_id;

		var Query = user_id
			? Work.findOne({ $or: [ { '_short_id': id }, { 'sym': id } ] })
			: Work.findOne({ $or: [ { '_short_id': id }, { 'sym': id } ] }).where('status').ne('hidden');;

		Query.populate('categorys').exec(function(err, work) {
			if (err || !work) return next(err);

			var images = work.images.reduce(function(prev, curr) {
				if (prev.length && curr.gallery == prev[prev.length - 1][0].gallery) {
					prev[prev.length - 1].push(curr);
				} else {
					prev.push([curr]);
				}

				return prev;
			}, []).reduce(function(prev, curr) {
				if (curr.some(function(item) { return item.gallery == true; }) && curr.length > 1) {
					return prev.concat([curr]);
				} else {
					return prev.concat(curr);
				}
			}, []);

			setLocaleFallback(work, [
				'title',
				's_title',
				'description',
				'client',
				'area',
				{files: ['description']},
				{images: ['description']},
				{categorys: ['title']}
			]);

			res.render('main/work.pug', { work: work, type: type, images: images });
		});
	};

	return module;
};