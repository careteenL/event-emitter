/*!
 * @careteen/event-emitter v0.1.2
 * (c) 2018-2018 careteenL <15074806497@163.com>
 * Released under the MIT License.
 */
/**
 * @desc 全局通用发布-订阅模式
 * 		可支持：1、先发布(or触发事件)后订阅(or注册事件)
 * 					 2、新增命名空间 
 */
var EventEmitter = function () {
  var _event,
      _default = 'default';
  _event = function () {
    var _on,
        _emit,
        _remove,
        _create,
        each,
        _shift = Array.prototype.shift,
        _unshift = Array.prototype.unshift,
        namespaceCache = {}; // 命名空间
    /**
     * @desc 内部函数 - 遍历
     * @param {Array} arr
     * @param {Function} fn fn(index, item)
     */
    each = function each(arr, fn) {
      var ret;
      for (var index = 0, len = arr.length; index < len; index++) {
        var item = arr[index];
        ret = fn.call(item, index, item); // 将回调函数fn的this指向item 
      }
      return ret;
    };

    /**
     * @desc 内部函数 - 注册事件
     * @param {String} key 事件名
     * @param {Function} fn 事件函数
     * @param {Object} cache 某个命名空间下存放多个事件栈的对象
     */
    _on = function _on(key, fn, cache) {
      if (!cache[key]) {
        cache[key] = [];
      }
      cache[key].push(fn);
    };

    /**
     * @desc 内部函数 - 触发事件
     * @param {Object} cache 某个命名空间下存放多个事件栈的对象
     * @param {String} key 事件名
     * @param {Arguments} ...args 回调函数所需参数
     */
    _emit = function _emit() {
      var cache = _shift.call(arguments),
          key = _shift.call(arguments),
          args = arguments,
          _self = this,
          stack = cache[key];
      if (!stack || !stack.length) {
        // 触发的某个事件的事件栈里若没函数
        return;
      }
      return each(stack, function () {
        // 有则遍历
        // 下面this指向stack中的每一项
        // 然后再指向_emit函数
        return this.apply(_self, args);
      });
    };

    /**
     * @desc 内部函数 - 移除某个或所有注册事件
     * @param {String} key 事件名
     * @param {Function} fn 事件函数
     * @param {Object} cache 某个命名空间下存放多个事件栈的对象
     */
    _remove = function _remove(key, fn, cache) {
      if (cache[key]) {
        // 有注册过才会删除        
        if (fn) {
          // 若传了特定函数，删除特定
          for (var i = cache[key].length; i >= 0; i--) {
            // 反向遍历
            if (cache[key] === fn) {
              cache[key].splice(i, 1);
            }
          }
        } else {
          // 否则删除所有注册函数 
          cache[key] = [];
        }
      }
    };

    /**
     * @desc 内部函数 - 创建命名空间 核心函数
     * @param {String} namespace 默认值为 _default
     */
    _create = function _create(namespace) {
      namespace = namespace || _default;
      var cache = {},
          offlineStack = [],
          // 离线事件 - 主要是为了实现先调用后注册
      ret = {
        on: function on(key, fn, last) {
          _on(key, fn, cache);
          if (offlineStack === null) {
            // 注册过了 则不进行下面的
            return;
          }
          // 没有注册就触发了事件 
          // 在emit函数中将触发事件 离线缓存到了offlineStack
          if (last === 'last') {
            offlineStack.length && offlineStack.pop()(); // 订阅时只会读取最新一次注册事件 携带的参数
          } else {
            // 遍历触发离线缓存的事件栈
            each(offlineStack, function () {
              this(); // 下面this指向offlineStack中的每一项
            });
          }
          offlineStack = null; // 置为null 表示已经注册过了
        },

        one: function one(key, fn, last) {
          _remove(key, cache);
          this.on(key, fn, last);
        },

        emit: function emit() {
          var fn,
              args,
              _self = this;
          _unshift.call(arguments, cache); // 将 某个命名空间下存放多个事件栈的对象cache 放到参数队头
          args = arguments;
          // 调用事件
          fn = function fn() {
            return _emit.apply(_self, args);
          };
          if (offlineStack) {
            // offlineStack为[]时，为未注册先调用，将事件fn放进 离线事件栈offlineStack中
            return offlineStack.push(fn);
          }
          return fn(); // 否则触发事件
        },

        remove: function remove(key, fn) {
          _remove(key, cache, fn);
        }
        // 缓存命名空间 
      };return namespace ? namespaceCache[namespace] ? namespaceCache[namespace] : namespaceCache[namespace] = ret : ret;
    };

    /**
     * @desc 对外暴露API
     */
    return {
      create: _create, // 创建命名空间

      // 以下均使用默认的命名空间
      /**
       * @desc 注册事件
       * @param {String} key
       * @param {Function} fn
       * @param {String} last 先调用后注册场景下，注册时只会读取最新一次注册事件 携带的参数
       */
      on: function on(key, fn, last) {
        var event = this.create();
        event.on(key, fn, last);
      },

      /**
       * @desc 单例
       * 参数同 on
       */
      one: function one(key, fn, last) {
        var event = this.create();
        event.one(key, fn, last);
      },

      /**
       * @desc 触发事件
       * @param {String} key 
       * @param {Arguments} args 触发时带的参数
       */
      emit: function emit() {
        var event = this.create();
        event.emit.apply(this, arguments);
      },

      /**
       * @desc 移除某个事件的某个或所有注册函数
       * @param {String} key 某个事件
       * @param {Function} fn 传则移除某个事件，否则移除所有事件
       */
      remove: function remove(key, fn) {
        var event = this.create();
        event.remove(key, fn);
      }
    };
  }();
  return _event;
}();

export default EventEmitter;
