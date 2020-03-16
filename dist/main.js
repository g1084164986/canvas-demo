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

/***/ "./src/draw-animation.js":
/*!*******************************!*\
  !*** ./src/draw-animation.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function drawAnimation(ctx, animate, till = 100){
    let res, rej
    let p = new Promise(function(resolve, reject){
        res = resolve
        rej = reject
    })

    function quinticOut(time) {
        time -= 1.0;
        return time * time * time * time * time + 1.0;
    }

    let start = 0
    function drawDot (ctx, params) {
        let oriStyle = ctx.fillStyle
        ctx.fillStyle = "white"
        ctx.fillRect(params[0] + params[2] - 4, params[1] + params[3] - 4, 8, 8)
        ctx.fillStyle = oriStyle
        ctx.fillRect(params[0] + params[2] - 3, params[1] + params[3] - 3, 6, 6)
    }
    function drawFrame(timeStamp){
        if(!start) start = timeStamp
        let distance = timeStamp - start
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        let oriStyle = ctx.fillStyle
        ctx.fillStyle = animate.dotStyle
        if(distance < till) {
            let step = quinticOut(distance/till)
            let params = [
                animate.from[0] + step * (animate.to[0] - animate.from[0]),
                animate.from[1] + step * (animate.to[1] - animate.from[1]),
                animate.from[2] + step * (animate.to[2] - animate.from[2]),
                animate.from[3] + step * (animate.to[3] - animate.from[3])
            ]
            ctx.strokeRect(...params)
            if (animate.showDot) {
                drawDot(ctx, params)
            }
            requestAnimationFrame(drawFrame)
        } else {
            ctx.strokeRect(...animate.to)
            if (animate.showDot) drawDot(ctx, animate.to)
            res()
        }
        ctx.fillStyle = oriStyle
    }
    if(requestAnimationFrame) requestAnimationFrame(drawFrame)
    else {
        till = -1
        drawFrame()
    }
    return p
}

/* harmony default export */ __webpack_exports__["default"] = (drawAnimation);


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _text_wrapping__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./text-wrapping */ "./src/text-wrapping.js");
/* harmony import */ var _draw_animation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./draw-animation */ "./src/draw-animation.js");



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

// setTimeout(() => {
//     let start = new Date()
//     let cc = 0
//     for(let x = 0; x < 3000; x++){
//         splitText(ctx, text, width)
//         cc = x
//     }
//     let end = new Date()
//     console.log(`Performance test: ${cc + 1} times\t${(end - start)/1000}s`)
// }, 0)

res.forEach((str, index) => {
    ctx.fillText(str, 0, Number.parseFloat(fontSize)*(1+index*lineSize))
})

let tFrom = [10, 10, 10, 10]

