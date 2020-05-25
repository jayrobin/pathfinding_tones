import Cell from '../../model/cell';
import Grid from '../../model/grid';

export interface ISearch {
  tick: () => boolean;
  getUpdatedThisTick: () => Cell[];
  getShortestPath: () => Cell[];
}

export default class Search implements ISearch {
  grid: Grid;
  destination: Cell;
  updatedThisTick: Cell[];

  constructor(grid: Grid, start: Cell, destination: Cell) {
    this.grid = grid;
    this.destination = destination;
    this.updatedThisTick = [];
  }

  tick = () => true

  getUpdatedThisTick = () => {
    return this.updatedThisTick;
  }

  getShortestPath = () => {
    const path: Cell[] = [];
    let node = this.destination;
    while (node) {
      path.push(node);
      node = node.metadata.prev;
    }

    return path;
  }
}
