/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _text_wrapping__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./text-wrapping */ "./src/text-wrapping.js");


let text = "Django is a high-level Python Web framework that encourages rapid development and clean, pragmatic design. Built by experienced developers, it takes care of much of the hassle of Web development, so you can focus on writing your app without needing to reinvent the wheel. It’s free and open source."
let width = 300
let fontSize = "20px"
let lineSize = 1

document.querySelector('#text').innerHTML = `文本：${text} (${text.length})`
document.querySelector('#width').innerHTML = `宽度：${width}px`
document.querySelector('#fontSize').innerHTML = `文本大小：${fontSize}`
document.querySelector('#lineSize').innerHTML = `行距：${lineSize}倍行距`

let canvas = document.querySelector('#tutorial')
let ctx = window.ctx = canvas.getContext('2d')
ctx.font = `${fontSize.toString()} serif`;

let co = 0

Object.defineProperty(ctx, "measureTextCount", {
    get: () => {
        co += 1
        return ctx.measureText
    }
})

let res = Object(_text_wrapping__WEBPACK_IMPORTED_MODULE_0__["default"])(ctx, text, width)
console.log(co)

setTimeout(() => {
    let start = new Date()
    let cc = 0
    for(let x = 0; x < 3000; x++){
        Object(_text_wrapping__WEBPACK_IMPORTED_MODULE_0__["default"])(ctx, text, width)
        cc = x
    }
    let end = new Date()
    console.log(`Performance test: ${cc + 1} times\t${(end - start)/1000}s`)
}, 0)

res.forEach((str, index) => {
    ctx.fillText(str, 0, Number.parseFloat(fontSize)*(1+index*lineSize))
})


/***/ }),

