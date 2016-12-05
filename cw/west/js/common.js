// Global
var App = App || {};
(function () {
	App.scrollTo = function (selector, animate, offset) {
		var $target = $(selector);

		if ($target.length) {
			$('html,body').animate({scrollTop: $target.offset().top - (offset | 0)}, animate ? 'slow' : 0);
			return true;
		} else {
			return false;
		}
	};
}(App, jQuery));


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
	$(document).ready(function () {
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


/**
 * Equal height columns by child selector
 */
(function ($) {
	var groups = {};

	// Collect element groups
	$(document).ready(function () {
		$('[data-equal-height-children]').each(function () {
			var $element = $(this),
				selector = $element.data('equal-height-children');

			groups[selector] = $(selector);
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


/**
 * Tabs
 */
(function ($) {
	$(document).ready(function () {
		$('.tab-container').each(function () {
			var $container = $(this);
			var $navs = $('.tab-nav a', $container);
			var $contents = $('.tab-content', $container);

			$navs.click(function () {
				var $nav = $(this);
				$navs.filter('.active').removeClass('active');
				$nav.addClass('active');

				$contents.filter('.active').removeClass('active').hide();
				$contents.filter($nav.attr('href')).addClass('active').show();
				App.scrollTo($container, true);

				return false;
			});

			// init
			$navs.filter('.active').click();
		});
	});
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


// Home recent items
(function ($) {
	var initialized = false;
	var $owl = $('.home-recent-list');

	function destroyOwlCarousel($owl) {
		$owl.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
		$owl.find('.owl-stage-outer').children().unwrap();
		$owl.find('.home-recent-item').css('min-height', '');
		initialized = false;
	}

	function initOwlCarousel($owl) {
		$owl.owlCarousel({
			loop: true,
			margin: 0,
			nav: true,
			dots: false,
			items: 5,
			autoplay: true,
			autoplayTimeout: 3000,
			rtl: true,
			navText: ['', ''],
			navClass: ['owl-prev hover', 'owl-next hover'],
			responsive: {
				0: {
					items: 4
				},
				900: {
					items: 5
				}
			}
		});
		initialized = true;
	}

	function matchItemHeight($owl) {
		var maxHeight = 0;
		$owl.find('.home-recent-item').each(function () {
			var height = $(this).outerHeight();
			if (height > maxHeight) {
				maxHeight = height;
			}
		}).css('min-height', maxHeight);
	}

	initOwlCarousel($owl);
	matchItemHeight($owl);
}(jQuery));


// Purchase Category Product slider
(function ($) {
	var $owl = $('.purchase-product-slider');

	$owl.owlCarousel({
		loop: true,
		margin: 20,
		nav: true,
		dots: false,
		items: 5,
		autoplay: true,
		autoplayTimeout: 5000,
		smartSpeed: 750,
		navText: ['', ''],
		navClass: ['owl-prev hover', 'owl-next hover']
	});
}(jQuery));


(function ($) {
	$(".document-sidebar").stick_in_parent({
		
	});
}(jQuery));