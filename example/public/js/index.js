/*!
 * jslib-cli v0.1.0
 * (c) 2018-2018 careteenL <15074806497@163.com>
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global['jslib-cli'] = {})));
}(this, (function (exports) { 'use strict';

  function add(a, b) {
    return a + b;
  }

  exports.add = add;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.js.map
