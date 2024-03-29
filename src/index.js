
import Game from "./game.js";
import View from "./view.js";
import Controller from "./controller.js";
import closeMenu from "./burger.js";

let canvasWidth = 0
let canvasHeight = 0
const game = new Game()
//create canvas in DOM-element = root with that width and height
if (window.screen.availHeight>window.screen.availWidth){
    // canvasWidth = window.screen.availWidth
    // canvasHeight = window.screen.availWidth * 4 /3
    canvasWidth = window.screen.width
    canvasHeight = window.screen.width * 4 / 3
}else {
    canvasWidth = window.screen.availHeight /4 *3
    canvasHeight = window.screen.availHeight
}
const form1 = document.getElementById('form1')
const inp = form1.querySelector('#inp')
form1.onsubmit = evt =>{
    evt.preventDefault()
    window.userName = inp.value
    inp.textContent = ''
    closeMenu()

}
const view = new View(document.getElementById('root'),canvasWidth ,canvasHeight,20,10)
const controller = new Controller(game,view)
alert('Press F11 for better life ;)')
//define variables in window to get access them in Chrome
window.game = game
window.view = view
window.controller = controller
