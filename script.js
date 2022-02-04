var imageSrc1 = "Black_sm.png";
var imageSrc2 = "White_sm.png"
var clickedRow;
var clickedColumn;
var isFirstPlayerTurn = true;

var playerOneCaptureCount;
var playerTwoCaptureCount;


console.log("HI");
let gameBoard = [];
for (let i = 0; i < 19; i++) {
    let row = Array(19);
    gameBoard.push(row);
}
console.log(gameBoard);
//gameBoard[2][3] = "test";
console.log(gameBoard);

var tableDiv = document.getElementById("tableId");
var table = document.createElement('TABLE');
var tableBody = document.createElement('TBODY');

table.border = "1";
table.appendChild(tableBody);
table.id = "gameBoard";
table.class = "gameBoardCss";

//
for (let a = 0; a < gameBoard.length; a++) {
    var tr = document.createElement('TR');
    for (let b = 0; b < gameBoard[a].length; b++) {
        var td = document.createElement('TD');
        // td.appendChild(document.createTextNode(gameBoard[a][b]));
        /*if (gameBoard[a][b] != 1) {
            td.appendChild(document.createTextNode(gameBoard[a][b]));
        }
        else {
            td.appendChild(document.createTextNode(" "));
        }*/
        //Split on forwardSlashes for getting the ids
        td.id = "tableCell/" + a + "/" + b;
        td.className = "tableCells";
        td.onclick = function () {
            getVal(this)
        }
        if ((a == 6 && b == 6) || (a == 6 && b == 12) || (a == 12 && b == 12) || (a == 12 && b == 6) || (a == 9 && b == 9)) {
            td.classList.add("starting");
        }
        tr.appendChild(td);
    }
    tableBody.appendChild(tr);
}
tableDiv.appendChild(table);


var allCells = document.getElementsByClassName("tableCells");

console.log(allCells)

function getVal(cell) {
    let words = cell.id.split("/");
    clickedRow = words[1];
    clickedColumn = words[2];
    if (gameBoard[clickedRow][clickedColumn] == undefined) {
        if (isFirstPlayerTurn) {
            console.log(`Row: ${clickedRow} Column: ${clickedColumn}`)
            placePiece(clickedRow, clickedColumn, "player1", cell);
            isFirstPlayerTurn = !isFirstPlayerTurn;
        }
        else {
            console.log(`Row: ${clickedRow} Column: ${clickedColumn}`)
            placePiece(clickedRow, clickedColumn, "player2", cell);
            isFirstPlayerTurn = !isFirstPlayerTurn;
        }
    } else {
        alert("Tile is taken");
    }

}

// Attach event handler to button
//  Origin Piece is placed

//  Check if Piece occupies space next to it
function placePiece(row, col, player, cell) {
    console.log(gameBoard)
    
        if (player == "player1") {
            var img = document.createElement("IMG")
            img.src = "./assets/White_sm.png";
            cell.appendChild(img)
        } else {
            var img = document.createElement("IMG")
            img.src = "./assets/Black_sm.png";
            cell.appendChild(img)
        }
        gameBoard[row][col] = player;
        checkCaptureRight(row, col, player);
        checkCaptureDown(row, col, player);
        checkCaptureUp(row, col, player);
        checkCaptureLeft(row, col, player);

        checkCaptureTopLeft(row, col, player);
        checkCaptureTopRight(row, col, player);
        checkCaptureBottomLeft(row, col, player);
        checkCaptureBottomRight(row, col, player);

        checkFiveInRow(row, col, player);
        checkFiveInColumn(row, col, player);
}

function checkFiveInRow(row, col, player) {
        //  Set the first tile to check
        var count = 1;

        for (var i = 1; i < 5; i++) {
            //  Add to count for matching piece in a row
            if (!((parseInt(col) - i) < 0) && (gameBoard[row][(parseInt(col) - i)] == player)) {
                count++;
            } else {
                break;
            }
        }

        for (var i = 1; i < 5; i++) {
            //  Add to count for matching piece in a row
            if (!((parseInt(col) + i) > (gameBoard[row].length - 1)) && (gameBoard[row][(parseInt(col) + i)] == player)) {
                count++;
            } else {
                break;
            }
        }

        switch(count) {
            case 3:
                alert("Tessra");
                break;
            case 4:
                alert("Tetra");
                break;
            case 5:
                alert(player + "wins!");
                break;
        }
}

