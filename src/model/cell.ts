import { drawSquare } from '../util/draw';

export enum CellState {
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
  }

  reset = () => {
    this.metadata = {};
    if (this.state !== CellState.OBSTACLE) {
      this.state = CellState.UNEXPLORED;
    }
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

  isExplored = () => {
    return this.state === CellState.EXPLORED;
  }

  isObstacle = () => {
    return this.state === CellState.OBSTACLE;
  }

  getNeighbors = () => {
    return this.neighbors.filter(({ state }) => state !== CellState.OBSTACLE);
  }

  getUnexploredNeighbors = () => {
    return this.neighbors.filter(({ state }) => state === CellState.UNEXPLORED || state === CellState.EXPLORING);
  }

  distanceTo = (cell: Cell) => {
    return Math.abs(this.x - cell.x) + Math.abs(this.y - cell.y);
  }

  euclideanDistanceTo = (cell: Cell) => {
    return Math.sqrt(Math.pow(this.x - cell.x, 2) + Math.pow(this.y - cell.y, 2));
  }

  toggleWall = () => {
    this.state = this.state === CellState.OBSTACLE ? CellState.UNEXPLORED : CellState.OBSTACLE;
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
