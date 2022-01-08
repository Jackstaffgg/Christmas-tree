import * as Snow from "./snow.js"
let sizes = ["min", "med", "max"]
window.onload = () => {
    let settings = getTreeSettings()
    setDefaultFormParams(settings)

    startGarland(settings["lighting"])
    startSnow(settings["snowy"])

    showBalls(settings["ballsCount"])
    AddClickEvent()
    
    
    
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

function AddClickEvent() {
    let balls = getBalls()
    balls.forEach(ball => {
        ball.addEventListener("click", function(){
            ball.style.backgroundColor = `rgb(${Math.random()*255}, ${Math.random()*255},${Math.random()*255})`
        })
    })

    let radioSizesBtns = document.querySelectorAll(".form-radio_size-input")
    radioSizesBtns.forEach(btn => {
        btn.addEventListener("click", function(){
            updateBallsLimit(btn.previousElementSibling.value)
        })
        
    })

}

function startSnow(isSnowy){
    let snow = new Snow.default({
        id: 'snow',
        theme: 'pastel',
        min_size: 1,
        max_size: 6
    })
    isSnowy ? snow.start() : null;
}

function showBalls(max_balls) {
    let balls = getBalls()
    for(let i = 0; i < max_balls; i++){
        balls[i].style.display = "block"
    }
}

function updateBallsLimit(value) {
    let input = document.getElementById("balls-count-number")
    input.setAttribute("max", 9+2*(value-1))
    input.value = 1
}

function setDefaultFormParams(params) {
    document.querySelectorAll(".form-radio_size-input")[params["size"]-1].previousElementSibling.setAttribute("checked", "checked")
    document.getElementById("balls-count-number").value = params["ballsCount"]
    params["lighting"] ? document.getElementById("checkbox-lighting").setAttribute("checked", "checked") : null
    params["snowy"] ? document.getElementById("checkbox-snowy").setAttribute("checked", "checked") : null
}

function startGarland(isLighting){
    if (!isLighting){
        function _off(x){x.setAttribute("class", "bulb-off")}
        document.querySelectorAll(".tree-triangle1-garland circle").forEach(el => _off(el))
        document.querySelectorAll(".tree-triangle2-garland circle").forEach(el => _off(el))
        document.querySelectorAll(".tree-triangle3-garland circle").forEach(el => _off(el))

    }
}