/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const forms = () => {
  const form = document.querySelectorAll('form'),
    inputs = document.querySelectorAll('input'),
    textarea = document.querySelectorAll('textarea');
  const message = {
    loading: 'Загрузка...',
    success: 'Спасибо! скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
  };
  const postData = async (url, data) => {
    document.querySelector('.status').textContent = message.loading;
    let res = await fetch(url, {
      method: 'POST',
      body: data
    });
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.text();
  };
  const clearInputs = () => {
    inputs.forEach(item => {
      item.value = '';
    });
    textarea.forEach(item => {
      item.value = '';
    });
  };
  form.forEach(item => {
    item.addEventListener('submit', e => {
      e.preventDefault();
      let statusMessage = document.createElement('div');
      let lastBtn = item.querySelector('button');
      statusMessage.classList.add('status', 'button', 'button__success');
      statusMessage.setAttribute('id', 'quest_submit');
      statusMessage.style.cssText = `
            text-align: center;
            margin-top: 12px;
            margin-bottom: 13px;
            `;
      lastBtn.replaceWith(statusMessage);
      const formData = new FormData(item);
      postData('assets/server.php', formData).then(res => {
        console.log(res);
        statusMessage.textContent = message.success;
      }).catch(error => {
        statusMessage.textContent = message.failure;
        statusMessage.style.cssText = `background-color: red`;
      }).finally(() => {
        clearInputs();
        setTimeout(() => {
          statusMessage.replaceWith(lastBtn);
        }, 5000);
      });
    });
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./src/js/modules/hamburger.js":
/*!*************************************!*\
  !*** ./src/js/modules/hamburger.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const hamburger = () => {
  const menu = document.querySelector('.menu_mobile'),
    menuItem = document.querySelectorAll('.menu_item'),
    hamburger = document.querySelector('.hamburger');
  hamburger.addEventListener('click', () => {
    toggleHamburger();
  });
  function toggleHamburger() {
    if (menu.classList.contains('menu_mobile__activate')) {
      document.body.style.overflow = '';
    } else {
      document.body.style.overflow = 'hidden';
    }
    hamburger.classList.toggle('show');
    menu.classList.toggle('menu_mobile__activate');
  }
  menuItem.forEach(item => {
    item.addEventListener('click', () => {
      hamburger.classList.toggle('show');
      menu.classList.toggle('menu_mobile__activate');
    });
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (hamburger);

/***/ }),

/***/ "./src/js/modules/mask.js":
/*!********************************!*\
  !*** ./src/js/modules/mask.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const mask = selector => {
  let setCursorPosition = (pos, elem) => {
    elem.focus();
    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange) {
      let range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  };
  function createMask(event) {
    let matrix = '+7 (___) ___ __ __',
      i = 0,
      def = matrix.replace(/\D/g, ''),
      val = this.value.replace(/\D/g, '');
    if (def.length >= val.length) {
      val = def;
    }
    this.value = matrix.replace(/./g, function (a) {
      return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
    });
    if (event.type === 'blur') {
      if (this.value.length === 2) {
        this.value = '';
      }
    } else {
      setCursorPosition(this.value.length, this);
    }
  }
  let inputs = document.querySelectorAll(selector);
  inputs.forEach(input => {
    input.addEventListener('input', createMask);
    input.addEventListener('focus', createMask);
    input.addEventListener('blur', createMask);
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mask);

/***/ }),

/***/ "./src/js/modules/modals.js":
/*!**********************************!*\
  !*** ./src/js/modules/modals.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const modals = () => {
  const modalTrigger = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal'),
    modalCloseBtn = document.querySelector('[data-close]'),
    hamburger = document.querySelector('.hamburger');
  modalTrigger.forEach(btn => {
    btn.addEventListener('click', openModal);
  });
  function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId); // если пользователь сам открыл модельное окно, то таймер не сработает
  }

  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    if (!hamburger.classList.contains('show')) {
      document.body.style.overflow = '';
    }
  }
  modalCloseBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', e => {
    if (e.target === modal) {
      closeModal();
    }
  });
  document.addEventListener('keydown', e => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });
  document.addEventListener('keydown', e => {
    if (e.code === 'Escape' && hamburger.classList.contains('show')) {
      toggleHamburger();
    }
  });
  const modalTimerId = setTimeout(openModal, 60000);
  function showModalByScroll() {
    if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }
  window.addEventListener('scroll', showModalByScroll);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modals);

/***/ }),

