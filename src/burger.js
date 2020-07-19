//where we write results
const results = document.getElementById('results')
//burger btn
const burger =document.getElementById('burger')
//dark screen while looking on results
const overlay = document.getElementById('overlay')
//change-theme btn
const themeBtn = document.getElementById('change-theme')

burger.onclick = function () {
    this.classList.toggle('menu__btn-open')
    results.classList.toggle('results-open')
    overlay.classList.toggle('overlay-open')
}
document.body.onclick = (evt) => {
    if(!evt.target.dataset.overlay){
        burger.classList.remove('menu__btn-open')
        results.classList.remove('results-open')
        overlay.classList.remove('overlay-open')
    }
}
themeBtn.onclick =function () {
    themeBtn.dataset.theme = themeBtn.dataset.theme == 'dark' ? 'light' : 'dark'
    this.classList.toggle('change-theme--dark')
    this.classList.toggle('change-theme--light')
}