// assignment 1: make a peice move from 1 square to another
var letters;
(function (letters) {
    letters[letters["a"] = 1] = "a";
    letters[letters["b"] = 2] = "b";
    letters[letters["c"] = 3] = "c";
    letters[letters["d"] = 4] = "d";
    letters[letters["e"] = 5] = "e";
    letters[letters["f"] = 6] = "f";
    letters[letters["g"] = 7] = "g";
    letters[letters["h"] = 8] = "h";
})(letters || (letters = {}));
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
var board = makeBoard();
function makeBoard() {
    var board = [];
    board.length = 64;
    var boardSize = 8;
    for (var l = 1; l <= boardSize; l++) {
        for (var d = 1; d <= boardSize; d++) {
            var squ = { letter: l, digit: d, peice: null };
            board[((l - 1) * 8) + (d - 1)] = squ;
        }
    }
    return board;
}
var startingPosition = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
function addPeices(board, startingPosition) {
    var currentElement = 0;
    var currentCharacter = startingPosition.charAt(currentElement);
    var column = 1;
    var row = 8;
    while (currentCharacter != " ") {
        while (currentCharacter != "/") {
            if (typeof currentCharacter == "string") {
                board[((column - 1) * 8) + (row - 1)].peice = currentCharacter;
                var letter = column + 97; // + 97 is ascii offset for a
                var number = row;
                var letNum = letter + number;
                document.getElementById(letNum).innerHTML = currentCharacter;
                currentElement++;
                currentCharacter = startingPosition.charAt(currentElement);
                column++;
            }
            else if (typeof currentCharacter == "number") {
                column = column + currentCharacter;
            }
            else {
                alert("something went wrong in addPeices function!\n");
            }
        }
        row--;
        column = 1;
    }
}
var startPos = null;
function getPeiceMovement(square) {
    // if not clicked anywhere yet, and clicked a square, set click to startPos. if not clicked anywhere yet and clicked not a square, do nothing. 
    // if already clicked, and clicked a square, set click to endPos. if already clicked and clicked not a square, set startPos to null
    if (startPos == null && square.length == 2) {
        startPos = document.getElementById(square).innerHTML;
    }
    else if (startPos != null && square.length == 2) {
        var endPos = document.getElementById(square).innerHTML;
        movePeice(board, startPos, endPos);
        startPos = null;
    }
    else if (startPos != null && square.length != 2) {
        startPos = null;
    }
}
function movePeice(board, startPos, endPos) {
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
