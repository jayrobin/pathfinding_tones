import Cell from '../../model/cell';
import Grid from '../../model/grid';

export default class BFS {
  grid: Grid;
  destination: Cell;
  queue: Cell[];
  updatedThisTick: Cell[];

  constructor(grid: Grid, start: Cell, destination: Cell) {
    this.grid = grid;
    this.destination = destination;
    this.queue = [start];
    this.updatedThisTick = [];
  }

  tick = () => {
    if (this.queue.length) {
      this.updatedThisTick = [];
      const next = this.queue.shift() as Cell;
      if (next === this.destination) {
        return true;
      }

      const unexploredNeighbors = next.getUnexploredNeighbors();
      unexploredNeighbors.forEach((neighbor) => {
        neighbor.setExploring();
        neighbor.metadata.prev = next;
        this.queue.push(neighbor);
        this.updatedThisTick.push(neighbor);
      });
      next.setExplored();
      this.updatedThisTick.push(next);

      return false;
    } else {
      return true;
    }
  }

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
