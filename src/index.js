let text = "this is a test this is a test this is a test this is a test this is a test this is a test this is a test this is a test "
let width = 300
let fontSize = "30px"
let lineSize = 1.5

document.querySelector('#text').innerHTML = `文本：${text} (${text.length})`
document.querySelector('#width').innerHTML = `宽度：${width}px`
document.querySelector('#fontSize').innerHTML = `文本大小：${fontSize}`
document.querySelector('#lineSize').innerHTML = `行距：${lineSize}倍行距`

let canvas = document.querySelector('#tutorial')
let ctx = window.ctx = canvas.getContext('2d')
ctx.font = `${fontSize.toString()} serif`;

function splitText(ctx, text, width, forceSplit = false, fontSize){
    if(width < (fontSize || Number.parseFloat(ctx.font))) width = Number.parseFloat(ctx.font)
    let res = []
    let maxWidth = ctx.measureText(text).width
    if(maxWidth < width){
        res.push(text)
    } else {
        let start = 0
        let end = 0
        let predictLines = Number.parseInt(maxWidth/width)
        let count = 0
        while(end < text.length){
            // 先判断下大概落点
            let predictEndPoint = end + Number.parseInt(text.length/predictLines) + 1
            if(ctx.measureText(text.substring(start, predictEndPoint)).width < width){
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
                }
                res.push(finalText)
                start = endPoint
                end = endPoint
            } else {
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
                }
                res.push(finalText.trimLeft())
                start = endPoint
                end = endPoint
            }

            count += 1
            if(count > 50) break
        }
    }

    return res
}

let res = splitText(ctx, text, width)

res.forEach((str, index) => {
    ctx.fillText(str, 0, Number.parseFloat(fontSize)*(1+index*lineSize))
})
