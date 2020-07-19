export default class Database {
    static create(scoreWithTime){
        return fetch('https://tetris-17-07-20.firebaseio.com/results.json',{
            method:'POST',
            body:JSON.stringify(scoreWithTime),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(response => response.json())
            .then(response=> {
                scoreWithTime.id = response.name
                return scoreWithTime
            })
            .then(toLocalStorage)
            .then(Database.renderList)
    }
    static renderList(){
        const results = fromLocalStorage()
        const html = results.length ? results.map(toCard).join('') : '<p>Your first try</p>'
        document.getElementById('results').innerHTML = `<div class="results__title">Your Results</div><div class="results__content">${html}</div>`
    }
}
function toLocalStorage(result){
    console.log(result)
    const results = fromLocalStorage()
    console.log(results)
    results.push(result)
    localStorage.setItem('results',JSON.stringify(results))
}
function fromLocalStorage(){
    return JSON.parse( localStorage.getItem('results')) || []
}
function toCard(result){
    return `<div class="result ${getTheme()}-theme-card">
                <h3 class="${getTheme()}-theme-card__title">Result</h3>
                <div class="content ${getTheme()}-theme-card__content">
                    <p class="score">Score: <b>${result.score}</b></p>
                    <p class="date ${getTheme()}-theme-card__content__date">${new Date(result.date).toLocaleTimeString()}  ${new Date(result.date).toLocaleDateString()}</p>
                </div>     
            </div>`
}
function getTheme() {
    return document.getElementById('change-theme').dataset.theme
}