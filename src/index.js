import splitText from "./text-wrapping"

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

setTimeout(() => {
    let start = new Date()
    let cc = 0
    for(let x = 0; x < 3000; x++){
        splitText(ctx, text, width)
        cc = x
    }
    let end = new Date()
    console.log(`Performance test: ${cc + 1} times\t${(end - start)/1000}s`)
}, 0)

res.forEach((str, index) => {
    ctx.fillText(str, 0, Number.parseFloat(fontSize)*(1+index*lineSize))
})
