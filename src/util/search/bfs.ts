import Cell from '../../model/cell';
import Grid from '../../model/grid';

export default class BFS {
  grid: Grid;
  destination: Cell;
  queue: Cell[];

  constructor(grid: Grid, start: Cell, destination: Cell) {
    this.grid = grid;
    this.destination = destination;
    this.queue = [start];
  }

  tick = () => {
    if (this.queue.length) {
      const next = this.queue.shift() as Cell;
      if (next === this.destination) {
        return true;
      }

      const unexploredNeighbors = next.getUnexploredNeighbors();
      unexploredNeighbors.forEach((neighbor) => {
        neighbor.setExploring();
        this.queue.push(neighbor);
      });
      next.setExplored();

      return false;
    } else {
      return true;
    }
  }
}
