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

export default drawAnimation
