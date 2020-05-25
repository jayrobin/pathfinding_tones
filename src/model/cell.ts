import { drawSquare } from '../util/draw';

enum CellState {
  UNEXPLORED,
  EXPLORING,
  EXPLORED
}

export default class Cell {
  x: number;
  y: number;
  state: CellState = CellState.UNEXPLORED;
  neighbors: Cell[];
  metadata: {
    [key: string]: any
  }

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.neighbors = [];
    this.metadata = {};
  }

  resetMetadata = () => {
    this.metadata = {};
  }

  addNeighbor = (neighbor: Cell) => {
    this.neighbors.push(neighbor);
  }

  setExplored = () => {
    this.state = CellState.EXPLORED;
  }

  setExploring = () => {
    this.state = CellState.EXPLORING;
  }

  getUnexploredNeighbors = () => {
    return this.neighbors.filter(({ state }) => state === CellState.UNEXPLORED);
  }

  distanceTo = (cell: Cell) => {
    return Math.abs(this.x - cell.x) + Math.abs(this.y - cell.y);
  }

  render = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, overrideColor?: string) => {
    let color;
    switch (this.state) {
      case CellState.UNEXPLORED:
        color = 'deepskyblue';
        break;
      case CellState.EXPLORING:
        color = 'blue';
        break;
      case CellState.EXPLORED:
        color = 'grey';
        break;
      default:
        color = 'black';
    }
    drawSquare(ctx, x, y, size, overrideColor || color);
  }
}
