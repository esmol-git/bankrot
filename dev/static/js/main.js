$(document).ready(function () {
  svg4everybody({});
});

$('select.dropdown').each(function () {

  var dropdown = $('<div />').addClass('dropdown selectDropdown');

  $(this).wrap(dropdown);

  var label = $('<span />').text($(this).attr('placeholder')).insertAfter($(this));
  var list = $('<ul />');

  $(this).find('option').each(function () {
    list.append($('<li />').append($('<a />').text($(this).text())));
  });

  list.insertAfter($(this));

  if ($(this).find('option:selected').length) {
    label.text($(this).find('option:selected').text());
    list.find('li:contains(' + $(this).find('option:selected').text() + ')').addClass('active');
    $(this).parent().addClass('filled');
  }

});

$(document).on('click touch', '.selectDropdown ul li a', function (e) {
  e.preventDefault();
  var dropdown = $(this).parent().parent().parent();
  var active = $(this).parent().hasClass('active');
  var label = active ? dropdown.find('select').attr('placeholder') : $(this).text();

  dropdown.find('option').prop('selected', false);
  dropdown.find('ul li').removeClass('active');

  dropdown.toggleClass('filled', !active);
  dropdown.children('span').text(label);

  if (!active) {
    dropdown.find('option:contains(' + $(this).text() + ')').prop('selected', true);
    $(this).parent().addClass('active');
  }

  dropdown.removeClass('open');
});

$('.dropdown > span').on('click touch', function (e) {
  var self = $(this).parent();
  self.toggleClass('open');
});

$(document).on('click touch', function (e) {
  var dropdown = $('.dropdown');
  if (dropdown !== e.target && !dropdown.has(e.target).length) {
    dropdown.removeClass('open');
  }
});

$(function () {
  var $window = $(window);
  var $sidebar = $(".sidebar");
  var $sidebarTop = $sidebar.position().top;
  var $sidebarHeight = $sidebar.height();
  var $footer = $('.footer');
  var $footerTop = $footer.position().top;

  $window.scroll(function (event) {
    $sidebar.addClass("fixed");
    var $scrollTop = $window.scrollTop();
    var $topPosition = Math.max(0, $sidebarTop - $scrollTop);

    if ($scrollTop + $sidebarHeight > $footerTop) {
      var $topPosition = Math.min($topPosition, $footerTop - $scrollTop - $sidebarHeight);
    }

    $sidebar.css("top", $topPosition);
  });
});

// Полифилы

// forEach IE 11
if ('NodeList' in window && !NodeList.prototype.forEach) {
  console.info('polyfill for IE11');
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

// closest IE 11
(function () {
  if (!Element.prototype.closest) {
    Element.prototype.closest = function (css) {
      var node = this;
      while (node) {
        if (node.matches(css)) return node;
        else node = node.parentElement;
      }
      return null;
    };
  }
})();

// matches IE 11
(function () {
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.matchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector;
  }
})();

//Array.form IE 11
if (!Array.from) {
  Array.from = function (object) {
    'use strict';
    return [].slice.call(object);
  };
}
