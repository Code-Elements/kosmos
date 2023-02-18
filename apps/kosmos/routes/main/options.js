var sitemap = require('sitemap');

module.exports = function(Model, Params) {
	var module = {};

	var Work = Model.Work;


	module.sitemap = function(req, res, next) {
		var sm_stream = new sitemap.SitemapStream({ hostname: 'https://' + req.hostname });
		var links = [
			{ url: '/' },
			{ url: '/office' },
		];

		links.forEach(function(link) {
			sm_stream.write(link);
		});

		Work.where('status').ne('hidden').exec(function(err, works) {
			works.forEach(function(work) {
				sm_stream.write({ url: '/' + work.type.replace('project', 'projects') + '/' + work._short_id });
			});

			sm_stream.end();
		});

		sm_stream.pipe(res).on('error', function(err) {
			return next(err);
		});
	};


	return module;
};