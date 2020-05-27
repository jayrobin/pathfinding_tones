import Cell from '../../model/cell';
import Grid from '../../model/grid';

export interface ISearch {
  tick: () => boolean;
  getUpdatedThisTick: () => Cell[];
  getShortestPath: () => Cell[];
  getPathFromStartToCell: (cell: Cell) => Cell[];
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
    return this.getPathFromStartToCell(this.destination);
  }

  getPathFromStartToCell = (cell: Cell) => {
    const path: Cell[] = [];
    let node = cell;
    while (node) {
      path.push(node);
      node = node.metadata.prev;
    }

    return path;
  }
}
