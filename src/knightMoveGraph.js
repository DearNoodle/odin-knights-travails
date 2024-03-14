const knightMoveGraph = [];
const boardSize = 8;

const checkMoveSpace = ([j, i], [moveX, moveY]) => {
  let coordX = j + moveX;
  let coordY = i + moveY;
  if (coordY >= 0 && coordY < 8 && coordX >= 0 && coordX < 8) {
    knightMoveGraph[i][j].push([coordX, coordY]);
  }
};

for (let i = 0; i < boardSize; i++) {
  knightMoveGraph.push([]);
  for (let j = 0; j < boardSize; j++) {
    knightMoveGraph[i].push([]);
    checkMoveSpace([j, i], [1, 2]);
    checkMoveSpace([j, i], [2, 1]);
    checkMoveSpace([j, i], [1, -2]);
    checkMoveSpace([j, i], [-2, 1]);
    checkMoveSpace([j, i], [-1, 2]);
    checkMoveSpace([j, i], [2, -1]);
    checkMoveSpace([j, i], [-1, -2]);
    checkMoveSpace([j, i], [-2, -1]);
  }
}

export default knightMoveGraph;