function checkFiveInColumn(row, col, player) {
    //  Set the first tile to check
    var count = 1;

    for (var i = 1; i < 5; i++) {
        //  Add to count for matching piece in a row
        if (!((parseInt(row) - i) < 0) && (gameBoard[(parseInt(row) - i)][col] == player)) {
            count++;
        } else {
            break;
        }
    }    

    for (var i = 1; i < 5; i++) {
        //  Add to count for matching piece in a row
        if (!((parseInt(row) + i) > (gameBoard[row].length - 1)) && (gameBoard[(parseInt(row) + i)][col] == player)) {
            count++;
        } else {
            break;
        }
    }

    switch(count) {
        case 3:
            alert("Tessra");
            break;
        case 4:
            alert("Tetra");
            break;
        case 5:
            alert(player + "wins!");
            break;
    }
}


function checkCaptureRight(row, col, player) {
    if (!(parseInt(col) - 3 < 0) && (parseInt(col) + 3 < gameBoard[row].length)) {
        console.log(gameBoard)
        //  Set the first tile to check
        var firstTile = gameBoard[row][parseInt(col) + 1];

        //  If first tile to check exists, and is enemy player
        if (firstTile != undefined && (firstTile != player)) {
            console.log("test1")
            //  Set the second tile to check
            var secondTile = gameBoard[row][parseInt(col) + 2];
            //  If second tile exists and is an enemy player
            if (secondTile != undefined && (secondTile != player)) {
                console.log("test2")

                //  Set third thile to check
                var thirdTile = gameBoard[row][parseInt(col) + 3]

                //  If third tile is owned by player making the move
                if (thirdTile == player) {
                    console.log("test3")
                    //  Capture pieces, clear table and array
                    firstTile = null;
                    secondTile = null;
                    var targetCellId = "tableCell/" + row + "/" + (parseInt(col) + 1)
                    targetCell = document.getElementById(targetCellId)
                    gameBoard[parseInt(row)][(parseInt(col) + 1)] = undefined;
                    targetCell.removeChild(targetCell.childNodes[0]);
                    var targetCellId = "tableCell/" + row + "/" + (parseInt(col) + 2)
                    targetCell = document.getElementById(targetCellId)
                    gameBoard[parseInt(row)][(parseInt(col) + 2)] = undefined;
                    targetCell.removeChild(targetCell.childNodes[0]);
                }
            }
        }
    }
}

function checkCaptureDown(row, col, player) {
    if ((parseInt(row) + 3 < gameBoard.length)) {
        //  Set the first tile to check
        var firstTile = gameBoard[parseInt(row) + 1][col];

        //  If first tile to check exists, and is enemy player
        if (firstTile != undefined && (firstTile != player)) {

            //  Set the second tile to check
            var secondTile = gameBoard[parseInt(row) + 2][col];

            //  If second tile exists and is an enemy player
            if (secondTile != undefined && (secondTile != player)) {

                //  Set third thile to check
                var thirdTile = gameBoard[parseInt(row) + 3][col]

                //  If third tile is owned by player making the move
                if (thirdTile == player) {
                    
                    //  Capture pieces, clear table and array
                    firstTile = null;
                    secondTile = null;
                    var targetCellId = "tableCell/" + (parseInt(row) + 1) + "/" + col
                    targetCell = document.getElementById(targetCellId)
                    gameBoard[parseInt(row) + 1][parseInt(col)] = undefined;
                    targetCell.removeChild(targetCell.childNodes[0]);
                    var targetCellId = "tableCell/" + (parseInt(row) + 2) + "/" + col
                    targetCell = document.getElementById(targetCellId)
                    gameBoard[(parseInt(row) + 2)][parseInt(col)] = undefined;
                    targetCell.removeChild(targetCell.childNodes[0]);
                }
            }
        }
    }
}

