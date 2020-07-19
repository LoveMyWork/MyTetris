import Database from "./database.js";

export default class Controller {
    constructor(game, view, database) {
        this.isPlaying = false
        this.intervalId = null
        this.game = game
        this.database = database
        this.restarted = true
//turn on controllers
        //bind because 'this' in our handler refers on document , but 'this' in bind refers on instance of Controller because code there is in constructor of class Controller
        document.addEventListener('keydown', this.handleKeyDown.bind(this))
        document.addEventListener('keyup', this.handleKeyUp.bind(this))
//start our game
        view.renderStartScreen()

    }

    updateView() {
        const state = game.getState()
        if (!state.gameOver) {
            view.renderMainScreen(game.getState())
        } else {
            this.isPlaying = false
            this.restarted = false
            this.stopTimer()
            view.renderGameOverScreen(state.score)
            Database.create({
                score: state.score,
                date: new Date().toJSON()
            })
        }

    }

// play and pause
    play() {
        this.isPlaying = true
        this.startTimer()
        this.updateView()
    }

    pause() {
        this.isPlaying = false
        this.stopTimer()
        this.updateView()
    }

// timer
    update() {
        game.moveDown()
        this.updateView()
    }

    startTimer() {
        let speed = 1000 - this.game.getState().level * 100
        if (!this.intervalId) {
            this.intervalId = setInterval(() => {
                this.update()
            }, speed > 0 ? speed : 100)
        }
    }

    stopTimer() {
        if (this.intervalId) {
            clearInterval(this.intervalId)
            this.intervalId = null
        }
    }

// restart game
    reset() {
        this.game.resetProperties()
        this.play()
    }


// Оработка кликов
    handleKeyDown(evt) {
        switch (evt.keyCode) {
            case 13 : //Enter
                if (!this.isPlaying && this.restarted) {
                    this.play()
                    this.restarted = false
                }
                break
            case 27 : //Esc
                if (this.isPlaying) {
                    this.pause()
                    view.renderPauseScreen()
                    this.restarted = true
                }
                break
            case 37 : //LEFT arrow
                if (this.isPlaying) {
                    game.moveLeft()
                    this.updateView()
                }
                break
            case 38 : //UP arrow
                if (this.isPlaying) {
                    game.rotatePiece()
                    this.updateView()
                }
                break
            case 39 : //RIGHT arrow
                if (this.isPlaying) {
                    game.moveRight()
                    this.updateView()
                }
                break
            case 40 : //DOWN arrow
                if (this.isPlaying) {
                    this.stopTimer()
                    game.moveDown()
                    this.updateView()
                }
                break
            case 32 : //Space
                if (this.game.getState().gameOver) {
                    this.reset()
                    this.restarted =true
                }
                break
        }
    }

    handleKeyUp(evt) {
        switch (evt.keyCode) {
            case 40 : //DOWN arrow
                if (this.isPlaying) {
                    this.startTimer()
                }
                break

        }
    }
}