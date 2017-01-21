import 'whatwg-fetch';
import Promise from 'promise-polyfill';

if (!window.Promise) {
  window.Promise = Promise;
}

import BaseTransition from './transition/baseTransition';
import BaseView from './view/baseView';
import Cache from './cache/static';
import Dispatcher from './dispatcher/dispatcher';
import HistoryManager from './pjax/historyManager';
import Pjax from './pjax/pjax';
import Prefetch from './pjax/prefetch';
import Utils from './utils/utils';


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
