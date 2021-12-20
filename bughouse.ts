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
function makeBoard (){
    let board: square[] = [];
    board.length = 64;
    const boardSize = 8;
    for(let l = 1; l <= boardSize; l++){
        for(let d = 1; d <= boardSize; d++){
            let squ: square = {letter: l, digit: d, peice: null}
            board[((l-1)*8)+(d-1)] = squ;
        }
    }
    return board;
}




let startingPosition: string = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

function addPeices (board:square[], startingPosition: string){
    let currentElement = 0;
    let currentCharacter = startingPosition.charAt(currentElement);
    let column = 1;
    let row = 8;
    while(currentCharacter != " "){
        while(currentCharacter != "/"){
            if(typeof currentCharacter == "string" ){
            board[((column-1)*8)+(row-1)].peice = currentCharacter;
            let letter: string = column + 97;  // + 97 is ascii offset for a
            let number: string = row;
            let letNum: string = letter + number;
            document.getElementById(letNum).innerHTML = currentCharacter;
            currentElement++;
            currentCharacter = startingPosition.charAt(currentElement);
            column++;
            }
            else if(typeof currentCharacter == "number"){
                column = column + currentCharacter;
            }
            else{
                alert("something went wrong in addPeices function!\n");
            }
        }
        row--;
        column = 1;
    }
}


let startPos = null;
function getPeiceMovement (square){
// if not clicked anywhere yet, and clicked a square, set click to startPos. if not clicked anywhere yet and clicked not a square, do nothing. 
// if already clicked, and clicked a square, set click to endPos. if already clicked and clicked not a square, set startPos to null
    if(startPos == null && square.length == 2){
        startPos = document.getElementById(square).innerHTML;
    }
    else if (startPos != null && square.length == 2) {
        let endPos = document.getElementById(square).innerHTML;
        movePeice(board, startPos, endPos);
        startPos = null;
        
    }
    else if(startPos != null && square.length != 2){
        startPos = null;
    }
}




function movePeice(board: square[], startPos: string, endPos: string){
    //let startSquareLetter = +endPos.charAt(0) - 97;
    board[((letters.(endPos.charAt(0)) - 1) * 8) + (letters.(endPos.charAt(1)) - 1)].peice = board[((letters.(startPos.charAt(0)) - 1) * 8) + (letters.a(startPos.charAt(1)) - 1)].peice;
    board[((letters.(startPos.charAt(0)) - 1) * 8) + (letters.a(startPos.charAt(1)) - 1)].peice = null;

    document.getElementById(startPos).innerHTML = "";
    document.getElementById(endPos).innerHTML = board[((letters.(endPos.charAt(0)) - 1) * 8) + (letters.(endPos.charAt(1)) - 1)].peice;
}



// .charA
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

