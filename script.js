console.log("HI");
let gameBoard = [];
for (let i = 0; i < 19; i++) {
    let row = Array(19).fill("1");
    gameBoard.push(row);
}
console.log(gameBoard);
gameBoard[2][3] = "test";
console.log(gameBoard);

var tableDiv = document.getElementById("tableId");
var table = document.createElement('TABLE');
var tableBody = document.createElement('TBODY');

table.border = "1";
table.appendChild(tableBody);

for(let a = 0; a < gameBoard.length; a++){
    var tr = document.createElement('TR');
    for(let b = 0; b < gameBoard[a].length; b++){
        var td = document.createElement('TD');
        td.appendChild(document.createTextNode(gameBoard[a][b]));
        tr.appendChild(td);
    }
    tableBody.appendChild(tr);
}
tableDiv.appendChild(table);



//  Origin Piece is placed

//  Check if Piece occupies space next to it
    //  If piece exists, Check color of piece next to Origin Piece
        // If same color, count number of pieces in row
            //  If 3 in row, announce tria
            //  If 4 in row, announce tessera
            //  If 5 in row, announce win
        //  If opponent color
            //  Check for 2 in row
                //  If 3rd in row is same color, capture
//Commity
