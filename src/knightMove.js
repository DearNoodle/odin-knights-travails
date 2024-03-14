import KnightMoveTreeNode from "./KnightMoveTreeNode";
import KnightMoveTree from "./KnightMoveTree";
import Queue from "./Queue";

function generatePath(movePath, curNode) {
  movePath.push(curNode.coord);
  while (curNode.from) {
    curNode = curNode.from;
    movePath.push(curNode.coord);
  }
  movePath.reverse();
  return movePath;
}

function isArrayEqual(arr1, arr2) {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
}

function levelOrderSearchShortestPath(end, moveSearchTree) {
  let movePath = [];
  let preventInfLoopIndex = 0;
  const queue = new Queue();
  queue.enqueue(moveSearchTree.root);

  while (queue.head && preventInfLoopIndex < 100000) {
    let curNode = queue.dequeue();
    if (isArrayEqual(curNode.coord, end)) {
      return generatePath(movePath, curNode);
    }
    curNode.to.forEach((coord) => {
      const toNode = new KnightMoveTreeNode(coord);
      toNode.from = curNode;
      queue.enqueue(toNode);
    });
    preventInfLoopIndex++;
  }
  throw new Error("Looped too much");
}

function outputConsoleMsg(path) {
  console.log(`You made it in ${path.length} moves!  Here's your path:`);
  path.forEach((coord) => {
    console.log(JSON.stringify(coord));
  });
}

export default function knightMove(start, end) {
  const moveSearchTree = new KnightMoveTree(start);
  let path = levelOrderSearchShortestPath(end, moveSearchTree);
  outputConsoleMsg(path);
}