function checkCaptureUp(row, col, player) {
    if (!(parseInt(row) - 3 < 0)) {
        //  Set the first tile to check
        var firstTile = gameBoard[parseInt(row) - 1][col];

        //  If first tile to check exists, and is enemy player
        if (firstTile != undefined && (firstTile != player)) {

            //  Set the second tile to check
            var secondTile = gameBoard[parseInt(row) - 2][col];

            //  If second tile exists and is an enemy player
            if (secondTile != undefined && (secondTile != player)) {

                //  Set third thile to check
                var thirdTile = gameBoard[parseInt(row) - 3][col]

                //  If third tile is owned by player making the move
                if (thirdTile == player) {

                    //  Capture pieces, clear table and array
                    firstTile = null;
                    secondTile = null;
                    var targetCellId = "tableCell/" + (parseInt(row) - 1) + "/" + col
                    targetCell = document.getElementById(targetCellId)
                    gameBoard[(parseInt(row) - 1)][parseInt(col)] = undefined;
                    targetCell.removeChild(targetCell.childNodes[0]);
                    var targetCellId = "tableCell/" + (parseInt(row) - 2) + "/" + col
                    targetCell = document.getElementById(targetCellId)
                    gameBoard[(parseInt(row) - 2)][parseInt(col)] = undefined;
                    targetCell.removeChild(targetCell.childNodes[0]);
                }
            }
        }
    }
}