setInterval(() => {
    let t = {
        from: tFrom,
        to: [Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 200), Math.round(Math.random() * 200)],
        showDot: Number.parseInt(Math.random() * 2) || true,
        dotStyle: '#227346'
    }

    tFrom = t.to
    let canvas = document.querySelector('#animation')
    let ctx = window.ctx1 = canvas.getContext('2d')
    ctx1.lineWidth = 2
    ctx1.strokeStyle = '#227346'
    ctx1.fillStyle = 'blue'
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    Object(_draw_animation__WEBPACK_IMPORTED_MODULE_1__["default"])(ctx, t, 150)
}, 1000)


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RyYXctYW5pbWF0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdGV4dC13cmFwcGluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlLDRFQUFhOzs7Ozs7Ozs7Ozs7O0FDdEQ1QjtBQUFBO0FBQUE7QUFBdUM7QUFDSzs7QUFFNUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0RBQWtELEtBQUssSUFBSSxZQUFZO0FBQ3ZFLG1EQUFtRCxNQUFNO0FBQ3pELHdEQUF3RCxTQUFTO0FBQ2pFLHNEQUFzRCxTQUFTOztBQUUvRDtBQUNBO0FBQ0EsY0FBYyxvQkFBb0I7O0FBRWxDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELFVBQVUsOERBQVM7QUFDbkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLFVBQVU7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsT0FBTyxVQUFVLG1CQUFtQjtBQUM1RSxJQUFJOztBQUVKO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSwrREFBYTtBQUNqQixDQUFDOzs7Ozs7Ozs7Ozs7O0FDOUREO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVlLHdFQUFTIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImZ1bmN0aW9uIGRyYXdBbmltYXRpb24oY3R4LCBhbmltYXRlLCB0aWxsID0gMTAwKXtcbiAgICBsZXQgcmVzLCByZWpcbiAgICBsZXQgcCA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XG4gICAgICAgIHJlcyA9IHJlc29sdmVcbiAgICAgICAgcmVqID0gcmVqZWN0XG4gICAgfSlcblxuICAgIGZ1bmN0aW9uIHF1aW50aWNPdXQodGltZSkge1xuICAgICAgICB0aW1lIC09IDEuMDtcbiAgICAgICAgcmV0dXJuIHRpbWUgKiB0aW1lICogdGltZSAqIHRpbWUgKiB0aW1lICsgMS4wO1xuICAgIH1cblxuICAgIGxldCBzdGFydCA9IDBcbiAgICBmdW5jdGlvbiBkcmF3RG90IChjdHgsIHBhcmFtcykge1xuICAgICAgICBsZXQgb3JpU3R5bGUgPSBjdHguZmlsbFN0eWxlXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIndoaXRlXCJcbiAgICAgICAgY3R4LmZpbGxSZWN0KHBhcmFtc1swXSArIHBhcmFtc1syXSAtIDQsIHBhcmFtc1sxXSArIHBhcmFtc1szXSAtIDQsIDgsIDgpXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBvcmlTdHlsZVxuICAgICAgICBjdHguZmlsbFJlY3QocGFyYW1zWzBdICsgcGFyYW1zWzJdIC0gMywgcGFyYW1zWzFdICsgcGFyYW1zWzNdIC0gMywgNiwgNilcbiAgICB9XG4gICAgZnVuY3Rpb24gZHJhd0ZyYW1lKHRpbWVTdGFtcCl7XG4gICAgICAgIGlmKCFzdGFydCkgc3RhcnQgPSB0aW1lU3RhbXBcbiAgICAgICAgbGV0IGRpc3RhbmNlID0gdGltZVN0YW1wIC0gc3RhcnRcbiAgICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjdHguY2FudmFzLndpZHRoLCBjdHguY2FudmFzLmhlaWdodClcbiAgICAgICAgbGV0IG9yaVN0eWxlID0gY3R4LmZpbGxTdHlsZVxuICAgICAgICBjdHguZmlsbFN0eWxlID0gYW5pbWF0ZS5kb3RTdHlsZVxuICAgICAgICBpZihkaXN0YW5jZSA8IHRpbGwpIHtcbiAgICAgICAgICAgIGxldCBzdGVwID0gcXVpbnRpY091dChkaXN0YW5jZS90aWxsKVxuICAgICAgICAgICAgbGV0IHBhcmFtcyA9IFtcbiAgICAgICAgICAgICAgICBhbmltYXRlLmZyb21bMF0gKyBzdGVwICogKGFuaW1hdGUudG9bMF0gLSBhbmltYXRlLmZyb21bMF0pLFxuICAgICAgICAgICAgICAgIGFuaW1hdGUuZnJvbVsxXSArIHN0ZXAgKiAoYW5pbWF0ZS50b1sxXSAtIGFuaW1hdGUuZnJvbVsxXSksXG4gICAgICAgICAgICAgICAgYW5pbWF0ZS5mcm9tWzJdICsgc3RlcCAqIChhbmltYXRlLnRvWzJdIC0gYW5pbWF0ZS5mcm9tWzJdKSxcbiAgICAgICAgICAgICAgICBhbmltYXRlLmZyb21bM10gKyBzdGVwICogKGFuaW1hdGUudG9bM10gLSBhbmltYXRlLmZyb21bM10pXG4gICAgICAgICAgICBdXG4gICAgICAgICAgICBjdHguc3Ryb2tlUmVjdCguLi5wYXJhbXMpXG4gICAgICAgICAgICBpZiAoYW5pbWF0ZS5zaG93RG90KSB7XG4gICAgICAgICAgICAgICAgZHJhd0RvdChjdHgsIHBhcmFtcylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3RnJhbWUpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjdHguc3Ryb2tlUmVjdCguLi5hbmltYXRlLnRvKVxuICAgICAgICAgICAgaWYgKGFuaW1hdGUuc2hvd0RvdCkgZHJhd0RvdChjdHgsIGFuaW1hdGUudG8pXG4gICAgICAgICAgICByZXMoKVxuICAgICAgICB9XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBvcmlTdHlsZVxuICAgIH1cbiAgICBpZihyZXF1ZXN0QW5pbWF0aW9uRnJhbWUpIHJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3RnJhbWUpXG4gICAgZWxzZSB7XG4gICAgICAgIHRpbGwgPSAtMVxuICAgICAgICBkcmF3RnJhbWUoKVxuICAgIH1cbiAgICByZXR1cm4gcFxufVxuXG5leHBvcnQgZGVmYXVsdCBkcmF3QW5pbWF0aW9uXG4iLCJpbXBvcnQgc3BsaXRUZXh0IGZyb20gXCIuL3RleHQtd3JhcHBpbmdcIlxuaW1wb3J0IGRyYXdBbmltYXRpb24gZnJvbSBcIi4vZHJhdy1hbmltYXRpb25cIlxuXG5sZXQgdGV4dCA9IFwiRGphbmdvIGlzIGEgaGlnaC1sZXZlbCBQeXRob24gV2ViIGZyYW1ld29yayB0aGF0IGVuY291cmFnZXMgcmFwaWQgZGV2ZWxvcG1lbnQgYW5kIGNsZWFuLCBwcmFnbWF0aWMgZGVzaWduLiBCdWlsdCBieSBleHBlcmllbmNlZCBkZXZlbG9wZXJzLCBpdCB0YWtlcyBjYXJlIG9mIG11Y2ggb2YgdGhlIGhhc3NsZSBvZiBXZWIgZGV2ZWxvcG1lbnQsIHNvIHlvdSBjYW4gZm9jdXMgb24gd3JpdGluZyB5b3VyIGFwcCB3aXRob3V0IG5lZWRpbmcgdG8gcmVpbnZlbnQgdGhlIHdoZWVsLiBJdOKAmXMgZnJlZSBhbmQgb3BlbiBzb3VyY2UuXCJcbmxldCB3aWR0aCA9IDMwMFxubGV0IGZvbnRTaXplID0gXCIyMHB4XCJcbmxldCBsaW5lU2l6ZSA9IDFcblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RleHQnKS5pbm5lckhUTUwgPSBg5paH5pys77yaJHt0ZXh0fSAoJHt0ZXh0Lmxlbmd0aH0pYFxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dpZHRoJykuaW5uZXJIVE1MID0gYOWuveW6pu+8miR7d2lkdGh9cHhgXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZm9udFNpemUnKS5pbm5lckhUTUwgPSBg5paH5pys5aSn5bCP77yaJHtmb250U2l6ZX1gXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbGluZVNpemUnKS5pbm5lckhUTUwgPSBg6KGM6Led77yaJHtsaW5lU2l6ZX3lgI3ooYzot51gXG5cbmxldCBjYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdHV0b3JpYWwnKVxubGV0IGN0eCA9IHdpbmRvdy5jdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxuY3R4LmZvbnQgPSBgJHtmb250U2l6ZS50b1N0cmluZygpfSBzZXJpZmA7XG5cbmxldCBjbyA9IDBcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGN0eCwgXCJtZWFzdXJlVGV4dENvdW50XCIsIHtcbiAgICBnZXQ6ICgpID0+IHtcbiAgICAgICAgY28gKz0gMVxuICAgICAgICByZXR1cm4gY3R4Lm1lYXN1cmVUZXh0XG4gICAgfVxufSlcblxubGV0IHJlcyA9IHNwbGl0VGV4dChjdHgsIHRleHQsIHdpZHRoKVxuY29uc29sZS5sb2coY28pXG5cbi8vIHNldFRpbWVvdXQoKCkgPT4ge1xuLy8gICAgIGxldCBzdGFydCA9IG5ldyBEYXRlKClcbi8vICAgICBsZXQgY2MgPSAwXG4vLyAgICAgZm9yKGxldCB4ID0gMDsgeCA8IDMwMDA7IHgrKyl7XG4vLyAgICAgICAgIHNwbGl0VGV4dChjdHgsIHRleHQsIHdpZHRoKVxuLy8gICAgICAgICBjYyA9IHhcbi8vICAgICB9XG4vLyAgICAgbGV0IGVuZCA9IG5ldyBEYXRlKClcbi8vICAgICBjb25zb2xlLmxvZyhgUGVyZm9ybWFuY2UgdGVzdDogJHtjYyArIDF9IHRpbWVzXFx0JHsoZW5kIC0gc3RhcnQpLzEwMDB9c2ApXG4vLyB9LCAwKVxuXG5yZXMuZm9yRWFjaCgoc3RyLCBpbmRleCkgPT4ge1xuICAgIGN0eC5maWxsVGV4dChzdHIsIDAsIE51bWJlci5wYXJzZUZsb2F0KGZvbnRTaXplKSooMStpbmRleCpsaW5lU2l6ZSkpXG59KVxuXG5sZXQgdEZyb20gPSBbMTAsIDEwLCAxMCwgMTBdXG5cbnNldEludGVydmFsKCgpID0+IHtcbiAgICBsZXQgdCA9IHtcbiAgICAgICAgZnJvbTogdEZyb20sXG4gICAgICAgIHRvOiBbTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMTAwKSwgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMTAwKSwgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMjAwKSwgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMjAwKV0sXG4gICAgICAgIHNob3dEb3Q6IE51bWJlci5wYXJzZUludChNYXRoLnJhbmRvbSgpICogMikgfHwgdHJ1ZSxcbiAgICAgICAgZG90U3R5bGU6ICcjMjI3MzQ2J1xuICAgIH1cblxuICAgIHRGcm9tID0gdC50b1xuICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYW5pbWF0aW9uJylcbiAgICBsZXQgY3R4ID0gd2luZG93LmN0eDEgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxuICAgIGN0eDEubGluZVdpZHRoID0gMlxuICAgIGN0eDEuc3Ryb2tlU3R5bGUgPSAnIzIyNzM0NidcbiAgICBjdHgxLmZpbGxTdHlsZSA9ICdibHVlJ1xuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KVxuICAgIGRyYXdBbmltYXRpb24oY3R4LCB0LCAxNTApXG59LCAxMDAwKVxuIiwiZnVuY3Rpb24gc3BsaXRUZXh0KGN0eCwgdGV4dCwgd2lkdGgsIGZvcmNlU3BsaXQgPSBmYWxzZSwgZm9udFNpemUpe1xuICAgIGlmKHdpZHRoIDwgKGZvbnRTaXplIHx8IE51bWJlci5wYXJzZUZsb2F0KGN0eC5mb250KSkpIHdpZHRoID0gTnVtYmVyLnBhcnNlRmxvYXQoY3R4LmZvbnQpXG4gICAgbGV0IHJlcyA9IFtdXG4gICAgbGV0IG1heFdpZHRoID0gY3R4Lm1lYXN1cmVUZXh0KHRleHQpLndpZHRoXG4gICAgaWYobWF4V2lkdGggPCB3aWR0aCl7XG4gICAgICAgIHJlcy5wdXNoKHRleHQpXG4gICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHN0YXJ0ID0gMFxuICAgICAgICBsZXQgZW5kID0gMFxuICAgICAgICBsZXQgcHJlZGljdExpbmVzID0gTWF0aC5yb3VuZChtYXhXaWR0aC93aWR0aClcbiAgICAgICAgbGV0IGNvdW50ID0gMFxuICAgICAgICB3aGlsZShlbmQgPCB0ZXh0Lmxlbmd0aCl7XG4gICAgICAgICAgICAvLyDlhYjliKTmlq3kuIvlpKfmpoLokL3ngrlcbiAgICAgICAgICAgIGxldCBwcmVkaWN0RW5kUG9pbnQgPSBlbmQgKyBNYXRoLnJvdW5kKHRleHQubGVuZ3RoL3ByZWRpY3RMaW5lcylcbiAgICAgICAgICAgIGxldCBwcmVkaWN0TGVuZ3RoID0gY3R4Lm1lYXN1cmVUZXh0KHRleHQuc3Vic3RyaW5nKHN0YXJ0LCBwcmVkaWN0RW5kUG9pbnQpKS53aWR0aFxuICAgICAgICAgICAgaWYocHJlZGljdExlbmd0aCA8IHdpZHRoKXtcbiAgICAgICAgICAgICAgICBsZXQgZW5kUG9pbnQgPSBwcmVkaWN0RW5kUG9pbnRcbiAgICAgICAgICAgICAgICAvLyDnu4boh7TosIPoioLokL3ngrlcbiAgICAgICAgICAgICAgICB3aGlsZShwcmVkaWN0RW5kUG9pbnQgPD0gdGV4dC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJlZGljdEVuZFBvaW50ICs9IDFcbiAgICAgICAgICAgICAgICAgICAgbGV0IHcgPSBjdHgubWVhc3VyZVRleHQodGV4dC5zdWJzdHJpbmcoc3RhcnQsIHByZWRpY3RFbmRQb2ludCkpLndpZHRoXG4gICAgICAgICAgICAgICAgICAgIGlmKHcgPD0gd2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZFBvaW50ID0gcHJlZGljdEVuZFBvaW50XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IGZpbmFsVGV4dCA9IHRleHQuc3Vic3RyaW5nKHN0YXJ0LCBlbmRQb2ludClcbiAgICAgICAgICAgICAgICBpZighZm9yY2VTcGxpdCAmJiBlbmRQb2ludCA8IHRleHQubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICAgICAgLy8g6Iux5paH5oyJ56m65qC85aSE55CGXG4gICAgICAgICAgICAgICAgICAgIGxldCBsYXN0U3BhY2UgPSBmaW5hbFRleHQubGFzdEluZGV4T2YoJyAnKVxuICAgICAgICAgICAgICAgICAgICBpZigofmxhc3RTcGFjZSAmJiBsYXN0U3BhY2UgIT09IGZpbmFsVGV4dC5sZW5ndGggLSAxICYmIHRleHRbZW5kUG9pbnRdICE9PSBcIiBcIikgJiYgL15cXHcrJC8udGVzdChmaW5hbFRleHQuc3Vic3RyaW5nKGxhc3RTcGFjZSArIDEpKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbmRQb2ludCAtPSBmaW5hbFRleHQubGVuZ3RoIC0gKGxhc3RTcGFjZSArIDEpXG4gICAgICAgICAgICAgICAgICAgICAgICBmaW5hbFRleHQgPSBmaW5hbFRleHQuc3Vic3RyaW5nKDAsIGxhc3RTcGFjZSsxKVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IG5leHRMaW5lTGVmdFdoaXRlU3BhY2UgPSAvXlxccysvLmV4ZWModGV4dC5zdWJzdHJpbmcoZW5kUG9pbnQpKVxuICAgICAgICAgICAgICAgICAgICBpZiAobmV4dExpbmVMZWZ0V2hpdGVTcGFjZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbmRQb2ludCArPSBuZXh0TGluZUxlZnRXaGl0ZVNwYWNlWzBdLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlcy5wdXNoKGZpbmFsVGV4dClcbiAgICAgICAgICAgICAgICBzdGFydCA9IGVuZFBvaW50XG4gICAgICAgICAgICAgICAgZW5kID0gZW5kUG9pbnRcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocHJlZGljdExlbmd0aCA9PT0gd2lkdGgpIHtcbiAgICAgICAgICAgICAgICBsZXQgZmluYWxUZXh0ID0gdGV4dC5zdWJzdHJpbmcoc3RhcnQsIHByZWRpY3RFbmRQb2ludClcbiAgICAgICAgICAgICAgICBpZighZm9yY2VTcGxpdCAmJiBwcmVkaWN0RW5kUG9pbnQgPCB0ZXh0Lmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgICAgIC8vIOiLseaWh+aMieepuuagvOWkhOeQhlxuICAgICAgICAgICAgICAgICAgICBsZXQgbGFzdFNwYWNlID0gZmluYWxUZXh0Lmxhc3RJbmRleE9mKCcgJylcbiAgICAgICAgICAgICAgICAgICAgaWYoKH5sYXN0U3BhY2UgJiYgbGFzdFNwYWNlICE9PSBmaW5hbFRleHQubGVuZ3RoIC0gMSAmJiB0ZXh0W3ByZWRpY3RFbmRQb2ludF0gIT09IFwiIFwiKSAmJiAvXlxcdyskLy50ZXN0KGZpbmFsVGV4dC5zdWJzdHJpbmcobGFzdFNwYWNlICsgMSkpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZWRpY3RFbmRQb2ludCAtPSBmaW5hbFRleHQubGVuZ3RoIC0gKGxhc3RTcGFjZSArIDEpXG4gICAgICAgICAgICAgICAgICAgICAgICBmaW5hbFRleHQgPSBmaW5hbFRleHQuc3Vic3RyaW5nKDAsIGxhc3RTcGFjZSsxKVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IG5leHRMaW5lTGVmdFdoaXRlU3BhY2UgPSAvXlxccysvLmV4ZWModGV4dC5zdWJzdHJpbmcoZW5kUG9pbnQpKVxuICAgICAgICAgICAgICAgICAgICBpZiAobmV4dExpbmVMZWZ0V2hpdGVTcGFjZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbmRQb2ludCArPSBuZXh0TGluZUxlZnRXaGl0ZVNwYWNlWzBdLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlcy5wdXNoKGZpbmFsVGV4dClcbiAgICAgICAgICAgICAgICBzdGFydCA9IHByZWRpY3RFbmRQb2ludFxuICAgICAgICAgICAgICAgIGVuZCA9IHByZWRpY3RFbmRQb2ludFxuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBlbmRQb2ludCA9IHByZWRpY3RFbmRQb2ludFxuICAgICAgICAgICAgICAgIC8vIOe7huiHtOiwg+iKguiQveeCuVxuICAgICAgICAgICAgICAgIHdoaWxlKHByZWRpY3RFbmRQb2ludCA+IHN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgIHByZWRpY3RFbmRQb2ludCAtPSAxXG4gICAgICAgICAgICAgICAgICAgIGxldCB3ID0gY3R4Lm1lYXN1cmVUZXh0KHRleHQuc3Vic3RyaW5nKHN0YXJ0LCBwcmVkaWN0RW5kUG9pbnQpKS53aWR0aFxuICAgICAgICAgICAgICAgICAgICBpZih3IDw9IHdpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbmRQb2ludCA9IHByZWRpY3RFbmRQb2ludFxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBmaW5hbFRleHQgPSB0ZXh0LnN1YnN0cmluZyhzdGFydCwgZW5kUG9pbnQpXG5cbiAgICAgICAgICAgICAgICBpZighZm9yY2VTcGxpdCAmJiBlbmRQb2ludCA8IHRleHQubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICAgICAgLy8g6Iux5paH5oyJ56m65qC85aSE55CGXG4gICAgICAgICAgICAgICAgICAgIGxldCBsYXN0U3BhY2UgPSBmaW5hbFRleHQubGFzdEluZGV4T2YoJyAnKVxuICAgICAgICAgICAgICAgICAgICBpZigofmxhc3RTcGFjZSAmJiBsYXN0U3BhY2UgIT09IGZpbmFsVGV4dC5sZW5ndGggLSAxICYmIHRleHRbZW5kUG9pbnRdICE9PSBcIiBcIikgJiYgL15cXHcrJC8udGVzdChmaW5hbFRleHQuc3Vic3RyaW5nKGxhc3RTcGFjZSArIDEpKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbmRQb2ludCAtPSBmaW5hbFRleHQubGVuZ3RoIC0gKGxhc3RTcGFjZSArIDEpXG4gICAgICAgICAgICAgICAgICAgICAgICBmaW5hbFRleHQgPSBmaW5hbFRleHQuc3Vic3RyaW5nKDAsIGxhc3RTcGFjZSsxKVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IG5leHRMaW5lTGVmdFdoaXRlU3BhY2UgPSAvXlxccysvLmV4ZWModGV4dC5zdWJzdHJpbmcoZW5kUG9pbnQpKVxuICAgICAgICAgICAgICAgICAgICBpZiAobmV4dExpbmVMZWZ0V2hpdGVTcGFjZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbmRQb2ludCArPSBuZXh0TGluZUxlZnRXaGl0ZVNwYWNlWzBdLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlcy5wdXNoKGZpbmFsVGV4dClcbiAgICAgICAgICAgICAgICBzdGFydCA9IGVuZFBvaW50XG4gICAgICAgICAgICAgICAgZW5kID0gZW5kUG9pbnRcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY291bnQgKz0gMVxuICAgICAgICAgICAgaWYoY291bnQgPiA1MCkgYnJlYWtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXNcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3BsaXRUZXh0XG4iXSwic291cmNlUm9vdCI6IiJ9