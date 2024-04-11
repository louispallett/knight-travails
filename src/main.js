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
        this.headIndex = 0;
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
        if(arr[i][0] == target[0] && arr[i][1] == target[1]) {
            return i;
        }
    }
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
    if (element.get("predecessor") === null) return;
    path.push(board[index]);
    buildPath(board, bfsMap, bfsMap[element.get("predecessor")], element.get("predecessor"), path);
}

const knightMoves = (start, end) => {
    const board = buildBoard();
    // Find the index of the start and end coordinates
    const startIndex = findIndex(board, start);
    const endIndex = findIndex(board, end);
    const bfsMap = buildMapArr(board, startIndex);
    const adjList = buildAdjList(board);
    const queue = new Queue();
    // Enqueue the source index
    queue.enqueue(startIndex);
    // This will be our 'visited' node
    let u;

    while(u !== endIndex) {
        // Set u equal to the 'visited' node
        u = queue.dequeue();
        // Loop through the possible moves of u
        for(let i = 0; i < adjList[u].length; i++) {
            // We need to get the value at adjList (which is the full list of neighbours) for the neighbouring 
            // indexes for index u
            const indexOfV = adjList[u][i]; // Possible moves to index for u
            if(indexOfV === endIndex) {
                const path = [];
                bfsMap[indexOfV].set("predecessor", u);
                buildPath(board, bfsMap, bfsMap[indexOfV], indexOfV, path);
                path.push(start);
                console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
                return path.reverse();
            } else if(bfsMap[indexOfV].get("distance") === null) {
                // This condition means we haven't visited it yet!
                bfsMap[indexOfV].set("distance", bfsMap[u].get("distance") + 1);
                bfsMap[indexOfV].set("predecessor", u);
                queue.enqueue(indexOfV);
            }
        }
    }
}

if (process.argv.length != 6) {
    console.log("\nUsage: node <file> <start X coordinate> <start Y coordinate> <end X coordinate> <end Y coordinate>");
    console.log("Example: node myFile.js 1 2 2 4\n");
    console.log("i.e. calculate the route and number of turns to move from [1, 2] to [2, 4]\n");
    return;
}

const userArgs = process.argv.slice(2);

const startIndex = [parseInt(userArgs[0]),parseInt(userArgs[1])];
const endIndex = [parseInt(userArgs[2]),parseInt(userArgs[3])];

for (let i = 0; i < 1; i++) {
    if (Number.isNaN(startIndex[i]) || Number.isNaN(endIndex[i])) {
        console.log("Error: Values entered contain non numerical characters. Please remove any non-numerical characters and try again.");
        return;
    }
}

console.log(knightMoves([startIndex[0], startIndex[1]], [endIndex[0], endIndex[1]]));