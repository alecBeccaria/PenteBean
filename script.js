let document = Document;
console.log("HI");
let gameBoard = [];
for (let i = 0; i < 19; i++) {
    let row = Array(19).fill("1");
    gameBoard.push(row);
}
console.log(gameBoard);
gameBoard[2][3] = "test";
console.log(gameBoard);
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
