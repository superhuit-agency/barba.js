import 'whatwg-fetch';

import BaseTransition from './transition/baseTransition';
import BaseView from './view/baseView';
import Cache from './cache/static';
import Dispatcher from './dispatcher/dispatcher';
import HistoryManager from './pjax/historyManager';
import Pjax from './pjax/pjax';
import Prefetch from './pjax/prefetch';
import Utils from './utils/utils';

//Promise polyfill https://github.com/taylorhakes/promise-polyfill

// if (typeof Promise !== 'function') {
//   window.Promise = require('promise-polyfill');
// }
//
// Fetch polyfill

module.exports = {
  version: VERSION,
  BaseTransition,
  BaseView,
  Cache,
  Dispatcher,
  HistoryManager,
  Pjax,
  Prefetch,
  Utils
};
