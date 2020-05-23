import { drawSquare } from '../util/draw';

enum CellState {
  EMPTY,
  SELECTED
}

export default class Cell {
  x: number;
  y: number;
  state: CellState;
  neighbors: Cell[];

  constructor(x: number, y: number, state: CellState) {
    this.x = x;
    this.y = y;
    this.state = state;
    this.neighbors = [];
  }

  addNeighbor = (neighbor: Cell) => {
    this.neighbors.push(neighbor);
  }

  render = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    let color;
    switch (this.state) {
      case 0:
        color = 'deepskyblue';
        break;
      case 1:
        color = 'red';
        break;
      default:
        color = 'black';
    }
    drawSquare(ctx, x, y, size, color);
  }
}
