
(function($) {
  $(function() {
    var $header = $('.header');
    // Nav Fixed
    $(window).scroll(function() {
      if ($(window).scrollTop() > 350) {
        $header.addClass('fixed');
      } else {
    $header.removeClass('fixed');
      }
    });
    // Nav Toggle Button
    $('.js_nav_toggle').click(function(){
      $header.toggleClass('open');
    });
  });
})(jQuery);
