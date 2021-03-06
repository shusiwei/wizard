function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * tiny-node.js
 * Description : A modern JavaScript utility library for browser.
 * Coder : shusiwei
 * Date : 2016-08-22
 * Version : 1.0.0
 *
 * https://github.com/shusiwei/tiny-node
 * Licensed under the MIT license.
 */
import { isUndefined, isNull, isPlainObject, isString, forEach, isPosiInteger, trim } from './index';

var _window = window,
    document = _window.document;

var addEventListener = function addEventListener(el, fn) {
  for (var _len = arguments.length, types = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    types[_key - 2] = arguments[_key];
  }

  if (types.length === 0) throw new Error('at least one event name is required');

  for (var _iterator = types, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var type = _ref;

    el.addEventListener(type, fn);
  };

  return el;
};
var removeEventListener = function removeEventListener(el, fn) {
  for (var _len2 = arguments.length, types = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    types[_key2 - 2] = arguments[_key2];
  }

  if (types.length === 0) throw new Error('at least one event name is required');

  for (var _iterator2 = types, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
    var _ref2;

    if (_isArray2) {
      if (_i2 >= _iterator2.length) break;
      _ref2 = _iterator2[_i2++];
    } else {
      _i2 = _iterator2.next();
      if (_i2.done) break;
      _ref2 = _i2.value;
    }

    var type = _ref2;

    el.removeEventListener(type, fn);
  };

  return el;
};

/**
 * @name 创建一个带有类似数组长度的Object对象
 *
 * @return 返回该对象
 */
var makeArrayLikeObject = function makeArrayLikeObject() {
  return Object.defineProperty({}, 'length', { value: 0, writable: true, enumerable: false });
};

/**
 * @name 将一个对象序列化为一个queryString字符串
 *
 * @param {Object} source * 操作的对象
 *
 * @return {String} queryString字符串
 */
export var serialize = function serialize() {
  for (var _len3 = arguments.length, sources = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    sources[_key3] = arguments[_key3];
  }

  if (sources.length === 0) return '';

  var result = [];

  for (var _iterator3 = sources, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
    var _ref3;

    if (_isArray3) {
      if (_i3 >= _iterator3.length) break;
      _ref3 = _iterator3[_i3++];
    } else {
      _i3 = _iterator3.next();
      if (_i3.done) break;
      _ref3 = _i3.value;
    }

    var source = _ref3;

    if (!isPlainObject(source)) throw new TypeError('source must b a plain Object');

    for (var key in source) {
      if (!isUndefined(source[key]) && !isNull(source[key])) result.push(key + '=' + encodeURIComponent(trim(source[key].toString())));
    };
  };

  return result.join('&');
};

/**
 * @name 将一个queryString字符串转化成一个对象
 *
 * @param {String} source * 操作的对象
 * @param {String} keys 需要返回值的key
 *
 * @return {Object} 当keys参数为空时，返回该对象，当keys参数只有一个时，则返回该对象中key为此参数的值，当keys参数有多个时，则以一个对象的形式返回该对象所有keys中的参数的值
 */
export var queryParse = function queryParse(source) {
  for (var _len4 = arguments.length, keys = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    keys[_key4 - 1] = arguments[_key4];
  }

  if (!isString(source)) throw new TypeError('source must b a String');

  var result = makeArrayLikeObject();

  forEach(source.replace(/^\?/, '').split('&'), function (string) {
    var item = string.split('=');

    result[item[0]] = item[1];
    result.length++;
  });

  if (keys.length === 0) return result;
  if (keys.length === 1) return result[keys[0]];

  var dumpData = makeArrayLikeObject();

  forEach(keys, function (key) {
    dumpData[key] = result[key];
    dumpData.length++;
  });

  return dumpData;
};

/**
 * @name 将cookie字符串转化成一个对象
 *
 * @param {String} keys 需要返回值的key
 *
 * @return {Object} 当keys参数为空时，返回该对象，当keys参数只有一个时，则返回该对象中key为此参数的值，当keys参数有多个时，则以一个对象的形式返回该对象所有keys中的参数的值
 */
export var cookieParse = function cookieParse() {
  for (var _len5 = arguments.length, keys = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    keys[_key5] = arguments[_key5];
  }

  return queryParse.apply(undefined, [document.cookie.replace(/; /g, '&')].concat(keys));
};

/**
 * @name 设置cookie
 *
 * @param {String} name * cookie名称
 * @param {String} value * cookie值
 * @param {Object} options 过期天数&其它参数
 * @param {String} options.path cookie所在路径
 * @param {String} options.domain cookie所在域
 * @param {String} options.secure cookie是否只允许在安全链接中读取
 */
export var setCookie = function setCookie(name, value) {
  for (var _len6 = arguments.length, options = Array(_len6 > 2 ? _len6 - 2 : 0), _key6 = 2; _key6 < _len6; _key6++) {
    options[_key6 - 2] = arguments[_key6];
  }

  var cookie = name + '=' + value;

  for (var _iterator4 = options, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
    var _ref4;

    if (_isArray4) {
      if (_i4 >= _iterator4.length) break;
      _ref4 = _iterator4[_i4++];
    } else {
      _i4 = _iterator4.next();
      if (_i4.done) break;
      _ref4 = _i4.value;
    }

    var option = _ref4;

    if (isPosiInteger(option)) {
      var date = new Date();
      date.setTime(date.getTime() + option * 24 * 60 * 60 * 1000);

      cookie += ';expires=' + date.toGMTString();
    };

    if (isPlainObject(option)) {
      if (option.path) cookie += ';path=' + option.path;
      if (option.domain) cookie += ';domain=' + option.domain;
      if (option.secure) cookie += ';secure=' + option.secure;
    };
  };

  document.cookie = cookie;

  return cookieParse();
};

export var Sticky = function () {
  function Sticky(target, body) {
    _classCallCheck(this, Sticky);

    this.target = target;
    this.body = body;

    this.position = window.getComputedStyle(this.target).position;

    this.bind();
    this.update();
  }

  Sticky.prototype.update = function update() {
    if (this.checkIsHit()) {
      this.target.style.position = this.position;
    } else {
      this.target.style.position = 'fixed';
    };
  };

  Sticky.prototype.checkIsHit = function checkIsHit() {
    var targetRect = this.target.getBoundingClientRect();
    var bodyRect = this.body.getBoundingClientRect();

    return window.pageYOffset + bodyRect.bottom + targetRect.height > window.innerHeight;
  };

  Sticky.prototype.bind = function bind() {
    var _this = this;

    this.event = function () {
      return _this.update();
    };

    addEventListener(window, this.event, 'resize', 'scroll');
  };

  Sticky.prototype.destroy = function destroy() {
    removeEventListener(window, this.event, 'resize', 'scroll');
  };

  return Sticky;
}();;

export var isChildNode = function isChildNode(child, parent) {
  if (child === parent) return true;
  var target = child;

  while (target && target.nodeType !== 11) {
    if (target === parent) {
      return true;
    } else {
      target = target.parentNode;
    };
  };

  return false;
};