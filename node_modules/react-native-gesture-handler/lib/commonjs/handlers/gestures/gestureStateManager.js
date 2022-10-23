"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GestureStateManager = void 0;

var _reanimatedWrapper = require("./reanimatedWrapper");

var _State = require("../../State");

var _utils = require("../../utils");

const warningMessage = (0, _utils.tagMessage)('react-native-reanimated is required in order to use synchronous state management');
const GestureStateManager = {
  create(handlerTag) {
    'worklet';

    return {
      begin: () => {
        'worklet';

        if (_reanimatedWrapper.Reanimated) {
          _reanimatedWrapper.Reanimated.setGestureState(handlerTag, _State.State.BEGAN);
        } else {
          console.warn(warningMessage);
        }
      },
      activate: () => {
        'worklet';

        if (_reanimatedWrapper.Reanimated) {
          _reanimatedWrapper.Reanimated.setGestureState(handlerTag, _State.State.ACTIVE);
        } else {
          console.warn(warningMessage);
        }
      },
      fail: () => {
        'worklet';

        if (_reanimatedWrapper.Reanimated) {
          _reanimatedWrapper.Reanimated.setGestureState(handlerTag, _State.State.FAILED);
        } else {
          console.warn(warningMessage);
        }
      },
      end: () => {
        'worklet';

        if (_reanimatedWrapper.Reanimated) {
          _reanimatedWrapper.Reanimated.setGestureState(handlerTag, _State.State.END);
        } else {
          console.warn(warningMessage);
        }
      }
    };
  }

};
exports.GestureStateManager = GestureStateManager;
//# sourceMappingURL=gestureStateManager.js.map