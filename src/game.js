export default class Game {
    // score = 0;
    // lines = 0;
    // topOut = false
    // playField = this.createPlayfield();
    // activePiece = this.createPiece()
    // nextPiece = this.createPiece();

    //не дублируем код
    constructor() {
        this.resetProperties()
    }

    scoreLines = {
        1: 20,
        2: 50,
        3: 80,
        4: 100
    }

    resetProperties() {
        this.score = 0;
        this.lines = 0;
        this.topOut = false
        this.playField = this.createPlayfield();
        this.activePiece = this.createPiece()
        this.nextPiece = this.createPiece();
    }

    get level() {
        return this.lines * 0.1
    }

    createPiece() {
        //different numbers in array are used to choose a color of this figure in View.js
        const piece = {y: -1}
        switch (Math.floor(Math.random() * 7)) {
            case 0 :
                piece.blocks = [
                    [0, 0, 0, 0],
                    [1, 1, 1, 1],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ]
                break
            case 1 :
                piece.blocks = [
                    [0, 0, 0],
                    [2, 2, 2],
                    [0, 0, 2]
                ]
                break
            case 2 :
                piece.blocks = [
                    [0, 0, 0],
                    [3, 3, 3],
                    [3, 0, 0]
                ]
                break
            case 3 :
                piece.blocks = [
                    [0, 0, 0, 0],
                    [0, 4, 4, 0],
                    [0, 4, 4, 0],
                    [0, 0, 0, 0]
                ]
                break
            case 4 :
                piece.blocks = [
                    [0, 0, 0],
                    [0, 5, 5],
                    [5, 5, 0]
                ]
                break
            case 5 :
                piece.blocks = [
                    [0, 0, 0],
                    [6, 6, 6],
                    [0, 6, 0]
                ]
                break
            case 6 :
                piece.blocks = [
                    [0, 0, 0],
                    [7, 7, 0],
                    [0, 7, 7]
                ]
                break
            default :
                throw new Error('UNDEFINED TYPE OF PIECE')
        }
        //defining X pos after choosing an figure to know it's length in over to center it
        piece.x = Math.floor((10 - piece.blocks[0].length) / 2)
        return piece
    }

    getState() {
        const {x: pieceX, y: pieceY, blocks} = this.activePiece
        const newPlayfield = this.createPlayfield()
//copy array in new array
        for (let y = 0; y < this.playField.length; y++) {
            for (let x = 0; x < this.playField[y].length; x++) {
                newPlayfield[y][x] = this.playField[y][x]
            }
        }
//copy active figure to new array
        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++) {
                if (blocks[y][x]) {
                    newPlayfield[pieceY + y][pieceX + x] = blocks[y][x]
                }
            }
        }

        return {
            score: this.score,
            level: this.level,
            lines: this.lines,
            nextPiece: this.nextPiece,
            newPlayfield,
            gameOver: this.topOut
        }
    }

    createPlayfield(rows = 20, columns = 10) {
        const playfield = []
        for (let y = 0; y < rows; y++) {
            playfield[y] = []
            for (let x = 0; x < columns; x++) {
                playfield[y][x] = 0
            }
        }
        return playfield
    }

//move top left edge of active figure and check for collision.
    moveLeft() {
        this.activePiece.x--
        if (this.hasCollision()) {
            //return to normal pos
            this.activePiece.x++
        }
    };

    moveRight() {
        this.activePiece.x++
        if (this.hasCollision()) {
            //return to normal pos
            this.activePiece.x--
        }
    }

    moveDown() {
        if (!this.topOut) {
            this.activePiece.y++
            if (this.hasCollision()) {
                //return normal y
                this.activePiece.y--
                //lock our piece in playfield because of collision
                this.lockPiece()


                this.updateScore(this.clearLines())
                // give player an access to a new piece
                this.updatePiece()
            }
            if (this.hasCollision()) {
                this.topOut = true
            }
        }
    };

    hasCollision() {
        const playField = this.playField
        const {x: pieceX, y: pieceY, blocks} = this.activePiece

        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++) {
                if (blocks[y][x] &&
                    ((playField[pieceY + y] === undefined || playField[pieceY + y][pieceX + x] === undefined) ||
                        playField[y + pieceY][x + pieceX])) {
                    return true
                }
            }
        }
        return false
    };

    rotatePiece() {
        this.rotateBlocks()
        if (this.hasCollision()) {
            this.rotateBlocks(false)
        }
    }

    rotateBlocks(clockwise = true) {
        const blocks = this.activePiece.blocks
        const x = Math.floor(blocks.length / 2)
        const y = blocks.length - 1


        for (let i = 0; i < x; i++) {
            for (let j = i; j < y - i; j++) {
                const tmp = blocks[i][j]

                if (clockwise) {
                    blocks[i][j] = blocks[y - j][i]
                    blocks[y - j][i] = blocks[y - i][y - j]
                    blocks[y - i][y - j] = blocks[j][y - i]
                    blocks[j][y - i] = tmp
                } else {
                    blocks[i][j] = blocks[j][y - i]
                    blocks[j][y - i] = blocks[y - i][y - j]
                    blocks[y - i][y - j] = blocks[y - j][i]
                    blocks[y - j][i] = tmp
                }
            }
        }
    }

    lockPiece() {
        const playField = this.playField
        const {y: pieceY, x: pieceX, blocks} = this.activePiece

        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++) {
                if (blocks[y][x]) {
                    playField[pieceY + y][pieceX + x] = blocks[y][x]
                }
            }
        }
    }

    clearLines() {
        const rows = 20
        const columns = 10
        const linesToClear = []

        for (let y = rows - 1; y >= 0; y--) {
            let numberOfBlocks = 0
            for (let x = 0; x < columns; x++) {
                this.playField[y][x] ? numberOfBlocks++ : ''
            }
            if (numberOfBlocks === 0) {
                // if column has not any blocks,next one won't too
                break
            } else if (numberOfBlocks === columns) {
                // add to the end because we should clean our lines upwards(снизу вверх). Otherwise after the first iteration we will clean our highest line and add to the top new - after that indexes in our array will change that is why our second line to clear will have index+1.(т.е. удалится верхняя строка, добавится новая в начало - все остальные строки сместятся на 1 вниз(тем самым изменится индексация). А в массиве мы храним индесы строк.
                linesToClear.unshift(y)
            }
        }
        for (const indexOfLine of linesToClear) {
            //deleting array to clean row
            this.playField.splice(indexOfLine, 1)
            //add to the start new array
            this.playField.unshift(new Array(columns).fill(0))
        }
        //returning number of lines to update a level with a score
        return linesToClear.length
    }

    updatePiece() {
        this.activePiece = this.nextPiece
        this.nextPiece = this.createPiece()
    }

    updateScore(lines) {
        //prevent NaN
        if (lines) {
            //get score points in scoreLines
            //level + 1 because it = 0 at the beginnig
            this.score += this.scoreLines[lines] * (this.level + 1)
            this.lines += lines
        }
    }
}