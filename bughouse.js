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
addPeices(board, startingPosition);
function addPeices(board, startingPosition) {
    var currentElement = 0;
    var currentCharacter = startingPosition.charAt(currentElement);
    var column = 1;
    var row = 8;
    while (currentCharacter != " ") {
        if (currentCharacter == "/") {
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
    for (var row = 8; row >= 1; row--) {
        var _loop_1 = function (column) {
            var button = document.createElement('button');
            var buttonID = letters[column] + row.toString();
            button.id = buttonID;
            button.innerHTML = board[((column - 1) * 8) + (row - 1)].peice || ' ';
            button.onclick = function () { getPeiceMovement(buttonID); };
            document.body.appendChild(button);
        };
        for (var column = 8; column >= 1; column--) {
            _loop_1(column);
        }
        document.body.appendChild(document.createElement('br'));
    }
});
var startPos = null;
function getPeiceMovement(square) {
    // if not clicked anywhere yet, and clicked a square, set click to startPos. if not clicked anywhere yet and clicked not a square, do nothing. 
    // if already clicked, and clicked a square, set click to endPos. if already clicked and clicked not a square, set startPos to null
    alert('getPeiceMovement');
    if (startPos == null && square.length == 2) {
        startPos = square;
    }
    else if (startPos != null && square.length == 2) {
        var endPos = square;
        movePeice(board, startPos, endPos);
        startPos = null;
    }
    else if (startPos != null && square.length != 2) {
        startPos = null;
    }
}
function movePeice(board, startPos, endPos) {
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
