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

//magically gotten
let startSquare: square = {letter: letters.a, digit: 1, peice: "R"};
let endSquare: square = {letter: letters.a, digit: 2, peice: "R"};

function movePeice(board: square[], startSquare: square, endSquare: square){
    board[((endSquare.letter - 1) * 8) + (endSquare.digit -1)].peice = startSquare.peice;
    board[((startSquare.letter - 1) * 8) + (startSquare.digit -1)].peice = null;
}

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

