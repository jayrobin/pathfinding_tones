import Cell from '../../model/cell';

export interface ISearch {
  tick: () => boolean;
  getUpdatedThisTick: () => Cell[];
  getShortestPath: () => Cell[];
  getPathFromStartToCell: (cell: Cell) => Cell[];
}

export default class Search implements ISearch {
  destination: Cell;
  updatedThisTick: Cell[];

  constructor(_start: Cell, destination: Cell) {
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
