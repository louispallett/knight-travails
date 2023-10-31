
/*
=========================================================================================================================================================================
Pseudocode:
______________________________________________
Create a chess board:
We need to create a chess board which the knight can move around on. This is an 8 by 8 board:
Loop through i
    Loop through j
        board.push([i, j])

We can create a graph via an Adjacency matrix (O(N^2) - since we are only going up to 8, this is fine for time complexity) Each
possible move we can make on the board can be represented by 1.
______________________________________________
Create a knight class:
Ever knight is the same, so no parameters. Within the constructor, the knight can make the possible moves:
All moves are conditional of x and y being < -1 && > 8:
||    x + 2, y + 1,
||    x + 1, y + 2,
||    x - 2, y - 1,
||    x - 1, y - 2
______________________________________________
Traversing the board:
We need to create relationships with each square on the chess board. We can do this via a GRAPH (probably an undirected graph):

      ---[1, 2]
      |
      |       [2, 1]
    [0, 0] ___ |

The algorithm will need to traverse each possible path and keep track of each movement (which increments). Whichever is the shortest path should return.

1) We need to know where we are starting and where we are going
    We need to find the starting coordinates within the array
    We need to find the end coordinates within the array

    
______________________________________________
Passing a move:
We want to pass in the following information into the call:
(start position - i.e. [0, 0])
(end position - i.e. [2, 4])
(PATH: [0, 0] -> [1, 2] -> [2, 4])
(COUNTER: 2) ====> Or, in other words, we've made this in 2 moves

Information on graphs:  https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/
                        https://www.khanacademy.org/computing/computer-science/algorithms/graph-representation/a/representing-graphs

=========================================================================================================================================================================
*/

// Builds a simple 2D array
const buildBoard = () => {
    let board = [];
    for(let i = 0; i < 8; i++) {
        for(let j = 0; j < 8; j++) {
            board.push([i, j]);
        }
    }
    return board;
}

const findIndex = (arr, target) => {
    for(let i = 0; i < arr.length; i++) {
        if(arr[i][0] === target[0] && arr[i][1] === target[1]) {
            return i;
        }
    }
    return null;
}

const knightMoves = (start, end) => {
    const board = buildBoard();
    // Find the index of the start and end coordinates
    const startIndex = findIndex(board, start);
    const endIndex = findIndex(board, end);
    // For testing
    console.log(startIndex);
    console.log(endIndex);
}

knightMoves([7, 7], [3, 1]);