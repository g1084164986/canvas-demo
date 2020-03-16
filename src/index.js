import splitText from "./text-wrapping"
import drawAnimation from "./draw-animation"

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

let res = splitText(ctx, text, width)
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
    drawAnimation(ctx, t, 150)
}, 1000)
