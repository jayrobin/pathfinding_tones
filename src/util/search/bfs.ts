import Cell from '../../model/cell';
import Grid from '../../model/grid';
import Search from './index';

export default class BFS extends Search {
  queue: Cell[];

  constructor(grid: Grid, start: Cell, destination: Cell) {
    super(grid, start, destination);

    this.queue = [start];
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
}
