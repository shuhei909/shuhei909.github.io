/**
 * Helper body classes
 */
(function () {
	$(document).ready(function () {
		$('body').addClass('document-ready');
	});

	$(window).load(function () {
		$('body').addClass('window-loaded');
	});
}());

/**
 * Mobile nav toggle
 */
jQuery(function ($) {
	$('.js__mobile-nav-toggle').click(function (e) {
		e.preventDefault();
		$('body').toggleClass('mobile-nav-open');
		return false;
	});
});

/**
 * Lazy loading
 */
(function () {
	if ($.fn.lazyload) {
		function init() {
			$("img.maybe").show().lazyload({
				skip_invisible: true,
				threshold: 100000
			});

			$("img.lazy").show().lazyload({
				skip_invisible: true,
				effect: "fadeIn",
				threshold: 200
			});
		}

		$(document).ready(init);
		$(window).load(init);
	}
}());

/**
 * Smooth anchor scroll
 */
(function ($) {
	$(document).ready(function () {
		$('.js__scrollto[href^="#"]').on('click', function(e) {
			var $target = $(this.hash);

			if ($target.length) {
				e.preventDefault();
				$('html,body').animate({scrollTop: $target.offset().top}, 'slow');
			}
		});
	});
}(jQuery));

/**
 * Pagetop
 */
(function ($) {
	$(document).ready(function () {
		var $window = $(window),
			$pagetop = $('#pagetop');

		$window.scroll(function () {
			$pagetop.toggleClass('active', $window.scrollTop() > $window.height());
		}).scroll();
	});
}(jQuery));

/**
 * Equal height columns
 */
(function ($) {
	var groups = {};

	// Collect element groups
	$(window).on('load', function () {
		$('[data-equal-height]').each(function () {
			var $element = $(this),
				group = $element.data('equal-height');
			
			if (groups[group] === undefined) {
				groups[group] = $element;
			} else {
				groups[group] = groups[group].add($element);
			}
		});
	});

	$(window).on('load resize', function () {
		$.each(groups, function(group, $elements) {
			var maxHeight = 0;

			$elements.css('height', '').each(function () {
				var $item = $(this),
					height = $item.outerHeight();
				
				if (height > maxHeight) {
					maxHeight = height;
				}
			}).outerHeight(maxHeight);
		});
	})
}(jQuery));


// Home hero slider
(function ($) {
	var $owl = $('.home-slider');

	$owl.owlCarousel({
		loop: true,
		margin: 0,
		nav: true,
		dots: false,
		items: 1,
		autoplay: true,
		autoplayTimeout: 5000,
		smartSpeed: 750,
		navText: ['', ''],
		navClass: ['owl-prev hover fa fa-angle-left', 'owl-next hover fa fa-angle-right']
	});
}(jQuery));