/***/ "./src/js/modules/names.js":
/*!*********************************!*\
  !*** ./src/js/modules/names.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const names = selector => {
  let namesFind = document.querySelectorAll(selector);
  namesFind.forEach(item => {
    item.addEventListener('input', () => {
      item.value = item.value.replace(/[\d\s]+/, '');
    });
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (names);

/***/ }),

/***/ "./src/js/modules/testimonials.js":
/*!****************************************!*\
  !*** ./src/js/modules/testimonials.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Testimonials: () => (/* binding */ Testimonials),
/* harmony export */   reviews: () => (/* binding */ reviews)
/* harmony export */ });
const LEFT_ARROW = '&#5176;',
  RIGHT_ARROW = '&#5171;',
  MIN_SIZE_TEXT = 150;

// Set testimonials here
let reviews = [{
  'name': 'Ольга Анисимова',
  'img': 'assets/img/clients/client_1.jpg',
  'text': 'Хочу рассказать о компании Global Opt. Самое главное что меня радует, это быстрый поиск и анализ определенного товара. Доставляла через компанию уже много раз, от расходных материалов для отеля, ло дольших партий детской одежды. Буду продолжать пользоваться услугами даной компании'
}, {
  'name': 'Джимми Феллон',
  'img': 'assets/img/clients/client_2.jpg',
  'text': 'Все супер! Мне все понравилось! Наверное, лучшая компания на рынке'
}, {
  'name': 'Гарри Джонсон',
  'img': 'assets/img/clients/client_3.jpg',
  'text': 'Спасибо большое за вашу работу, не знаю как бы еще отправил груз, если бы не вы'
}, {
  'name': 'Натали Вуд',
  'img': 'assets/img/clients/client_4.jpg',
  'text': 'Отличный сервис, персонал, рекомендую. Было бы здорово, если бы возили грузы и в другие страны'
}, {
  'name': 'Оксана Смит',
  'img': 'assets/img/clients/client_5.jpg',
  'text': 'Спасибо большое за вашу работу, никогда бы не подумала, что буду отправлять там много грузов зарубеж, но вы выручили'
}, {
  'name': 'Наташа Романофф',
  'img': 'assets/img/clients/client_6.jpg',
  'text': 'Это лучший сервис из тех, которые я пробовала. Спасибо большое за все!'
}, {
  'name': 'Сара Рю',
  'img': 'assets/img/clients/client_7.jpg',
  'text': 'Наверное лучший сервис в мире. Спасибо за то, что вы есть! С вами все становится легко!'
}];
class TestimonialsArrows {
  // Create arrows of Testimonials
  constructor(left, right, wrapper) {
    this.left = left;
    this.right = right;
    this.wrapper = wrapper;
    this.name_left = 'testimonials__left';
    this.name_right = 'testimonials__right';
  }
  render() {
    const arrows = document.createElement('div');
    arrows.classList.add('testimonials__arrows');
    arrows.innerHTML = `<div class=${this.name_left}>${this.left}</div>
          <div class=${this.name_right}>${this.right}</div>
        `;
    this.wrapper.append(arrows);
  }
}
class TestimonialItem {
  // Create Item
  constructor(id, name, img, text, wrapper, status) {
    this.id = id;
    this.img = img;
    this.name = name;
    this.text = text;
    this.wrapper = document.querySelector(wrapper);
    this.status = status;
    this.minText = this.getMinSizeText();
  }
  render(action = 'left') {
    const testCard = document.createElement('div');
    let text = action == 'active' ? this.text : this.minText;
    testCard.classList.add(`testId${this.id}`);
    testCard.classList.add("testimonials__item");
    testCard.innerHTML = `
        <img class='testimonials__img' src=${this.img} alt="Отзыв - ${this.name}">
        <div class="testimonials__name">${this.name}</div>
        <blockquote class="testimonials__text">${text}</blockquote>
        `;
    let mini = this.wrapper.classList.contains('mini');
    switch (action) {
      case 'left':
        this.status = 'next';
        testCard.classList.add(`testimonials__${this.status}`);
        this.wrapper.append(testCard);
        if (mini) {
          testCard.style.display = 'none';
          testCard.style.width = '100%';
        } else {
          testCard.style.display = 'flex';
          testCard.style.width = '';
        }
        break;
      case 'right':
        this.status = 'previos';
        testCard.classList.add(`testimonials__${this.status}`);
        document.querySelector('.testimonials__arrows').after(testCard);
        if (mini) {
          testCard.style.display = 'none';
          testCard.style.width = '100%';
        } else {
          testCard.style.display = 'flex';
          testCard.style.width = '';
        }
        break;
      case 'active':
        this.status = 'active';
        testCard.classList.add(`testimonials__${this.status}`);
        this.wrapper.append(testCard);
        break;
    }
  }
  remove() {
    // remove element from DOM
    this.wrapper.querySelector(`.testId${this.id}`).remove();
  }
  getMinSizeText() {
    // Get min-size of tesimonial text
    if (this.text.length >= MIN_SIZE_TEXT) {
      return this.text.slice(0, MIN_SIZE_TEXT) + '...';
    } else {
      return this.text;
    }
  }
  changeSizeText() {
    // If element is not active - choose small text for testimonial
    let elem = this.wrapper.querySelector(`.testId${this.id}`);
    if (elem.classList.contains('testimonials__active')) {
      return this.text;
    } else {
      return this.minText;
    }
  }
  change(action) {
    // Main logic of changing active testimonial
    let elem = this.wrapper.querySelector(`.testId${this.id}`);
    let mini = this.wrapper.classList.contains('mini');
    switch (this.status) {
      case 'previos':
        if (action === 'left') {
          this.status = null;
          this.remove();
        } else if (action === 'right') {
          this.status = 'active';
          elem.classList.remove('testimonials__previos');
          elem.classList.add('testimonials__active');
          let elem_text = elem.querySelector('.testimonials__text');
          if (mini) {
            elem.style.display = 'flex';
            elem.style.width = '100%';
          }
          elem_text.innerHTML = this.changeSizeText();
        }
        break;
      case 'active':
        if (action === 'left') {
          this.status = 'previos';
          elem.classList.remove('testimonials__active');
          elem.classList.add('testimonials__previos');
          let elem_text = elem.querySelector('.testimonials__text');
          elem_text.innerHTML = this.changeSizeText();
          if (mini) {
            elem.style.display = 'none';
            elem.style.width = '100%';
          } else {
            elem.style.display = '';
            elem.style.width = '';
          }
        } else if (action === 'right') {
          this.status = 'next';
          elem.classList.remove('testimonials__active');
          elem.classList.add('testimonials__next');
          let elem_text = elem.querySelector('.testimonials__text');
          elem_text.innerHTML = this.changeSizeText();
          if (mini) {
            elem.style.display = 'none';
            elem.style.width = '100%';
          } else {
            elem.style.display = '';
            elem.style.width = '';
          }
        }
        break;
      case 'next':
        if (action === 'left') {
          this.status = 'active';
          elem.classList.remove('testimonials__next');
          elem.classList.add('testimonials__active');
          let elem_text = elem.querySelector('.testimonials__text');
          elem_text.innerHTML = this.changeSizeText();
          if (mini) {
            elem.style.display = 'flex';
            elem.style.width = '100%';
          } else {
            elem.style.width = '';
          }
        } else if (action === 'right') {
          this.status = null;
          this.remove();
        }
        break;
      default:
        console.log('error');
    }
  }
}
class Testimonials {
  // Main constructor of testimonials
  constructor(lst, wrapper, flag = 1) {
    this.selector = wrapper;
    this.wrapper = document.querySelector(this.selector);
    this.arrows = new TestimonialsArrows(LEFT_ARROW, RIGHT_ARROW, this.wrapper);
    this.flag = flag;
    this.now = 0;
    this.lst = [];

    // Collect all testimonials to DB
    for (let i = 0; i < lst.length; i++) {
      this.lst.push(new TestimonialItem(i, lst[i].name, lst[i].img, lst[i].text, wrapper, null));
    }
    if (this.flag) {
      // If screen-size lower then 992px - change to min-version with one testimonial per page
      this.observeClassChanges(this.wrapper);
      const screenSizeQuery = window.matchMedia('(max-width: 992px)');
      this.handleScreenSize(screenSizeQuery);
      screenSizeQuery.addEventListener('change', this.handleScreenSize);
    } else {
      this.wrapper.classList.add('mini');
    }
  }
  render() {
    this.arrows.render();

    // arrow left event
    this.wrapper.querySelector('.' + this.arrows.name_left).addEventListener('click', e => {
      let leftButton = this.wrapper.querySelector('.' + this.arrows.name_left);
      if (leftButton.disabled) {
        return;
      }
      leftButton.disabled = true;
      setTimeout(() => {
        leftButton.disabled = false;
      }, 500);
      this.left();
    });

    // arrow right event
    this.wrapper.querySelector('.' + this.arrows.name_right).addEventListener('click', e => {
      let rightButton = this.wrapper.querySelector('.' + this.arrows.name_right);
      if (rightButton.disabled) {
        return;
      }
      rightButton.disabled = true;
      setTimeout(() => {
        rightButton.disabled = false;
      }, 500);
      this.right();
    });
  }
  show() {
    // show first 3 testimonals
    this.lst.at(this.now - 1).status = 'previos';
    this.lst[this.now].status = 'active';
    this.lst[this.now + 1].status = 'next';
    this.lst.at(this.now - 1).render('right');
    this.lst[this.now].render('active');
    this.lst[this.now + 1].render('left');
    if (!this.flag) this.wrapper.querySelector('.testimonials__active').style.width = '100%';
  }
  right() {
    this.lst.at((this.now + 1) % this.lst.length).change('right');
    this.lst.at(this.now % this.lst.length).change('right');
    this.lst.at((this.now - 1) % this.lst.length).change('right');
    this.lst.at((this.now - 2) % this.lst.length).render('right');
    this.now -= 1;
  }
  left() {
    this.lst.at((this.now - 1) % this.lst.length).change('left');
    this.lst.at(this.now % this.lst.length).change('left');
    this.lst.at((this.now + 1) % this.lst.length).change('left');
    this.lst.at((this.now + 2) % this.lst.length).render();
    this.now += 1;
  }
  observeClassChanges(element) {
    // Check if wrapper has "mini"-class - 
    //it will change from wide screen version to mini with one testimonial per page
    const observer = new MutationObserver(mutationsList => {
      mutationsList.forEach(mutation => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const classList = Array.from(element.classList);
          const addedMini = classList.includes('mini');
          if (addedMini) {
            this.wrapper.querySelector('.testimonials__previos').style.display = 'none';
            this.wrapper.querySelector('.testimonials__next').style.display = 'none';
            this.wrapper.querySelector('.testimonials__active').style.width = '100%';
          } else {
            this.wrapper.querySelector('.testimonials__previos').style.display = '';
            this.wrapper.querySelector('.testimonials__previos').style.width = '';
            this.wrapper.querySelector('.testimonials__next').style.display = '';
            this.wrapper.querySelector('.testimonials__next').style.width = '';
            this.wrapper.querySelector('.testimonials__active').style.width = '';
          }
        }
      });
    });
    observer.observe(element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }
  handleScreenSize(event) {
    // Event for screen size
    const element = document.querySelector('.testimonials__wrapper');
    if (element && event && event.matches !== undefined) {
      if (event.matches) {
        element.classList.add('mini');
      } else {
        element.classList.remove('mini');
      }
    }
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_hamburger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/hamburger */ "./src/js/modules/hamburger.js");
/* harmony import */ var _modules_testimonials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/testimonials */ "./src/js/modules/testimonials.js");
/* harmony import */ var _modules_modals__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modals */ "./src/js/modules/modals.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");
/* harmony import */ var _modules_mask__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/mask */ "./src/js/modules/mask.js");
/* harmony import */ var _modules_names__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/names */ "./src/js/modules/names.js");
'user strict';








window.addEventListener('DOMContentLoaded', () => {
  // Hamburger
  (0,_modules_hamburger__WEBPACK_IMPORTED_MODULE_0__["default"])();

  // Testimonials
  let testimonials = new _modules_testimonials__WEBPACK_IMPORTED_MODULE_1__.Testimonials(_modules_testimonials__WEBPACK_IMPORTED_MODULE_1__.reviews, '.testimonials__wrapper');
  testimonials.render();
  testimonials.show();
  // Modal Window
  (0,_modules_modals__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_mask__WEBPACK_IMPORTED_MODULE_4__["default"])('[data-tel]');
  (0,_modules_names__WEBPACK_IMPORTED_MODULE_5__["default"])('[data-name]');
});
})();

/******/ })()
;
//# sourceMappingURL=script.js.map