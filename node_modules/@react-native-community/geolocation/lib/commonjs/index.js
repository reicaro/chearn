"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var GeolocationModule = _interopRequireWildcard(require("./implementation"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Copyright (c) React Native Community
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
const Geolocation = {
  /**
   * Invokes the success callback once with the latest location info.  Supported
   * options: timeout (ms), maximumAge (ms), enableHighAccuracy (bool)
   * On Android, this can return almost immediately if the location is cached or
   * request an update, which might take a while.
   */
  getCurrentPosition: function (success, error, options) {
    GeolocationModule.getCurrentPosition(success, error, options);
  },

  /**
   * Invokes the success callback whenever the location changes.  Supported
   * options: timeout (ms), maximumAge (ms), enableHighAccuracy (bool), distanceFilter(m)
   */
  watchPosition: function (success, error, options) {
    return GeolocationModule.watchPosition(success, error, options);
  },

  /**
   * Clears the watch started by `watchPosition`.
   */
  clearWatch: function (watchID) {
    GeolocationModule.clearWatch(watchID);
  },

  /**
   * @deprecated `ReactNativeGeolocation.stopObserving` is deprecated. Use `ReactNativeGeolocation.clearWatch` instead.
   */
  stopObserving: function () {
    console.warn('`ReactNativeGeolocation.stopObserving` is deprecated and should not be used. Use `ReactNativeGeolocation.clearWatch` instead.');
    GeolocationModule.stopObserving();
  },
  requestAuthorization: function (success, error) {
    GeolocationModule.requestAuthorization(success, error);
  },
  setRNConfiguration: function (config) {
    GeolocationModule.setRNConfiguration(config);
  }
};
var _default = Geolocation;
exports.default = _default;
//# sourceMappingURL=index.js.map