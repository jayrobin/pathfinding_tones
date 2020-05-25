import { drawSquare } from '../util/draw';

enum CellState {
  OBSTACLE,
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

    if (Math.random() > 0.75) {
      this.state = CellState.OBSTACLE;
    }
  }

  resetMetadata = () => {
    this.metadata = {};
  }

  addNeighbor = (neighbor: Cell) => {
    this.neighbors.push(neighbor);
  }

  setUnexplored = () => {
    this.state = CellState.UNEXPLORED;
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
      case CellState.OBSTACLE:
        color = '#222831';
        break;
      case CellState.UNEXPLORED:
        color = '#eeeeee';
        break;
      case CellState.EXPLORING:
        color = '#d6c4c1';
        break;
      case CellState.EXPLORED:
        color = '#bdbdbd';
        break;
      default:
        color = '#222831';
    }
    drawSquare(ctx, x, y, size, overrideColor || color);
  }
}
