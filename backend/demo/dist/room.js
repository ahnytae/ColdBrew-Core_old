/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */,
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ColdBrew": () => (/* reexport safe */ _service_Core__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "GetUserDevices": () => (/* reexport safe */ _device__WEBPACK_IMPORTED_MODULE_1__.GetUserDevices),
/* harmony export */   "GetUserDevicesError": () => (/* reexport safe */ _device__WEBPACK_IMPORTED_MODULE_1__.GetUserDevicesError)
/* harmony export */ });
/* harmony import */ var _service_Core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _device__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);


// import { SignalingController } from './signaling';



/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ColdBrew)
/* harmony export */ });
class ColdBrew {
    constructor() {
        console.log('%c HELLO ColeBrew !!', 'color: hotpink; font-size:40px; background:black');
    }
    static init() {
        return new ColdBrew();
    }
    static get MyStream() {
        return ColdBrew.MY_STREAM;
    }
    static set MyStream(stream) {
        ColdBrew.MY_STREAM = stream;
    }
    get RoomName() {
        return ColdBrew.ROOM_NAME;
    }
    set RoomName(roomName) {
        ColdBrew.ROOM_NAME = roomName;
    }
}


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GetUserDevices": () => (/* reexport safe */ _GetUserDevices__WEBPACK_IMPORTED_MODULE_0__.GetUserDevices),
/* harmony export */   "GetUserDevicesError": () => (/* reexport safe */ _GetUserDevicesError__WEBPACK_IMPORTED_MODULE_1__.GetUserDevicesError)
/* harmony export */ });
/* harmony import */ var _GetUserDevices__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _GetUserDevicesError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);





/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GetUserDevices": () => (/* binding */ GetUserDevices)
/* harmony export */ });
/* harmony import */ var _service_Core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

class GetUserDevices extends _service_Core__WEBPACK_IMPORTED_MODULE_0__["default"] {
    get currentVideoTrack() {
        const myStream = _service_Core__WEBPACK_IMPORTED_MODULE_0__["default"].MyStream;
        return myStream.getVideoTracks()[0];
    }
    static getDeviceStream(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stream = yield navigator.mediaDevices.getUserMedia(!deviceId ? GetUserDevices.constraints : { audio: true, video: { deviceId: { exact: deviceId } } });
                if (stream) {
                    _service_Core__WEBPACK_IMPORTED_MODULE_0__["default"].MyStream = stream;
                    return {
                        isError: false,
                        stream: stream,
                    };
                }
                return {
                    isError: true,
                    errorData: {
                        name: 'get media failed',
                    },
                };
            }
            catch (e) {
                if (e instanceof DOMException) {
                    return {
                        isError: true,
                        errorData: {
                            name: e.name,
                            message: e.message,
                        },
                    };
                }
                return {
                    isError: true,
                    errorData: {
                        name: 'exception failed',
                    },
                };
            }
        });
    }
    // 모든 장치 리스트 조회
    getAllDeviceLists() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const list = yield navigator.mediaDevices.enumerateDevices();
                if (list) {
                    return {
                        isError: false,
                        list: list,
                    };
                }
                return {
                    isError: true,
                    errorData: {
                        name: 'Get List failed',
                    },
                };
            }
            catch (e) {
                return {
                    isError: true,
                    errorData: {
                        name: 'Get List failed',
                    },
                };
            }
        });
    }
    // 카메라 / 마이크 장치 리스트 조회
    static getSelectDeviceList(deviceType) {
        return __awaiter(this, void 0, void 0, function* () {
            const list = yield navigator.mediaDevices.enumerateDevices();
            if (deviceType === 'video') {
                try {
                    const cameraList = list.filter(videoList => videoList.kind === 'videoinput');
                    return cameraList;
                }
                catch (_a) {
                    console.error('%c [ColdBrew] failed select get device list', 'color: red');
                }
            }
            // audio
            try {
                const audioList = list.filter(videoList => videoList.kind === 'audioinput');
                return audioList;
            }
            catch (_b) {
                console.error('%c [ColdBrew] failed select get device list', 'color: red');
            }
        });
    }
    static attachMediaStream(videoEl, stream) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                videoEl.srcObject = stream;
            }
            catch (_a) {
                console.error('%c [ColdBrew] type check video Element or stream', 'color: red');
            }
        });
    }
    // device on/off
    static changeDeviceStatus(deviceType, status) {
        const myStream = _service_Core__WEBPACK_IMPORTED_MODULE_0__["default"].MyStream;
        if (deviceType === 'video') {
            try {
                myStream.getVideoTracks().map((videoTrack) => (videoTrack.enabled = status));
            }
            catch (_a) {
                console.error('%c [ColdBrew] failed mute Mic', 'color: red');
            }
            return;
        }
        // mic
        try {
            myStream.getAudioTracks().map((audioTrack) => (audioTrack.enabled = status));
        }
        catch (_b) {
            console.error('%c [ColdBrew] failed mute Mic', 'color: red');
        }
    }
}
GetUserDevices.constraints = {
    audio: true,
    video: true,
};


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GetUserDevicesError": () => (/* binding */ GetUserDevicesError)
/* harmony export */ });
class GetUserDevicesError extends Error {
}


/***/ })
/******/ 	]);
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
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _frontend_src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);

_frontend_src_index__WEBPACK_IMPORTED_MODULE_0__.ColdBrew.init();
const videoEl = document.getElementById("myVideo");
const camToggle = document.getElementById("change-cam");
const micToggle = document.getElementById("change-mic");
const camDeviceList = document.getElementById("device-cam-list");
const micDeviceList = document.getElementById("device-mic-list");
let camStatus = true;
let micStatus = true;
const addLocalVideo = (deviceId) => {
    _frontend_src_index__WEBPACK_IMPORTED_MODULE_0__.GetUserDevices.getDeviceStream(deviceId).then((device) => {
        if (!device.isError) {
            const { stream } = device;
            _frontend_src_index__WEBPACK_IMPORTED_MODULE_0__.GetUserDevices.attachMediaStream(videoEl, stream);
        }
    });
};
addLocalVideo();
const getMicList = _frontend_src_index__WEBPACK_IMPORTED_MODULE_0__.GetUserDevices.getSelectDeviceList("mic");
getMicList.then((list) => {
    list.map((item) => {
        const option = document.createElement("option");
        option.value = item.deviceId;
        option.innerHTML = item.label;
        camDeviceList.appendChild(option);
    });
});
const getCamList = _frontend_src_index__WEBPACK_IMPORTED_MODULE_0__.GetUserDevices.getSelectDeviceList("video");
getCamList.then((list) => {
    list.map((item) => {
        const option = document.createElement("option");
        option.value = item.deviceId;
        option.innerHTML = item.label;
        micDeviceList.appendChild(option);
    });
});
// cam, mic on/off
camToggle.addEventListener("click", () => {
    camStatus = !camStatus;
    camToggle.innerHTML = `cam-${camStatus}`;
    _frontend_src_index__WEBPACK_IMPORTED_MODULE_0__.GetUserDevices.changeDeviceStatus("video", camStatus);
});
micToggle.addEventListener("click", () => {
    micStatus = !micStatus;
    micToggle.innerHTML = `mic-${micStatus}`;
    _frontend_src_index__WEBPACK_IMPORTED_MODULE_0__.GetUserDevices.changeDeviceStatus("mic", micStatus);
});
// change device function
camDeviceList.addEventListener("input", (e) => {
    const { value } = e.target;
    addLocalVideo(value);
});
micDeviceList.addEventListener("input", (e) => {
    const { value } = e.target;
    addLocalVideo(value);
});

})();

/******/ })()
;