/***/ "./src/text-wrapping.js":
/*!******************************!*\
  !*** ./src/text-wrapping.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function splitText(ctx, text, width, forceSplit = false, fontSize){
    if(width < (fontSize || Number.parseFloat(ctx.font))) width = Number.parseFloat(ctx.font)
    let res = []
    let maxWidth = ctx.measureText(text).width
    if(maxWidth < width){
        res.push(text)
    } else {
        let start = 0
        let end = 0
        let predictLines = Math.round(maxWidth/width)
        let count = 0
        while(end < text.length){
            // 先判断下大概落点
            let predictEndPoint = end + Math.round(text.length/predictLines)
            let predictLength = ctx.measureText(text.substring(start, predictEndPoint)).width
            if(predictLength < width){
                let endPoint = predictEndPoint
                // 细致调节落点
                while(predictEndPoint <= text.length) {
                    predictEndPoint += 1
                    let w = ctx.measureText(text.substring(start, predictEndPoint)).width
                    if(w <= width) {
                        endPoint = predictEndPoint
                    } else {
                        break
                    }
                }

                let finalText = text.substring(start, endPoint)
                if(!forceSplit && endPoint < text.length){
                    // 英文按空格处理
                    let lastSpace = finalText.lastIndexOf(' ')
                    if((~lastSpace && lastSpace !== finalText.length - 1 && text[endPoint] !== " ") && /^\w+$/.test(finalText.substring(lastSpace + 1))){
                        endPoint -= finalText.length - (lastSpace + 1)
                        finalText = finalText.substring(0, lastSpace+1)
                    }

                    let nextLineLeftWhiteSpace = /^\s+/.exec(text.substring(endPoint))
                    if (nextLineLeftWhiteSpace){
                        endPoint += nextLineLeftWhiteSpace[0].length
                    }
                }
                res.push(finalText)
                start = endPoint
                end = endPoint
            } else if (predictLength === width) {
                let finalText = text.substring(start, predictEndPoint)
                if(!forceSplit && predictEndPoint < text.length){
                    // 英文按空格处理
                    let lastSpace = finalText.lastIndexOf(' ')
                    if((~lastSpace && lastSpace !== finalText.length - 1 && text[predictEndPoint] !== " ") && /^\w+$/.test(finalText.substring(lastSpace + 1))){
                        predictEndPoint -= finalText.length - (lastSpace + 1)
                        finalText = finalText.substring(0, lastSpace+1)
                    }

                    let nextLineLeftWhiteSpace = /^\s+/.exec(text.substring(endPoint))
                    if (nextLineLeftWhiteSpace){
                        endPoint += nextLineLeftWhiteSpace[0].length
                    }
                }
                res.push(finalText)
                start = predictEndPoint
                end = predictEndPoint
            }else {
                let endPoint = predictEndPoint
                // 细致调节落点
                while(predictEndPoint > start) {
                    predictEndPoint -= 1
                    let w = ctx.measureText(text.substring(start, predictEndPoint)).width
                    if(w <= width) {
                        endPoint = predictEndPoint
                        break
                    }
                }

                let finalText = text.substring(start, endPoint)

                if(!forceSplit && endPoint < text.length){
                    // 英文按空格处理
                    let lastSpace = finalText.lastIndexOf(' ')
                    if((~lastSpace && lastSpace !== finalText.length - 1 && text[endPoint] !== " ") && /^\w+$/.test(finalText.substring(lastSpace + 1))){
                        endPoint -= finalText.length - (lastSpace + 1)
                        finalText = finalText.substring(0, lastSpace+1)
                    }

                    let nextLineLeftWhiteSpace = /^\s+/.exec(text.substring(endPoint))
                    if (nextLineLeftWhiteSpace){
                        endPoint += nextLineLeftWhiteSpace[0].length
                    }
                }
                res.push(finalText)
                start = endPoint
                end = endPoint
            }

            count += 1
            if(count > 50) break
        }
    }

    return res
}

/* harmony default export */ __webpack_exports__["default"] = (splitText);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy90ZXh0LXdyYXBwaW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUF1Qzs7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0RBQWtELEtBQUssSUFBSSxZQUFZO0FBQ3ZFLG1EQUFtRCxNQUFNO0FBQ3pELHdEQUF3RCxTQUFTO0FBQ2pFLHNEQUFzRCxTQUFTOztBQUUvRDtBQUNBO0FBQ0EsY0FBYyxvQkFBb0I7O0FBRWxDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELFVBQVUsOERBQVM7QUFDbkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFVBQVU7QUFDNUIsUUFBUSw4REFBUztBQUNqQjtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsT0FBTyxVQUFVLG1CQUFtQjtBQUN6RSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7O0FDekNEO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVlLHdFQUFTIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImltcG9ydCBzcGxpdFRleHQgZnJvbSBcIi4vdGV4dC13cmFwcGluZ1wiXG5cbmxldCB0ZXh0ID0gXCJEamFuZ28gaXMgYSBoaWdoLWxldmVsIFB5dGhvbiBXZWIgZnJhbWV3b3JrIHRoYXQgZW5jb3VyYWdlcyByYXBpZCBkZXZlbG9wbWVudCBhbmQgY2xlYW4sIHByYWdtYXRpYyBkZXNpZ24uIEJ1aWx0IGJ5IGV4cGVyaWVuY2VkIGRldmVsb3BlcnMsIGl0IHRha2VzIGNhcmUgb2YgbXVjaCBvZiB0aGUgaGFzc2xlIG9mIFdlYiBkZXZlbG9wbWVudCwgc28geW91IGNhbiBmb2N1cyBvbiB3cml0aW5nIHlvdXIgYXBwIHdpdGhvdXQgbmVlZGluZyB0byByZWludmVudCB0aGUgd2hlZWwuIEl04oCZcyBmcmVlIGFuZCBvcGVuIHNvdXJjZS5cIlxubGV0IHdpZHRoID0gMzAwXG5sZXQgZm9udFNpemUgPSBcIjIwcHhcIlxubGV0IGxpbmVTaXplID0gMVxuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGV4dCcpLmlubmVySFRNTCA9IGDmlofmnKzvvJoke3RleHR9ICgke3RleHQubGVuZ3RofSlgXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjd2lkdGgnKS5pbm5lckhUTUwgPSBg5a695bqm77yaJHt3aWR0aH1weGBcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmb250U2l6ZScpLmlubmVySFRNTCA9IGDmlofmnKzlpKflsI/vvJoke2ZvbnRTaXplfWBcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsaW5lU2l6ZScpLmlubmVySFRNTCA9IGDooYzot53vvJoke2xpbmVTaXplfeWAjeihjOi3nWBcblxubGV0IGNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0dXRvcmlhbCcpXG5sZXQgY3R4ID0gd2luZG93LmN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpXG5jdHguZm9udCA9IGAke2ZvbnRTaXplLnRvU3RyaW5nKCl9IHNlcmlmYDtcblxubGV0IGNvID0gMFxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoY3R4LCBcIm1lYXN1cmVUZXh0Q291bnRcIiwge1xuICAgIGdldDogKCkgPT4ge1xuICAgICAgICBjbyArPSAxXG4gICAgICAgIHJldHVybiBjdHgubWVhc3VyZVRleHRcbiAgICB9XG59KVxuXG5sZXQgcmVzID0gc3BsaXRUZXh0KGN0eCwgdGV4dCwgd2lkdGgpXG5jb25zb2xlLmxvZyhjbylcblxuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgbGV0IHN0YXJ0ID0gbmV3IERhdGUoKVxuICAgIGxldCBjYyA9IDBcbiAgICBmb3IobGV0IHggPSAwOyB4IDwgMzAwMDsgeCsrKXtcbiAgICAgICAgc3BsaXRUZXh0KGN0eCwgdGV4dCwgd2lkdGgpXG4gICAgICAgIGNjID0geFxuICAgIH1cbiAgICBsZXQgZW5kID0gbmV3IERhdGUoKVxuICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtYW5jZSB0ZXN0OiAke2NjICsgMX0gdGltZXNcXHQkeyhlbmQgLSBzdGFydCkvMTAwMH1zYClcbn0sIDApXG5cbnJlcy5mb3JFYWNoKChzdHIsIGluZGV4KSA9PiB7XG4gICAgY3R4LmZpbGxUZXh0KHN0ciwgMCwgTnVtYmVyLnBhcnNlRmxvYXQoZm9udFNpemUpKigxK2luZGV4KmxpbmVTaXplKSlcbn0pXG4iLCJmdW5jdGlvbiBzcGxpdFRleHQoY3R4LCB0ZXh0LCB3aWR0aCwgZm9yY2VTcGxpdCA9IGZhbHNlLCBmb250U2l6ZSl7XG4gICAgaWYod2lkdGggPCAoZm9udFNpemUgfHwgTnVtYmVyLnBhcnNlRmxvYXQoY3R4LmZvbnQpKSkgd2lkdGggPSBOdW1iZXIucGFyc2VGbG9hdChjdHguZm9udClcbiAgICBsZXQgcmVzID0gW11cbiAgICBsZXQgbWF4V2lkdGggPSBjdHgubWVhc3VyZVRleHQodGV4dCkud2lkdGhcbiAgICBpZihtYXhXaWR0aCA8IHdpZHRoKXtcbiAgICAgICAgcmVzLnB1c2godGV4dClcbiAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgc3RhcnQgPSAwXG4gICAgICAgIGxldCBlbmQgPSAwXG4gICAgICAgIGxldCBwcmVkaWN0TGluZXMgPSBNYXRoLnJvdW5kKG1heFdpZHRoL3dpZHRoKVxuICAgICAgICBsZXQgY291bnQgPSAwXG4gICAgICAgIHdoaWxlKGVuZCA8IHRleHQubGVuZ3RoKXtcbiAgICAgICAgICAgIC8vIOWFiOWIpOaWreS4i+Wkp+amguiQveeCuVxuICAgICAgICAgICAgbGV0IHByZWRpY3RFbmRQb2ludCA9IGVuZCArIE1hdGgucm91bmQodGV4dC5sZW5ndGgvcHJlZGljdExpbmVzKVxuICAgICAgICAgICAgbGV0IHByZWRpY3RMZW5ndGggPSBjdHgubWVhc3VyZVRleHQodGV4dC5zdWJzdHJpbmcoc3RhcnQsIHByZWRpY3RFbmRQb2ludCkpLndpZHRoXG4gICAgICAgICAgICBpZihwcmVkaWN0TGVuZ3RoIDwgd2lkdGgpe1xuICAgICAgICAgICAgICAgIGxldCBlbmRQb2ludCA9IHByZWRpY3RFbmRQb2ludFxuICAgICAgICAgICAgICAgIC8vIOe7huiHtOiwg+iKguiQveeCuVxuICAgICAgICAgICAgICAgIHdoaWxlKHByZWRpY3RFbmRQb2ludCA8PSB0ZXh0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBwcmVkaWN0RW5kUG9pbnQgKz0gMVxuICAgICAgICAgICAgICAgICAgICBsZXQgdyA9IGN0eC5tZWFzdXJlVGV4dCh0ZXh0LnN1YnN0cmluZyhzdGFydCwgcHJlZGljdEVuZFBvaW50KSkud2lkdGhcbiAgICAgICAgICAgICAgICAgICAgaWYodyA8PSB3aWR0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW5kUG9pbnQgPSBwcmVkaWN0RW5kUG9pbnRcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgZmluYWxUZXh0ID0gdGV4dC5zdWJzdHJpbmcoc3RhcnQsIGVuZFBvaW50KVxuICAgICAgICAgICAgICAgIGlmKCFmb3JjZVNwbGl0ICYmIGVuZFBvaW50IDwgdGV4dC5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgICAvLyDoi7HmlofmjInnqbrmoLzlpITnkIZcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxhc3RTcGFjZSA9IGZpbmFsVGV4dC5sYXN0SW5kZXhPZignICcpXG4gICAgICAgICAgICAgICAgICAgIGlmKCh+bGFzdFNwYWNlICYmIGxhc3RTcGFjZSAhPT0gZmluYWxUZXh0Lmxlbmd0aCAtIDEgJiYgdGV4dFtlbmRQb2ludF0gIT09IFwiIFwiKSAmJiAvXlxcdyskLy50ZXN0KGZpbmFsVGV4dC5zdWJzdHJpbmcobGFzdFNwYWNlICsgMSkpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZFBvaW50IC09IGZpbmFsVGV4dC5sZW5ndGggLSAobGFzdFNwYWNlICsgMSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsVGV4dCA9IGZpbmFsVGV4dC5zdWJzdHJpbmcoMCwgbGFzdFNwYWNlKzEpXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV4dExpbmVMZWZ0V2hpdGVTcGFjZSA9IC9eXFxzKy8uZXhlYyh0ZXh0LnN1YnN0cmluZyhlbmRQb2ludCkpXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXh0TGluZUxlZnRXaGl0ZVNwYWNlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZFBvaW50ICs9IG5leHRMaW5lTGVmdFdoaXRlU3BhY2VbMF0ubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVzLnB1c2goZmluYWxUZXh0KVxuICAgICAgICAgICAgICAgIHN0YXJ0ID0gZW5kUG9pbnRcbiAgICAgICAgICAgICAgICBlbmQgPSBlbmRQb2ludFxuICAgICAgICAgICAgfSBlbHNlIGlmIChwcmVkaWN0TGVuZ3RoID09PSB3aWR0aCkge1xuICAgICAgICAgICAgICAgIGxldCBmaW5hbFRleHQgPSB0ZXh0LnN1YnN0cmluZyhzdGFydCwgcHJlZGljdEVuZFBvaW50KVxuICAgICAgICAgICAgICAgIGlmKCFmb3JjZVNwbGl0ICYmIHByZWRpY3RFbmRQb2ludCA8IHRleHQubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICAgICAgLy8g6Iux5paH5oyJ56m65qC85aSE55CGXG4gICAgICAgICAgICAgICAgICAgIGxldCBsYXN0U3BhY2UgPSBmaW5hbFRleHQubGFzdEluZGV4T2YoJyAnKVxuICAgICAgICAgICAgICAgICAgICBpZigofmxhc3RTcGFjZSAmJiBsYXN0U3BhY2UgIT09IGZpbmFsVGV4dC5sZW5ndGggLSAxICYmIHRleHRbcHJlZGljdEVuZFBvaW50XSAhPT0gXCIgXCIpICYmIC9eXFx3KyQvLnRlc3QoZmluYWxUZXh0LnN1YnN0cmluZyhsYXN0U3BhY2UgKyAxKSkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJlZGljdEVuZFBvaW50IC09IGZpbmFsVGV4dC5sZW5ndGggLSAobGFzdFNwYWNlICsgMSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsVGV4dCA9IGZpbmFsVGV4dC5zdWJzdHJpbmcoMCwgbGFzdFNwYWNlKzEpXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV4dExpbmVMZWZ0V2hpdGVTcGFjZSA9IC9eXFxzKy8uZXhlYyh0ZXh0LnN1YnN0cmluZyhlbmRQb2ludCkpXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXh0TGluZUxlZnRXaGl0ZVNwYWNlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZFBvaW50ICs9IG5leHRMaW5lTGVmdFdoaXRlU3BhY2VbMF0ubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVzLnB1c2goZmluYWxUZXh0KVxuICAgICAgICAgICAgICAgIHN0YXJ0ID0gcHJlZGljdEVuZFBvaW50XG4gICAgICAgICAgICAgICAgZW5kID0gcHJlZGljdEVuZFBvaW50XG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IGVuZFBvaW50ID0gcHJlZGljdEVuZFBvaW50XG4gICAgICAgICAgICAgICAgLy8g57uG6Ie06LCD6IqC6JC954K5XG4gICAgICAgICAgICAgICAgd2hpbGUocHJlZGljdEVuZFBvaW50ID4gc3RhcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJlZGljdEVuZFBvaW50IC09IDFcbiAgICAgICAgICAgICAgICAgICAgbGV0IHcgPSBjdHgubWVhc3VyZVRleHQodGV4dC5zdWJzdHJpbmcoc3RhcnQsIHByZWRpY3RFbmRQb2ludCkpLndpZHRoXG4gICAgICAgICAgICAgICAgICAgIGlmKHcgPD0gd2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZFBvaW50ID0gcHJlZGljdEVuZFBvaW50XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IGZpbmFsVGV4dCA9IHRleHQuc3Vic3RyaW5nKHN0YXJ0LCBlbmRQb2ludClcblxuICAgICAgICAgICAgICAgIGlmKCFmb3JjZVNwbGl0ICYmIGVuZFBvaW50IDwgdGV4dC5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgICAvLyDoi7HmlofmjInnqbrmoLzlpITnkIZcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxhc3RTcGFjZSA9IGZpbmFsVGV4dC5sYXN0SW5kZXhPZignICcpXG4gICAgICAgICAgICAgICAgICAgIGlmKCh+bGFzdFNwYWNlICYmIGxhc3RTcGFjZSAhPT0gZmluYWxUZXh0Lmxlbmd0aCAtIDEgJiYgdGV4dFtlbmRQb2ludF0gIT09IFwiIFwiKSAmJiAvXlxcdyskLy50ZXN0KGZpbmFsVGV4dC5zdWJzdHJpbmcobGFzdFNwYWNlICsgMSkpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZFBvaW50IC09IGZpbmFsVGV4dC5sZW5ndGggLSAobGFzdFNwYWNlICsgMSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsVGV4dCA9IGZpbmFsVGV4dC5zdWJzdHJpbmcoMCwgbGFzdFNwYWNlKzEpXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV4dExpbmVMZWZ0V2hpdGVTcGFjZSA9IC9eXFxzKy8uZXhlYyh0ZXh0LnN1YnN0cmluZyhlbmRQb2ludCkpXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXh0TGluZUxlZnRXaGl0ZVNwYWNlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZFBvaW50ICs9IG5leHRMaW5lTGVmdFdoaXRlU3BhY2VbMF0ubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVzLnB1c2goZmluYWxUZXh0KVxuICAgICAgICAgICAgICAgIHN0YXJ0ID0gZW5kUG9pbnRcbiAgICAgICAgICAgICAgICBlbmQgPSBlbmRQb2ludFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb3VudCArPSAxXG4gICAgICAgICAgICBpZihjb3VudCA+IDUwKSBicmVha1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc1xufVxuXG5leHBvcnQgZGVmYXVsdCBzcGxpdFRleHRcbiJdLCJzb3VyY2VSb290IjoiIn0=