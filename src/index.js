import 'whatwg-fetch';
import Promise from 'promise-polyfill';

if (!window.Promise) {
  window.Promise = Promise;
}

import Transition from './transition/transition';
import View from './view/view';
import Cache from './cache/static';
import Dispatcher from './dispatcher/dispatcher';
import HistoryManager from './pjax/historyManager';
import Pjax from './pjax/pjax';
import Prefetch from './pjax/prefetch';
import Utils from './utils/utils';


module.exports = {
  version: VERSION,
  Transition,
  View,
  Cache,
  Dispatcher,
  HistoryManager,
  Pjax,
  Prefetch,
  Utils
};
