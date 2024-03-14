import knightMoveGraph from "./knightMoveGraph";

class KnightMoveTreeNode {
  constructor([x, y]) {
    this.from = null;
    this.coord = [x, y];
    this.to = knightMoveGraph[y][x];
  }
}

export default KnightMoveTreeNode;