function checkCaptureLeft(row, col, player) {
    if (!(parseInt(col) - 3 < 0)) {
        //  Set the first tile to check
        var firstTile = gameBoard[row][parseInt(col) - 1];

        //  If first tile to check exists, and is enemy player
        if (firstTile != undefined && (firstTile != player)) {

            //  Set the second tile to check
            var secondTile = gameBoard[row][parseInt(col) - 2];

            //  If second tile exists and is an enemy player
            if (secondTile != undefined && (secondTile != player)) {

                //  Set third thile to check
                var thirdTile = gameBoard[row][parseInt(col) - 3]

                //  If third tile is owned by player making the move
                if (thirdTile == player) {

                    //  Capture pieces, clear table and array
                    firstTile = null;
                    secondTile = null;
                    var targetCellId = "tableCell/" + row + "/" + (parseInt(col) - 1)
                    targetCell = document.getElementById(targetCellId)
                    gameBoard[parseInt(row)][(parseInt(col) - 1)] = undefined;
                    targetCell.removeChild(targetCell.childNodes[0]);
                    var targetCellId = "tableCell/" + row + "/" + (parseInt(col) - 2)
                    targetCell = document.getElementById(targetCellId)
                    gameBoard[parseInt(row)][(parseInt(col) - 2)] = undefined;
                    targetCell.removeChild(targetCell.childNodes[0]);
                }
            }
        }
    }
}
function checkCaptureTopLeft(row, col, player) {
    if (!(parseInt(col) - 3 < 0) && !(parseInt(row) - 3 < 0)) {
        //  Set the first tile to check
        var firstTile = gameBoard[parseInt(row) - 1][parseInt(col) - 1];

        //  If first tile to check exists, and is enemy player
        if (firstTile != undefined && (firstTile != player)) {

            //  Set the second tile to check
            var secondTile = gameBoard[parseInt(row) - 2][parseInt(col) - 2];

            //  If second tile exists and is an enemy player
            if (secondTile != undefined && (secondTile != player)) {

                //  Set third thile to check
                var thirdTile = gameBoard[parseInt(row) - 3][parseInt(col) - 3]

                //  If third tile is owned by player making the move
                if (thirdTile == player) {
                    //  Capture pieces, clear table and array
                    firstTile = null;
                    secondTile = null;
                    var targetCellId = "tableCell/" + (parseInt(row) - 1) + "/" + (parseInt(col) - 1)
                    targetCell = document.getElementById(targetCellId)
                    gameBoard[(parseInt(row) - 1)][(parseInt(col) - 1)] = undefined;
                    targetCell.removeChild(targetCell.childNodes[0]);
                    var targetCellId = "tableCell/" + (parseInt(row) - 2) + "/" + (parseInt(col) - 2)
                    targetCell = document.getElementById(targetCellId)
                    gameBoard[(parseInt(row) - 2)][(parseInt(col) - 2)] = undefined;
                    targetCell.removeChild(targetCell.childNodes[0]);
                }
            }
        }
    }
}
function checkCaptureTopRight(row, col, player) {
    if ((parseInt(col) + 3 < gameBoard[row].length) && !(parseInt(row) - 3 < 0)) {
        //  Set the first tile to check
        var firstTile = gameBoard[parseInt(row) - 1][parseInt(col) + 1];
        //  If first tile to check exists, and is enemy player
        if (firstTile != undefined && (firstTile != player)) {

            //  Set the second tile to check
            var secondTile = gameBoard[parseInt(row) - 2][parseInt(col) + 2];

            //  If second tile exists and is an enemy player
            if (secondTile != undefined && (secondTile != player)) {

                //  Set third thile to check
                var thirdTile = gameBoard[parseInt(row) - 3][parseInt(col) + 3]

                //  If third tile is owned by player making the move
                if (thirdTile == player) {
                    //  Capture pieces, clear table and array
                    firstTile = null;
                    secondTile = null;
                    var targetCellId = "tableCell/" + (parseInt(row) - 1) + "/" + (parseInt(col) + 1);
                    targetCell = document.getElementById(targetCellId);
                    gameBoard[parseInt(row) - 1][parseInt(col) + 1] = undefined;
                    targetCell.removeChild(targetCell.childNodes[0]);
                    var targetCellId = "tableCell/" + (parseInt(row) - 2) + "/" + (parseInt(col) + 2)
                    targetCell = document.getElementById(targetCellId)
                    gameBoard[parseInt(row) - 2][parseInt(col) + 2] = undefined;
                    targetCell.removeChild(targetCell.childNodes[0]);
                }
            }
        }
    }
}
function checkCaptureBottomLeft(row, col, player) {
    if (!(parseInt(col) - 3 < 0) && (parseInt(row) + 3 < gameBoard.length)) {
        //  Set the first tile to check
        var firstTile = gameBoard[parseInt(row) + 1][parseInt(col) - 1];

        //  If first tile to check exists, and is enemy player
        if (firstTile != undefined && (firstTile != player)) {

            //  Set the second tile to check
            var secondTile = gameBoard[parseInt(row) + 2][parseInt(col) - 2];

            //  If second tile exists and is an enemy player
            if (secondTile != undefined && (secondTile != player)) {

                //  Set third thile to check
                var thirdTile = gameBoard[parseInt(row) + 3][parseInt(col) - 3]

                //  If third tile is owned by player making the move
                if (thirdTile == player) {
                    //  Capture pieces, clear table and array
                    firstTile = null;
                    secondTile = null;
                    var targetCellId = "tableCell/" + (parseInt(row) + 1) + "/" + (parseInt(col) - 1)
                    targetCell = document.getElementById(targetCellId)
                    gameBoard[parseInt(row) + 1][parseInt(col) - 1] = undefined;
                    targetCell.removeChild(targetCell.childNodes[0]);
                    var targetCellId = "tableCell/" + (parseInt(row) + 2) + "/" + (parseInt(col) - 2)
                    targetCell = document.getElementById(targetCellId)
                    gameBoard[parseInt(row) + 2][parseInt(col) - 2] = undefined;
                    targetCell.removeChild(targetCell.childNodes[0]);
                }
            }
        }
    }
}
function checkCaptureBottomRight(row, col, player) {
    if ((parseInt(col) + 3 ) < gameBoard[row].length && !(parseInt(row) + 3) < gameBoard.length) {
        //  Set the first tile to check
        var firstTile = gameBoard[(parseInt(row) + 1)][(parseInt(col) + 1)];
        //  If first tile to check exists, and is enemy player
        if (firstTile != undefined && (firstTile != player)) {

            //  Set the second tile to check
            var secondTile = gameBoard[(parseInt(row) + 2)][(parseInt(col) + 2)];
            //  If second tile exists and is an enemy player
            if (secondTile != undefined && (secondTile != player)) {
                //  Set third thile to check
                var thirdTile = gameBoard[(parseInt(row) + 3)][(parseInt(col) + 3)]

                //  If third tile is owned by player making the move
                if (thirdTile == player) {
                    //  Capture pieces, clear table and array
                    firstTile = null;
                    secondTile = null;
                    var targetCellId = "tableCell/" + (parseInt(row) + 1) + "/" + (parseInt(col) + 1)
                    targetCell = document.getElementById(targetCellId)
                    gameBoard[(parseInt(row) + 1)][(parseInt(col) + 1)] = undefined;
                    targetCell.removeChild(targetCell.childNodes[0]);
                    var targetCellId = "tableCell/" + (parseInt(row) + 2) + "/" + (parseInt(col) + 2)
                    targetCell = document.getElementById(targetCellId)
                    gameBoard[(parseInt(row) + 2)][(parseInt(col) + 2)] = undefined;
                    targetCell.removeChild(targetCell.childNodes[0]);
                }
            }
        }
    }
}




//Commity