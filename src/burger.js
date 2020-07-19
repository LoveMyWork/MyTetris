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
        closeMenu()
    }
}
themeBtn.onclick =function () {
    // themeBtn.dataset.theme = themeBtn.dataset.theme == 'dark' ? 'light' : 'dark'
    const theme = themeBtn.dataset.theme
    if(theme == 'dark'){
        this.classList.remove('change-theme--dark')
        this.classList.add('change-theme--light')
        themeBtn.dataset.theme ='light'
    }else if(theme == 'light'){
        this.classList.remove('change-theme--light')
        this.classList.add('change-theme--brown')
        burger.classList.add('change-theme--brown')
        themeBtn.dataset.theme = 'brown'
    }else {
        burger.classList.remove('change-theme--brown')
        this.classList.remove('change-theme--brown')
        this.classList.add('change-theme--dark')
        themeBtn.dataset.theme = 'dark'
    }
    // this.classList.toggle('change-theme--dark')
    // this.classList.toggle('change-theme--light')
}
export default function closeMenu(){
    burger.classList.remove('menu__btn-open')
    results.classList.remove('results-open')
    overlay.classList.remove('overlay-open')
}