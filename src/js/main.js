
/*
=========================================================================================================================================================================
Pseudocode:
_______________________
Create a chess board:
We need to create a chess board which the knight can move around on. This is an 8 by 8 board:
Loop through i
    Loop through j
        board.push([i, j])
_______________________
Create a knight class:
Ever knight is the same, so no parameters. Within the constructor, the knight can make the possible moves:
All moves are conditional of x and y being < -1 && > 8:
||    x + 2, y + 1,
||    x + 1, y + 2,
||    x - 2, y - 1,
||    x - 1, y - 2
_______________________
Traversing the board:
We 

=========================================================================================================================================================================
*/

class Knight {
    constructor() {

    }
}

const board = [];
for(let i = 0; i < 8; i++) {
    for(let j = 0; j < 8; j++) {
        board.push([i, j]);
    }
}

// console.log(board)

