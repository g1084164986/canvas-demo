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

export default splitText
