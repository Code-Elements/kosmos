$(function() {
	var translate = true;

	$(document)
		.on('click', '.forward', function() {
			var $snake = $(this).parent('.snake_outer').children('.snake');
			$snake.first().clone()
				.find('option').prop('selected', false).end()
				.find('.input').val('').end()
				.insertAfter($snake.last());
		})
		.on('click', '.back', function() {
			var $snake = $(this).closest('.snake_outer').children('.snake');
			if ($snake.length == 1) return false;
			$(this).parent('.snake').remove();
		})
		.on('scroll', function(event) {
			$(this).scrollTop() >= $('.menu_block').offset().top + $('.menu_block').height() + 11
				? $('.sub_menu_block').addClass('fixed')
				: $('.sub_menu_block').removeClass('fixed');
		});

	$('.toggle_eng').on('click', function() {
		translate = !translate;

		if (translate) {
			$('.en').prop('disabled', translate).filter('input').hide();
			$('.en').parent('.wysiwyg-container').hide();
			$('.en_img').prop('disabled', translate).hide();
			$('.ru').parent('.wysiwyg-container').removeAttr('style');
			$('.en').parent('.form_language-group').hide();
			$('.form_language-group').removeClass('show-translations');
		} else {
			$('.en').prop('disabled', translate).filter('input').show();
			$('.en').parent('.wysiwyg-container').show();
			$('.en_img').prop('disabled', translate).show();
			$('.en').parent('.form_language-group').show();
			$('.form_language-group').addClass('show-translations');
		}
	});

	$('.form_submit').on('click', function(event) {
		var $this = $(this);

		if ($this.data('timer')) return false;

		$this.data('timer', true);

		$('form').submit();

		setTimeout(function() {
			$this.data('timer', false);
		}, 3000);
	});

	$('.form_cancel').on('click', function(event) {
		location.reload();
	});

});