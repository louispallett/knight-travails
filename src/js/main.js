
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

^^^^^^^^^^^^^^^^^^^^^^
This is on the right path, but it is probably better to actually represent this through a simple function rather than a class, since we are only ever 
going to have one knight - so don't need to keep implementing them
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
2) Traversing the board
    Either via breadth or depth first search. Breadth probably makes more sense, really - since we can increment a COUNTER and as soon as the end point
    is reached, the COUNTER stops and returns (along with the given PATH).

==============================================
The Breadth-First Search (BFS) algorithm
==============================================
Two values are asigned to each vertex (the elements in the graph):
A DISTANCE, giving the minimum number of edges in any path from the source vertex to the end vertex
The PREDECESSOR vertex along some shortest path from the source vertex. When null, it has no predecessor.

If there is NO path from the start to the end, then the distance is infinite (and the predecessor is the same value as the 
start's - i.e. null). Here, we represent this via the two numbers [distance, predecessor]. The numbers above are the index
of the numbers - 3 is our start (or source):
(3)             (2)             (3)
[0, -] ------- [1, 3] ------- [2, 2]

So, take index (2) - [1] is the distance from (3), whereas [3] is the last node (or vertex) we visited, which is, of course, the 
source vertex, (3).

So:
    (buildMapArr()) We set the distance of the source to 0. The predecessor will remain null. This provides us with the information 
    needed.
    We need to define the moves that can be made (i.e. x + 2 && y + 1 || x + 1 && y + 2 etc.).
    We run through the posibilities - iterating over the board, calculating the distance and storing the predecessor one at a 
    time (these are just those whose distance is ONE and have not been VISITED before).
        Then we recursively call this, to distances of 2, 3, etc. until we reach the end index.
        (We can determine whether a vertex has been visited if it's distance is still null - if !null, it has already been visited!)

        We also need to queue a vertex when we visit it (enqueue). The source (or start) is first enqueued. It is then dequeued, because
        that is the end of the first search through vertices with distance = 0. 
            WHEN WE DEQUEUE an item, we then ENQUEUE it's neightbours (if they have not been visited!).
            
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

class Queue {
    constructor() {
        this.items = new Map();
        this.headIndex = 0;
        this.tailIndex = 0;
    }

    enqueue(element) {
        this.items[this.tailIndex] = element;
        this.tailIndex++;
    }

    dequeue() {
        const removedElement = this.items[this.headIndex];
        delete this.items[this.headIndex];
        this.headIndex++;
        return removedElement;
    }

    peek() {
        const peekElement = this.items[this.headIndex];
        return peekElement;
    }

    size() {
        return this.tailIndex - this.headIndex;
    }

    isEmpty() {
        if(this.tailIndex - this.headIndex == 0) {
            return true;
        }
        return false;
    }

    clear() {
        this.items = {};
        thiis.headIndex = 0;
        this.tailIndex = 0;
    }
};

// Builds a simple 2D array
const buildBoard = () => {
    let board = [];
    for(let i = 0; i < 8; i++) {
        for(let j = 0; j < 8; j++) {
            board.push([i, j]);
        }
    }
    return board;
};

const findIndex = (arr, target) => {
    for(let i = 0; i < arr.length; i++) {
        if(arr[i][0] === target[0] && arr[i][1] === target[1]) {
            return i;
        }
    }
    return null;
};

const buildMapArr = (array, startIndex) => {
    const newArr = [];
    for(let i = 0; i < array.length; i++) {
        // Experimenting with Map() - could also create object for each newArr[i]
        newArr[i] = new Map();
        newArr[i].set("distance", null);
        newArr[i].set("predecessor", null);
    }
    newArr[startIndex].set("distance", 0);
    return newArr;
};

const nextMove = (index, x, y) => {
    // There are eight possible moves (when ignoring if on board) - the order here doesn't matter,
    // as the index here just means "possible move number [j]:"
    if(index == 0) return [x + 1, y + 2];
    if(index == 1) return [x + 2, y + 1];
    if(index == 2) return [x - 1, y - 2];
    if(index == 3) return [x - 2, y - 1];
    if(index == 4) return [x - 2, y + 1];
    if(index == 5) return [x - 1, y + 2];
    if(index == 6) return [x + 1, y - 2];
    if(index == 7) return [x + 2, y - 1];
}

const legalMove = (array, target) => {
    if(array.find((element) => element[0] == target[0] && 
    element[1] == [target[1]])) {
        return true;
    }
    return false;
};

const buildAdjList = (board) => {
    let adjList = [];
    for(let i = 0; i < board.length; i++) {
        const community = [];
        for(let j = 0; j < 8; j++) {
            const neighbour = nextMove(j, board[i][0], board[i][1]);
            if(legalMove(board, neighbour)) {
                community.push(findIndex(board, neighbour));
            }
        }
        adjList[i] = community;
    }
    return adjList;
};

const buildPath = (board, bfsMap, element, index, path) => {
    if(bfsMap[element].get("predecessor") === null) {
        return;
    } else {
        newArr.push(board[index]);
        constructPath(board, bfsMap, bfsMap[element].get("predecessor"), element.predecessor, path);
    }
}

const knightMoves = (start, end) => {
    const board = buildBoard();
    // Find the index of the start and end coordinates
    const startIndex = findIndex(board, start);
    const endIndex = findIndex(board, end);
    const bfsMap = buildMapArr(board, startIndex);
    // console.log(bfsMap);
    const adjList = buildAdjList(board);
    // console.log(adjList);
    const queue = new Queue();
    // Enqueue the source index
    queue.enqueue(startIndex);
    // This will be our 'visited' node
    let u;

    while(u != endIndex) {
        // Set u equal to the 'visited' node
        u = queue.dequeue();
        // Loop through the possible moves of u
        for(let i = 0; i < adjList[u].length; i++) {
            // We need to get the value at adjList (which is the full list of neighbours) for the neighbouring 
            // indexes for index u
            const indexOfV = adjList[u][i]; // Possible moves to index for u
            console.log(adjList[u][i]);
            console.log(bfsMap[indexOfV].get("distance"))
            if(indexOfV == endIndex) {
                const path = [];
                const test = buildPath(board, bfsMap, bfsMap[indexOfV].get("predecessor"), indexOfV, path);
                console.log(test);
                result = path.reverse().splice(0,0,start);
                console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
                return path;
                } else if(bfsMap[indexOfV].get("distance") === null) {
                // This condition means we haven't visited it yet!
                bfsMap[indexOfV].set("distance", bfsMap[u].get("distance") + 1);
                bfsMap[indexOfV].set("predecessor", u);
                queue.enqueue(indexOfV);
            }
        }
        return;
    }
}

knightMoves([3, 7], [5, 2]);