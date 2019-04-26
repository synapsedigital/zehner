/**
 * jqBowser plugin.
 *
*  @class jqBowser
 * @requires Bowser
 * @requires jQuery
 */
;(function ($, window, document, undefined) {

  var pluginName = 'jqBowser';
  var defaults = {};
  var _this;

  function Plugin(element, options) {
    this.element = element;
    this.options = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      _this = this;
      _this.events();
    },
    events: function() {
      _this.addHtmlClasses();
    },
    addHtmlClasses: function() {
      var flags = Object.keys(bowser);

      if (flags.indexOf('mobile') === -1 && flags.indexOf('tablet') === -1) {
        $(_this.element).addClass('desktop');
      }

      if (flags && flags.length) {
        for (var i = 0; i < flags.length; i++) {
          if (bowser[flags[i]] === true) {
            $(_this.element).addClass(flags[i]);
          }
        }
      }
    }
  };

  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName,
        new Plugin(this, options));
      }
    });
  };

})(jQuery, window, document);
