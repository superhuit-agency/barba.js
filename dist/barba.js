(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Barba", [], factory);
	else if(typeof exports === 'object')
		exports["Barba"] = factory();
	else
		root["Barba"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Just an object with some helpful functions
 *
 * @type {Object}
 * @namespace Barba.Utils
 */
exports.default = {
  /**
   * Return the current url
   *
   * @memberOf Barba.Utils
   * @return {String} currentUrl
   */
  getCurrentUrl: function getCurrentUrl() {
    return window.location.protocol + '//' + window.location.host + window.location.pathname + window.location.search;
  },


  /**
   * Given an url, return it without the hash
   *
   * @memberOf Barba.Utils
   * @private
   * @param  {String} url
   * @return {String} newCleanUrl
   */
  cleanLink: function cleanLink(url) {
    return url.replace(/#.*/, '');
  },


  /**
   * Time in millisecond after the xhr request goes in timeout
   *
   * @memberOf Barba.Utils
   * @type {Number}
   * @default
   */
  xhrTimeout: 5000,

  /**
   * Start an XMLHttpRequest() and return a Promise
   *
   * @memberOf Barba.Utils
   * @param  {String} url
   * @return {Promise}
   */
  xhr: function xhr(url) {
    // const deferred = this.deferred();
    // let timeout;

    // new Promise((resolve, reject) => {
    //   timeout = window.setTimeout(() => {
    //     reject(new Error('xhr: Timeout exceeded'));
    //   }, this.xhrTimeout);
    // });

    var dfd = this.deferred();

    var headers = new Headers();
    headers.append('x-barba', 'yes');

    fetch(url, {
      method: 'GET',
      headers: headers,
      cache: 'default'
    }).then(function (res) {
      if (res.status >= 200 && res.status < 300) {
        return dfd.resolve(res.text());
      }

      var err = new Error(res.statusText || res.status);
      return dfd.reject(err);
    }).catch(function (err) {
      dfd.reject(err);
    });

    return dfd.promise;

    // var deferred = this.deferred();
    // var req = new XMLHttpRequest();

    // req.onreadystatechange = () => {
    //   if (req.readyState === 4) {
    //     // TODO CHECK THIS
    //     if (req.status === 200) {
    //       return deferred.resolve(req.responseText);
    //     } else {
    //       return deferred.reject(new Error('xhr: HTTP code is not 200'));
    //     }
    //   }
    // };

    // req.ontimeout = () => {
    //   return deferred.reject(new Error('xhr: Timeout exceeded'));
    // };

    // req.open('GET', url);
    // req.timeout = this.xhrTimeout;
    // req.setRequestHeader('x-barba', 'yes');
    // req.send();

    // return deferred.promise;
  },


  /**
   * Return a new "Deferred" object
   * https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Deferred
   *
   * @memberOf Barba.Utils
   * @return {Deferred}
   */
  deferred: function deferred() {
    return new function () {
      var _this = this;

      this.resolve = null;
      this.reject = null;

      this.promise = new Promise(function (resolve, reject) {
        _this.resolve = resolve;
        _this.reject = reject;
      });
    }();
  },


  /**
   * Return the port number normalized, eventually you can pass a string to be normalized.
   *
   * @memberOf Barba.Utils
   * @private
   * @param  {String} p
   * @return {Int} port
   */
  getPort: function getPort(p) {
    var port = typeof p !== 'undefined' ? p : window.location.port;
    var protocol = window.location.protocol;

    if (port != '') return parseInt(port);

    if (protocol === 'http:') return 80;

    if (protocol === 'https:') return 443;
  }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Little Dispatcher inspired by MicroEvent.js
 *
 * @namespace Barba.Dispatcher
 * @type {Object}
 */
exports.default = {
  /**
   * Object that keeps all the events
   *
   * @memberOf Barba.Dispatcher
   * @readOnly
   * @type {Object}
   */
  events: {},

  /**
   * Bind a callback to an event
   *
   * @memberOf Barba.Dispatcher
   * @param  {String} eventName
   * @param  {Function} function
   */
  on: function on(e, f) {
    this.events[e] = this.events[e] || [];
    this.events[e].push(f);
  },
  once: function once(e, f) {
    var self = this;

    function newf() {
      self.off(e, newf);
      f.apply(this, arguments);
    };

    this.on(e, newf);
  },


  /**
   * Unbind event
   *
   * @memberOf Barba.Dispatcher
   * @param  {String} eventName
   * @param  {Function} function
   */
  off: function off(e, f) {
    if (e in this.events === false) return;

    this.events[e].splice(this.events[e].indexOf(f), 1);
  },


  /**
   * Fire the event running all the event associated to it
   *
   * @memberOf Barba.Dispatcher
   * @param  {String} eventName
   * @param  {...*} args
   */
  trigger: function trigger(e) {
    //e, ...args
    if (e in this.events === false) return;

    for (var i = 0; i < this.events[e].length; i++) {
      this.events[e][i].apply(this, Array.prototype.slice.call(arguments, 1));
    }
  }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Simple static cache
 *
 * @namespace Barba.Cache
 * @type {Object}
 */
exports.default = {
  /**
   * The Object that keeps all the key value information
   *
   * @memberOf Barba.Cache
   * @type {Object}
   */
  data: {},

  /**
   * Set a key and value data, mainly Barba is going to save promises
   *
   * @memberOf Barba.Cache
   * @param {String} key
   * @param {*} value
   */
  set: function set(key, val) {
    this.data[key] = val;
  },


  /**
   * Retrieve the data using the key
   *
   * @memberOf Barba.Cache
   * @param  {String} key
   * @return {*}
   */
  get: function get(key) {
    return this.data[key];
  },


  /**
   * Flush the cache
   *
   * @memberOf Barba.Cache
   */
  reset: function reset() {
    this.data = {};
  }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * HistoryManager helps to keep track of the navigation
 *
 * @namespace Barba.HistoryManager
 * @type {Object}
 */
exports.default = {
  /**
   * Keep track of the status in historic order
   *
   * @memberOf Barba.HistoryManager
   * @readOnly
   * @type {Array}
   */
  history: [],

  /**
   * Add a new set of url and namespace
   *
   * @memberOf Barba.HistoryManager
   * @param {String} url
   * @param {String} namespace
   * @private
   */
  add: function add(url, namespace) {
    if (!namespace) namespace = undefined;

    this.history.push({
      url: url,
      namespace: namespace
    });
  },

  /**
   * Return information about the current status
   *
   * @memberOf Barba.HistoryManager
   * @return {Object}
   */
  currentStatus: function currentStatus() {
    return this.history[this.history.length - 1];
  },

  /**
   * Return information about the previous status
   *
   * @memberOf Barba.HistoryManager
   * @return {Object}
   */
  prevStatus: function prevStatus() {
    var history = this.history;

    if (history.length < 2) return null;

    return history[history.length - 2];
  }
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _dispatcher = __webpack_require__(1);

var _dispatcher2 = _interopRequireDefault(_dispatcher);

var _hideShowTransition = __webpack_require__(9);

var _hideShowTransition2 = _interopRequireDefault(_hideShowTransition);

var _static = __webpack_require__(2);

var _static2 = _interopRequireDefault(_static);

var _historyManager = __webpack_require__(3);

var _historyManager2 = _interopRequireDefault(_historyManager);

var _dom = __webpack_require__(8);

var _dom2 = _interopRequireDefault(_dom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Pjax is a static object with main function
 *
 * @namespace Barba.Pjax
 * @borrows Dom as Dom
 * @type {Object}
 */
exports.default = {
  Dom: _dom2.default,
  History: _historyManager2.default,
  Cache: _static2.default,

  /**
   * Indicate wether or not use the cache
   *
   * @memberOf Barba.Pjax
   * @type {Boolean}
   * @default
   */
  cacheEnabled: true,

  /**
   * Indicate if there is an animation in progress
   *
   * @memberOf Barba.Pjax
   * @readOnly
   * @type {Boolean}
   */
  transitionProgress: false,

  /**
   * Class name used to ignore links
   *
   * @memberOf Barba.Pjax
   * @type {String}
   * @default
   */
  ignoreClassLink: 'no-barba',

  /**
   * Function to be called to start Pjax
   *
   * @memberOf Barba.Pjax
   */
  start: function start() {
    this.init();
  },

  /**
   * Init the events
   *
   * @memberOf Barba.Pjax
   * @private
   */
  init: function init() {
    var container = this.Dom.getContainer();
    var wrapper = this.Dom.getWrapper();

    wrapper.setAttribute('aria-live', 'polite');

    this.History.add(this.getCurrentUrl(), this.Dom.getNamespace(container));

    //Fire for the current view.
    _dispatcher2.default.trigger('initStateChange', this.History.currentStatus());
    _dispatcher2.default.trigger('newPageReady', this.History.currentStatus(), {}, container, this.Dom.currentHTML);
    _dispatcher2.default.trigger('transitionCompleted', this.History.currentStatus());

    this.bindEvents();
  },

  /**
   * Attach the eventlisteners
   *
   * @memberOf Barba.Pjax
   * @private
   */
  bindEvents: function bindEvents() {
    document.addEventListener('click', this.onLinkClick.bind(this));

    window.addEventListener('popstate', this.onStateChange.bind(this));
  },

  /**
   * Return the currentURL cleaned
   *
   * @memberOf Barba.Pjax
   * @return {String} currentUrl
   */
  getCurrentUrl: function getCurrentUrl() {
    // TODO, clean from what? currenturl do not takes hash..
    return _utils2.default.cleanLink(_utils2.default.getCurrentUrl());
  },

  /**
   * Change the URL with pushstate and trigger the state change
   *
   * @memberOf Barba.Pjax
   * @param {String} newUrl
   */
  goTo: function goTo(url) {
    window.history.pushState(null, null, url);
    this.onStateChange();
  },

  /**
   * Force the browser to go to a certain url
   *
   * @memberOf Barba.Pjax
   * @param {String} url
   * @private
   */
  forceGoTo: function forceGoTo(url) {
    window.location = url;
  },

  /**
   * Load an url, will start an xhr request or load from the cache
   *
   * @memberOf Barba.Pjax
   * @private
   * @param  {String} url
   * @return {Promise}
   */
  load: function load(url) {
    var deferred = _utils2.default.deferred();
    var _this = this;
    var xhr;

    xhr = this.Cache.get(url);

    if (!xhr) {
      xhr = _utils2.default.xhr(url);
      this.Cache.set(url, xhr);
    }

    xhr.then(function (data) {
      var container = _this.Dom.parseResponse(data);

      _this.Dom.putContainer(container);

      if (!_this.cacheEnabled) _this.Cache.reset();

      deferred.resolve(container);
    }, function () {
      //Something went wrong (timeout, 404, 505...)
      _this.forceGoTo(url);

      deferred.reject();
    });

    return deferred.promise;
  },

  /**
   * Get the .href parameter out of an element
   * and handle special cases (like xlink:href)
   *
   * @private
   * @memberOf Barba.Pjax
   * @param  {HTMLElement} el
   * @return {String} href
   */
  getHref: function getHref(el) {
    if (!el) {
      return undefined;
    }

    if (el.getAttribute && typeof el.getAttribute('xlink:href') === 'string') {
      return el.getAttribute('xlink:href');
    }

    if (typeof el.href === 'string') {
      return el.href;
    }

    return undefined;
  },

  /**
   * Callback called from click event
   *
   * @memberOf Barba.Pjax
   * @private
   * @param {MouseEvent} evt
   */
  onLinkClick: function onLinkClick(evt) {
    var el = evt.target;

    //Go up in the nodelist until we
    //find something with an href
    while (el && !this.getHref(el)) {
      el = el.parentNode;
    }

    if (this.preventCheck(evt, el)) {
      evt.stopPropagation();
      evt.preventDefault();

      _dispatcher2.default.trigger('linkClicked', el, evt);

      var href = this.getHref(el);
      this.goTo(href);
    }
  },

  /**
   * Determine if the link should be followed
   *
   * @memberOf Barba.Pjax
   * @param  {MouseEvent} evt
   * @param  {HTMLElement} element
   * @return {Boolean}
   */
  preventCheck: function preventCheck(evt, element) {
    if (!window.history.pushState) return false;

    var href = this.getHref(element);

    //User
    if (!element || !href) return false;

    //Middle click, cmd click, and ctrl click
    if (evt.which > 1 || evt.metaKey || evt.ctrlKey || evt.shiftKey || evt.altKey) return false;

    //Ignore target with _blank target
    if (element.target && element.target === '_blank') return false;

    //Check if it's the same domain
    if (window.location.protocol !== element.protocol || window.location.hostname !== element.hostname) return false;

    //Check if the port is the same
    if (_utils2.default.getPort() !== _utils2.default.getPort(element.port)) return false;

    //Ignore case when a hash is being tacked on the current URL
    if (href.indexOf('#') > -1) return false;

    //Ignore case where there is download attribute
    if (element.getAttribute && typeof element.getAttribute('download') === 'string') return false;

    //In case you're trying to load the same page
    if (_utils2.default.cleanLink(href) == _utils2.default.cleanLink(location.href)) return false;

    if (element.classList.contains(this.ignoreClassLink)) return false;

    return true;
  },

  /**
   * Return a transition object
   *
   * @memberOf Barba.Pjax
   * @return {Barba.Transition} Transition object
   */
  getTransition: function getTransition() {
    //User customizable
    return _hideShowTransition2.default;
  },

  /**
   * Method called after a 'popstate' or from .goTo()
   *
   * @memberOf Barba.Pjax
   * @private
   */
  onStateChange: function onStateChange() {
    var newUrl = this.getCurrentUrl();

    if (this.transitionProgress) this.forceGoTo(newUrl);

    if (this.History.currentStatus().url === newUrl) return false;

    this.History.add(newUrl);

    var newContainer = this.load(newUrl);
    var transition = new (this.getTransition())();

    this.transitionProgress = true;

    _dispatcher2.default.trigger('initStateChange', this.History.currentStatus(), this.History.prevStatus());

    var transitionInstance = transition.init(this.Dom.getContainer(), newContainer);

    newContainer.then(this.onNewContainerLoaded.bind(this));

    transitionInstance.then(this.onTransitionEnd.bind(this));
  },

  /**
   * Function called as soon the new container is ready
   *
   * @memberOf Barba.Pjax
   * @private
   * @param {HTMLElement} container
   */
  onNewContainerLoaded: function onNewContainerLoaded(container) {
    var currentStatus = this.History.currentStatus();
    currentStatus.namespace = this.Dom.getNamespace(container);

    _dispatcher2.default.trigger('newPageReady', this.History.currentStatus(), this.History.prevStatus(), container, this.Dom.currentHTML);
  },

  /**
   * Function called as soon the transition is finished
   *
   * @memberOf Barba.Pjax
   * @private
   */
  onTransitionEnd: function onTransitionEnd() {
    this.transitionProgress = false;

    _dispatcher2.default.trigger('transitionCompleted', this.History.currentStatus(), this.History.prevStatus());
  }
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * BaseTransition to extend
 *
 * @namespace Barba.BaseTransition
 * @type {Object}
 */
var BaseTransition = function () {
  function BaseTransition() {
    _classCallCheck(this, BaseTransition);

    this.oldContainer = undefined;
    this.newContainer = undefined;
    this.newContainerLoading = undefined;
  }

  /**
   * This function is called from Pjax module to initialize
   * the transition.
   *
   * @memberOf Barba.BaseTransition
   * @private
   * @param  {HTMLElement} oldContainer
   * @param  {Promise} newContainer
   * @return {Promise}
   */


  _createClass(BaseTransition, [{
    key: 'init',
    value: function init(oldContainer, newContainer) {
      var _this = this;

      this.oldContainer = oldContainer;
      this._newContainerPromise = newContainer;

      this.deferred = _utils2.default.deferred();
      this.newContainerReady = _utils2.default.deferred();
      this.newContainerLoading = this.newContainerReady.promise;

      this.start();

      this._newContainerPromise.then(function (newContainer) {
        _this.newContainer = newContainer;
        _this.newContainerReady.resolve();
      });

      return this.deferred.promise;
    }

    /**
     * This function needs to be called as soon the Transition is finished
     *
     * @memberOf Barba.BaseTransition
     */

  }, {
    key: 'done',
    value: function done() {
      this.oldContainer.parentNode.removeChild(this.oldContainer);
      this.newContainer.style.visibility = 'visible';
      this.deferred.resolve();
    }

    /**
     * Constructor for your Transition
     *
     * @memberOf Barba.BaseTransition
     * @abstract
     */

  }, {
    key: 'start',
    value: function start() {}
  }]);

  return BaseTransition;
}();

exports.default = BaseTransition;
;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _pjax = __webpack_require__(4);

var _pjax2 = _interopRequireDefault(_pjax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Prefetch
 *
 * @namespace Barba.Prefetch
 * @type {Object}
 */
exports.default = {
  /**
   * Class name used to ignore prefetch on links
   *
   * @memberOf Barba.Prefetch
   * @type {String}
   * @default
   */
  ignoreClassLink: 'no-barba-prefetch',

  /**
   * Init the event listener on mouseover and touchstart
   * for the prefetch
   *
   * @memberOf Barba.Prefetch
   */
  init: function init() {
    if (!window.history.pushState) {
      return false;
    }

    document.body.addEventListener('mouseover', this.onLinkEnter.bind(this));
    document.body.addEventListener('touchstart', this.onLinkEnter.bind(this));
  },

  /**
   * Callback for the mousehover/touchstart
   *
   * @memberOf Barba.Prefetch
   * @private
   * @param  {Object} evt
   */
  onLinkEnter: function onLinkEnter(evt) {
    var el = evt.target;

    while (el && !_pjax2.default.getHref(el)) {
      el = el.parentNode;
    }

    if (!el || el.classList.contains(this.ignoreClassLink)) {
      return;
    }

    var url = _pjax2.default.getHref(el);

    //Check if the link is elegible for Pjax
    if (_pjax2.default.preventCheck(evt, el) && !_pjax2.default.Cache.get(url)) {
      var xhr = _utils2.default.xhr(url);
      _pjax2.default.Cache.set(url, xhr);
    }
  }
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dispatcher = __webpack_require__(1);

var _dispatcher2 = _interopRequireDefault(_dispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseView = function () {
  function BaseView() {
    _classCallCheck(this, BaseView);

    this.namespace = null;
  }

  _createClass(BaseView, [{
    key: 'init',
    value: function init() {
      var _this = this;

      _dispatcher2.default.on('initStateChange', function (newStatus, oldStatus) {
        if (oldStatus && oldStatus.namespace === _this.namespace) _this.onLeave();
      });

      _dispatcher2.default.on('newPageReady', function (newStatus, oldStatus, container) {
        _this.container = container;

        if (newStatus.namespace === _this.namespace) _this.onEnter();
      });

      _dispatcher2.default.on('transitionCompleted', function (newStatus, oldStatus) {
        if (newStatus.namespace === _this.namespace) _this.onEnterCompleted();

        if (oldStatus && oldStatus.namespace === _this.namespace) _this.onLeaveCompleted();
      });
    }

    /**
     * This function will be fired when the container
     * is ready and attached to the DOM.
     *
     * @memberOf Barba.BaseView
     * @abstract
     */

  }, {
    key: 'onEnter',
    value: function onEnter() {}

    /**
     * This function will be fired when the transition
     * to this container has just finished.
     *
     * @memberOf Barba.BaseView
     * @abstract
     */

  }, {
    key: 'onEnterCompleted',
    value: function onEnterCompleted() {}

    /**
     * This function will be fired when the transition
     * to a new container has just started.
     *
     * @memberOf Barba.BaseView
     * @abstract
     */

  }, {
    key: 'onLeave',
    value: function onLeave() {}

    /**
     * This function will be fired when the container
     * has just been removed from the DOM.
     *
     * @memberOf Barba.BaseView
     * @abstract
     */

  }, {
    key: 'onLeaveCompleted',
    value: function onLeaveCompleted() {}
  }]);

  return BaseView;
}();

exports.default = BaseView;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Object that is going to deal with DOM parsing/manipulation
 *
 * @namespace Barba.Pjax.Dom
 * @type {Object}
 */
exports.default = {
  /**
   * The name of the data attribute on the container
   *
   * @memberOf Barba.Pjax.Dom
   * @type {String}
   * @default
   */
  dataNamespace: 'namespace',

  /**
   * Id of the main wrapper
   *
   * @memberOf Barba.Pjax.Dom
   * @type {String}
   * @default
   */
  wrapperId: 'barba-wrapper',

  /**
   * Class name used to identify the containers
   *
   * @memberOf Barba.Pjax.Dom
   * @type {String}
   * @default
   */
  containerClass: 'barba-container',

  /**
   * Full HTML String of the current page.
   * By default is the innerHTML of the initial loaded page.
   *
   * Each time a new page is loaded, the value is the response of the xhr call.
   *
   * @memberOf Barba.Pjax.Dom
   * @type {String}
   */
  currentHTML: document.documentElement.innerHTML,

  /**
   * Parse the responseText obtained from the xhr call
   *
   * @memberOf Barba.Pjax.Dom
   * @private
   * @param  {String} responseText
   * @return {HTMLElement}
   */
  parseResponse: function parseResponse(responseText) {
    this.currentHTML = responseText;

    var wrapper = document.createElement('div');
    wrapper.innerHTML = responseText;

    var titleEl = wrapper.querySelector('title');

    if (titleEl) document.title = titleEl.textContent;

    return this.getContainer(wrapper);
  },

  /**
   * Get the main barba wrapper by the ID `wrapperId`
   *
   * @memberOf Barba.Pjax.Dom
   * @return {HTMLElement} element
   */
  getWrapper: function getWrapper() {
    var wrapper = document.getElementById(this.wrapperId);

    if (!wrapper) throw new Error('Barba.js: wrapper not found!');

    return wrapper;
  },

  /**
   * Get the container on the current DOM,
   * or from an HTMLElement passed via argument
   *
   * @memberOf Barba.Pjax.Dom
   * @private
   * @param  {HTMLElement} element
   * @return {HTMLElement}
   */
  getContainer: function getContainer(element) {
    if (!element) element = document.body;

    if (!element) throw new Error('Barba.js: DOM not ready!');

    var container = this.parseContainer(element);

    // wtf?
    // if (container && container.jquery)
    //   container = container[0];

    if (!container) throw new Error('Barba.js: no container found');

    return container;
  },

  /**
   * Get the namespace of the container
   *
   * @memberOf Barba.Pjax.Dom
   * @private
   * @param  {HTMLElement} element
   * @return {String}
   */
  getNamespace: function getNamespace(element) {
    // if (element && element.dataset) {
    //   return element.dataset[this.dataNamespace];
    // } else if (element) {
    //   return element.getAttribute('data-' + this.dataNamespace);
    // }

    if (!element) {
      return null;
    }

    return element.getAttribute('data-' + this.dataNamespace);
  },

  /**
   * Put the container on the page
   *
   * @memberOf Barba.Pjax.Dom
   * @private
   * @param  {HTMLElement} element
   */
  putContainer: function putContainer(element) {
    element.style.visibility = 'hidden';

    var wrapper = this.getWrapper();
    wrapper.appendChild(element);
  },

  /**
   * Get container selector
   *
   * @memberOf Barba.Pjax.Dom
   * @private
   * @param  {HTMLElement} element
   * @return {HTMLElement} element
   */
  parseContainer: function parseContainer(element) {
    return element.querySelector('.' + this.containerClass);
  }
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _baseTransition = __webpack_require__(5);

var _baseTransition2 = _interopRequireDefault(_baseTransition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HideShowTransition = function (_BaseTransition) {
  _inherits(HideShowTransition, _BaseTransition);

  function HideShowTransition() {
    _classCallCheck(this, HideShowTransition);

    return _possibleConstructorReturn(this, (HideShowTransition.__proto__ || Object.getPrototypeOf(HideShowTransition)).apply(this, arguments));
  }

  _createClass(HideShowTransition, [{
    key: 'start',
    value: function start() {
      this.newContainerLoading.then(this.finish.bind(this));
    }
  }, {
    key: 'finish',
    value: function finish() {
      window.scrollTo(0, 0);
      this.done();
    }
  }]);

  return HideShowTransition;
}(_baseTransition2.default);

exports.default = HideShowTransition;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _baseTransition = __webpack_require__(5);

var _baseTransition2 = _interopRequireDefault(_baseTransition);

var _baseView = __webpack_require__(7);

var _baseView2 = _interopRequireDefault(_baseView);

var _static = __webpack_require__(2);

var _static2 = _interopRequireDefault(_static);

var _dispatcher = __webpack_require__(1);

var _dispatcher2 = _interopRequireDefault(_dispatcher);

var _historyManager = __webpack_require__(3);

var _historyManager2 = _interopRequireDefault(_historyManager);

var _pjax = __webpack_require__(4);

var _pjax2 = _interopRequireDefault(_pjax);

var _prefetch = __webpack_require__(6);

var _prefetch2 = _interopRequireDefault(_prefetch);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Promise polyfill https://github.com/taylorhakes/promise-polyfill

// if (typeof Promise !== 'function') {
//   window.Promise = require('promise-polyfill');
// }
//
// Fetch polyfill

module.exports = {
  version: "2.0.0",
  BaseTransition: _baseTransition2.default,
  BaseView: _baseView2.default,
  Cache: _static2.default,
  Dispatcher: _dispatcher2.default,
  HistoryManager: _historyManager2.default,
  Pjax: _pjax2.default,
  Prefetch: _prefetch2.default,
  Utils: _utils2.default
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=barba.js.map