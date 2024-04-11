# knight-travails
#### _Course of [The Odin Project](https://www.theodinproject.com/lessons/javascript-knights-travails)_

_Knight Travails_ is a project to calculate the shortest possible route a knight can take on a chessboard between two coordinates.

In chess, a knight travels in an "L-shape" - two squares vertically and one horizontally **or** two squares horizontally and one vertically. Because of this, given enough number of moves, a knight can travel to _any_ piece on a chessboard.

<!-- <p align="centre">
    <img src="https://cdn.statically.io/gh/TheOdinProject/curriculum/d30038e0aaca1f35e58e205e37a21b2c9d31053d/javascript/computer_science/project_knights_travails/imgs/01.png">
</p>
<p align="centre">From The Odin Project</p> -->

## How it works

This programme uses a **breadth-first search algorithm** to calculate each route until it reaches the desired destination. It does this by creating a graph.

There are some great resources of graphs out there, but of particular use to me was [KhanAcadamy](https://www.khanacademy.org/computing/computer-science/algorithms/graph-representation/a/representing-graphs).

If you want to see some of my notes, there is also a workings.txt file in the src/ directory.

## Installation

If you want to try out the programme, you can do so either using [Node](https://nodejs.org/en) or using [Quokka](https://quokkajs.com/docs/index.html).

Either way, you'll want to download the src/main.js file and save it somewhere.

### Node

Once you have the src/main.js file saved, open your terminal and navigate to your directory. You can then run the command:

```sh
node main.js
```

This will output how to use the file. You'll want to write the starting coordinates and ending coordinates as command line arguments - for simplicity, this should be four integers. For example:

``` sh
# node <file> <start X coordinate> <start Y coordinate> <end X coordinate> <end Y coordinate>
node main.js 3 7 5 2
```

This will ask the programme calculate the shortest possible route from coordinate [3, 7] to coordinate [5, 2], which should result in the following output:

```txt
You made it in 3 moves! Here's your path:
[ [ 3, 7 ], [ 2, 5 ], [ 3, 3 ], [ 5, 2 ] ]
```

### Quokka

Open the file in a text editor and delete/comment out the following lines (154 - 173):

```js
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
```

You can then write your own call to the function knightMoves(), in which the arguments need to be the [start X coordinate, start Y coordinate], [end X coordinate, end Y coordinate]. For example:

```js
console.log(knightMoves([1, 2], 2, 4));
```

Will output the following:

```txt
You made it in 3 moves! Here's your path:
[ [ 3, 7 ], [ 2, 5 ], [ 3, 3 ], [ 5, 2 ] ]
```

