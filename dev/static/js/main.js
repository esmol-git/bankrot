$(document).ready(function () {
  svg4everybody({});



  $(".slider-main").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    asNavFor: ".slider-dots",
    fade: true,
    draggable: false,
  });
  $(".slider-dots").slick({
    slidesToShow: 6,
    slidesToScroll: 1,
    asNavFor: ".slider-main",
    // centerMode: true,
    focusOnSelect: true,
  });
});



jQuery(($) => {
  $(".select").on("click", ".select__head", function () {
    if ($(this).hasClass("open")) {
      $(this).removeClass("open");
      $(this).next().fadeOut();
    } else {
      $(".select__head").removeClass("open");
      $(".select__list").fadeOut();
      $(this).addClass("open");
      $(this).next().fadeIn();
    }
  });

  $(".select").on("click", ".select__item", function () {
    $(".select__head").removeClass("open");
    $(this).parent().fadeOut();
    $(this).parent().prev().text($(this).text());
    $(this).parent().prev().prev().val($(this).text());
  });

  $(document).click(function (e) {
    if (!$(e.target).closest(".select").length) {
      $(".select__head").removeClass("open");
      $(".select__list").fadeOut();
    }
  });
});

var sidebar = new StickySidebar("#sidebar", {
  containerSelector: "#main-content",
  innerWrapperSelector: ".sidebar__inner",
  topSpacing: 20,
});

// Полифилы

// forEach IE 11
if ("NodeList" in window && !NodeList.prototype.forEach) {
  console.info("polyfill for IE11");
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
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector;
  }
})();

//Array.form IE 11
if (!Array.from) {
  Array.from = function (object) {
    "use strict";
    return [].slice.call(object);
  };
}

const popupLinks = document.querySelectorAll(".popup-link");
const body = document.querySelector("body");
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
  for (let index = 0; index < popupLinks.length; index++) {
    const popupLink = popupLinks[index];
    popupLink.addEventListener("click", function (e) {
      const popupName = popupLink.getAttribute("href").replace("#", "");
      const curentPopup = document.getElementById(popupName);
      popupOpen(curentPopup);
      e.preventDefault();
    });
  }
}
const popupCloseIcon = document.querySelectorAll(".close-popup");
if (popupCloseIcon.length > 0) {
  for (let index = 0; index < popupCloseIcon.length; index++) {
    const el = popupCloseIcon[index];
    el.addEventListener("click", function (e) {
      popupClose(el.closest(".popup"));
      e.preventDefault();
    });
  }
}

function popupOpen(curentPopup) {
  if (curentPopup && unlock) {
    const popupActive = document.querySelector(".popup.open");
    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }
    curentPopup.classList.add("open");
    curentPopup.addEventListener("click", function (e) {
      if (!e.target.closest(".popup__content")) {
        popupClose(e.target.closest(".popup"));
      }
    });
  }
}

function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove("open");
    if (doUnlock) {
      bodyUnLock();
    }
  }
}

function bodyLock() {
  const lockPaddingValue =
    window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";

  if (lockPadding.length > 0) {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight = lockPaddingValue;
    }
  }
  body.style.paddingRight = lockPaddingValue;
  body.classList.add("lock");

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

function bodyUnLock() {
  setTimeout(function () {
    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = "0px";
      }
    }
    body.style.paddingRight = "0px";
    body.classList.remove("lock");
  }, timeout);

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

document.addEventListener("keydown", function (e) {
  if (e.which === 27) {
    const popupActive = document.querySelector(".popup.open");
    popupClose(popupActive);
  }
});

(function () {
  // проверяем поддержку
  if (!Element.prototype.closest) {
    // реализуем
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
(function () {
  // проверяем поддержку
  if (!Element.prototype.matches) {
    // определяем свойство
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector;
  }
})();

/*
			Опишите функцию setPlusIcon(), которая 
			- устанавливает для элементов li значок [+], 
				если этот элемент имеет вложенный список
			- регистрирует функцию aClick в качестве обработчика события onclick
				для всех ссылок
		*/
/*
			Запустите функцию setPlusIcon() при загрузке страницы
		*/
function setPlusIcon() {
  var li = document.getElementsByTagName("li");
  for (var k = 0; k <= li.length - 1; k++) {
    for (var i = 0; i <= li[k].children.length - 1; i++) {
      if (li[k].children[i].tagName == "UL") {
        li[k].children[i].parentElement.classList.add("with-list");
      }
    }
  }

  document.addEventListener("click", aClick, false);
}

document.addEventListener("DOMContentLoaded", setPlusIcon);
/*
			Опишите функцию aClick(), которая обрабатывает щелчок по ссылке
			1. Получите объект - ссылку, по которой был сделан щелчок 
			2. Найдите родительский li
			3. Найдите вложенный список
			4. Если вложенных списков нет - разрешите переход по ссылке
			5. Назначьте вложенному списку нужные свойства и поменяйте иконку
			6. Запретите переход по ссылке
		*/
function aClick(e) {
  if (e.target.tagName == "A") {
    var li = e.target.parentElement; //li

    for (var i = 0; i <= li.children.length - 1; i++) {
      if (li.children[i].tagName == "UL") {
        e.preventDefault();
        li.children[i].parentElement.classList.toggle("active");
      }
    }
  }
}

$('.datepicker-here').datepicker({
  autoClose: true
})