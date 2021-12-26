import * as Snow from "./snow.js"

window.onload = () => {
    let settings = getTreeSettings()

    balls_AddClickEvent()
    
    startSnow(settings["snowy"])
    
}


function getBalls(){ return document.querySelectorAll(".__ball") }

function getTreeSettings() {
    let treeAttr = document.getElementById("tree")
    let size = treeAttr.getAttribute("attr_tree-size") ?? "min"
    let ballsCount = treeAttr.getAttribute("attr_balls-count") ?? "5"
    let isSnowy = treeAttr.getAttribute("attr_is-snowy") ?? true
    let isLighting = treeAttr.getAttribute("attr_is-lighting") ?? true
    isSnowy = isSnowy == 0 ? false : true
    isLighting = isLighting == 0 ? false : true
    return {
        "size": size,
        "ballsCount": parseInt(ballsCount),
        "snowy": Boolean(isSnowy),
        "lighting": Boolean(isLighting)
    }
}

function balls_AddClickEvent() {
    balls = getBalls()
    balls.forEach(ball => {
        ball.addEventListener("click", function(){
            console.log(ball)
            ball.style.backgroundColor = `rgb(${Math.random()*255}, ${Math.random()*255},${Math.random()*255})`
        })
    })
}

function startSnow(isSnowy){
    let  snow = new Snow.default({
        id: 'snow',
        theme: 'pastel',
        min_size: 1,
        max_size: 6
    })
    isSnowy ? snow.start() : null;
}

function showBalls(max_balls) {
    
}