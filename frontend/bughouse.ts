// assignment 1: make a peice move from 1 square to another


// make a board(array of 64 sqaures) --> make a square(has position, and which peice is in it) --> make a peice(has type of peice, color, kingVSqueen side)


interface square {
    letter: number;
    digit: number;
    peice: string;
}

enum letters {
    a = 1,
    b = 2,
    c = 3,
    d = 4,
    e = 5,
    f = 6,
    g = 7,
    h = 8,
}

/*
interface peice {
    peiceType: peiceType;
    color: color;     // true for white, false for black
    queenSide: boolean;  // queen's rook, knight, bishop will be true, king's will be false
    alreadyMoved: boolean;  // only matters for king and rooks for casting, 
    justMoved: boolean;  // only matters for pons and en passanting 
    square: square;
}

enum color {
    white = 1,
    black = 0,
}

enum peiceType {
    pon = 1,
    knight = 2,
    bishop = 3,
    rook = 4,
    queen = 5,
    king = 6,
}
*/


let board: square[] = makeBoard();
function makeBoard() {
    let board: square[] = [];
    board.length = 64;
    const boardSize = 8;
    for (let l = 1; l <= boardSize; l++) {
        for (let d = 1; d <= boardSize; d++) {
            let squ: square = { letter: l, digit: d, peice: null }
            board[((l - 1) * 8) + (d - 1)] = squ;
        }
    }
    return board;
}




let startingPosition: string = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
addPeices(board, startingPosition);
function addPeices(board: square[], startingPosition: string) {
    let currentElement = 0;
    let currentCharacter = startingPosition.charAt(currentElement);
    let column = 1;
    let row = 8;
    while (currentCharacter != " ") {
        if(currentCharacter == "/") {
            row--;
            column = 1;
        }
        else if (isNaN(+currentCharacter)) {
            board[((column - 1) * 8) + (row - 1)].peice = currentCharacter;
            column++;
        }
        else {
            column = column + +currentCharacter;
        }
        currentElement++;
        currentCharacter = startingPosition.charAt(currentElement);
    }

}


window.addEventListener('load', function () {
    for (let row = 8; row >= 1; row--) {
        for (let column = 8; column >= 1; column--) {
            let button = document.createElement('button');
            let buttonID: string = letters[column] + row.toString();
            button.id = buttonID;
            button.innerHTML = board[((column - 1) * 8) + (row - 1)].peice || ' ';
            button.onclick = function () { getPeiceMovement(buttonID); }

            document.body.appendChild(button);
        }
        document.body.appendChild(document.createElement('br'));
    }
});

let startPos: string = null;
function getPeiceMovement(square) {
    // if not clicked anywhere yet, and clicked a square, set click to startPos. if not clicked anywhere yet and clicked not a square, do nothing. 
    // if already clicked, and clicked a square, set click to endPos. if already clicked and clicked not a square, set startPos to null
    if (startPos == null && square.length == 2) {
        startPos = square;
    }
    else if (startPos != null && square.length == 2) {
        let endPos = square;
        movePeice(board, startPos, endPos);
        startPos = null;
    }
    else if (startPos != null && square.length != 2) {
        startPos = null;
    }
}




function movePeice(board: square[], startPos: string, endPos: string) {
    //let startSquareLetter = +endPos.charAt(0) - 97;
    board[((letters[endPos.charAt(0)] - 1) * 8) + (+endPos.charAt(1) - 1)].peice = board[((letters[startPos.charAt(0)] - 1) * 8) + (+startPos.charAt(1) - 1)].peice;
    board[((letters[startPos.charAt(0)] - 1) * 8) + (+startPos.charAt(1) - 1)].peice = null;

    document.getElementById(startPos).innerHTML = "";
    document.getElementById(endPos).innerHTML = board[((letters[endPos.charAt(0)] - 1) * 8) + (+endPos.charAt(1) - 1)].peice;
}





//     <button id="a1" onclick="getPeiceMovement('a1');">a1</button>



/*
function addPeices (board: square[]){
    // place white pons
    for(let l = 1; l <= 8; l++){
        board[l -1][2 -1].peice = {peiceType: peiceType.pon, color: color.white, queenSide: null, alreadyMoved: false, justMoved: false, square: {letter: l, number: 2}} 
    }
    // place black pons
    for(let l = 1; l <= 8; l++){
        board[l -1][7 -1].peice = {peiceType: peiceType.pon, color: color.black, queenSide: null, alreadyMoved: false, justMoved: false, square: {letter: l, number: 7}} 
    }
    // place white peices 
    for(let l = 1; l <=8; l++){
        board[l - 1][1 -1].peice = 
    }
}
*/

