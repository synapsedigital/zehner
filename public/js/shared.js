(function($) {
  'use strict';

  function init() {
    $('html').jqBowser();

    // Hide sub menu onLoad.
    $('.sub-menu-wrap').hide();

    // Display sub menu on click to support mobile and desktop.
    $('.shop-anchor').click(function() {
      $('.sub-menu-wrap').slideToggle("fast");
    });
  }

  $(function() {
    init();
  });
})(jQuery);
