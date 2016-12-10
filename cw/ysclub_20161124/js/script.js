var App = App || {};

// ページの読み込み状態
(function($) {
    (function ($) {
        $(document).ready(function () {
            $('body').addClass('dom-loaded');
        });
        $(window).load(function () {
            $('body').addClass('content-loaded');
        });
        setTimeout(function () {
            $('body').addClass('content-loaded force-content-loaded');
        }, 2000);
    })($);
})(jQuery);


// タッチデバイス判定
(function ($) {
    $(document).ready(function () {
        if ('ontouchstart' in window || navigator.msMaxTouchPoints) {
            $('body').addClass('touch');
        } else {
            $('body').addClass('no-touch');
        }
    });
})(jQuery);


// モバイル判定（画面サイズ）
(function (_, $) {
    var $mobileDetect;

    _.mobile = false;

    function update() {
        if (!$mobileDetect || !$mobileDetect.length) {
            $mobileDetect = $('#mobile-detect');
        }

        _.mobile = $mobileDetect.is(':visible');
    }

    update();
    $(document).ready(update);
    $(window).on('load resize', update);
}(App, jQuery));


// ページスクロール判定
(function ($) {
    var $window = $(window);
    var $body = $('body');

    function update() {
        $body.toggleClass('page-scrolled', $window.scrollTop() > $window.height());
    }

    update();
    $(document).ready(update);
    $(window).on('load scroll resize', update);
}(jQuery));


// アンカースクロール
(function ($) {
    $(document).ready(function () {
        $('[data-smoothscroll][href^="#"]').on('click', function(e) {
            var $target = $(this.hash);

            if ($target.length) {
                e.preventDefault();
                $('html,body').animate({scrollTop: $target.offset().top}, 'slow');
            }
        });
    });
}(jQuery));


// 文字サイズ切り替え
(function($) {
    $(document).ready(function () {
        var $changer = $('.site-font-changer');
        var $buttons = $('a', $changer);
        var savedValue;

        $buttons.click(function () {
            var $button = $(this);
            var value = $button.data('value');

            $('html').css('font-size', value);

            $buttons.filter('.active').removeClass('active');
            $button.addClass('active');

            if (Cookies) {
                Cookies.set('fontsize', value, { expires: 30 });
            }
        });

        if (Cookies) {
            savedValue = Cookies.get('fontsize');

            if (savedValue) {
                $buttons.filter('[data-value="' + savedValue + '"]').click();
            }
        }
    });
})(jQuery);


// 画面サイズによる画像差し替え
(function (_, $) {
    function update() {
        $('img[data-desktop-src],img[data-mobile-src]').each(function () {
                var $img = $(this);
                var desktop = $img.data('desktop-src');
                var mobile = $img.data('mobile-src');

                $img.show();

                if (!_.mobile) {
                    if (desktop) {
                        if (!$img.hasClass('desktop-loaded')) {
                            $img.attr('src', desktop)
                                .removeClass('mobile-loaded')
                                .addClass('desktop-loaded')
                                .show();
                        }
                    } else {
                        $img.hide();
                    }
                } else {
                    if (mobile) {
                        if (!$img.hasClass('mobile-loaded')) {
                            $img.attr('src', mobile)
                                .removeClass('desktop-loaded')
                                .addClass('mobile-loaded')
                                .show();
                        }
                    } else {
                        $img.hide();
                    }
                }
        });
    }

    update();
    $(document).ready(update);
    $(window).on('load resize', update);
})(App, jQuery);


/**
 * メニュー開閉
*/
(function ($) {
    $(document).ready(function () {
        $('.site-menu-toggle').on('touchstart click', function (e) {
            e.stopPropagation();
            e.preventDefault();
            $('body').toggleClass('menu-opened');
            return false;
        });
    });
})(jQuery);


// タブ
(function($) {
    $(document).ready(function () {
        $('.tab-container').each(function () {
            var $container = $(this);
            var $tabs = $('.tab', $container);
            var $contents = $('.tab-content', $container);

            function selectTab($tab) {
                $tabs.filter('.active').removeClass('active');
                $tab.addClass('active');

                $contents.hide();
                $contents.filter($tab.attr('href')).show();
            }

            $tabs.click(function () {
                selectTab($(this));
                return false;
            });

            // Activate first tab
            selectTab($tabs.first());
        });
    });
})(jQuery);


// OwlCarousel共通
(function($) {
    $(window).load(function () {
        // ページロード後に強制リサイズ
        $('.owl-carousel').each(function () {
            var owl = $(this).data('owl.carousel');
            owl && owl.onResize();
        });
    });
})(jQuery);


// TOPビジュアルスクロール
(function($) {
    $(document).ready(function () {
        $(".home-hero-slider").simplyScroll({
            autoMode: 'loop',
            speed: 1,
            frameRate: 24,
            horizontal: true,
            pauseOnHover: false,
            pauseOnTouch: false
        });
    });
})(jQuery);


// TOP Pickup カルーセル
(function($) {
    $(document).ready(function () {
        $(".home-pickup-carousel").owlCarousel({
						autoplay : true,
						autoplayTimeout : 3000,
            items: 1,
            loop: true,
            nav: false,
            dots: true,
            margin: 10,
            center: false,
            responsiveClass: 'owl-responsive',
            responsive:{
                0: {
                    items: 1,
                    stagePadding: 50
                },
                768: {
                    items: 4,
                    margin: 20,
                    center: true
                },
                1600: {
                    items: 6,
                    center: true
                }
            }
        });
    });
})(jQuery);
