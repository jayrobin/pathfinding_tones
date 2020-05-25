import TinyQueue from 'tinyqueue';
import Cell from '../../model/cell';
import Grid from '../../model/grid';
import Search from './index';

export default class Dijkstra extends Search {
  queue: TinyQueue<Cell>;

  constructor(grid: Grid, start: Cell, destination: Cell) {
    super(grid, start, destination);

    start.metadata.distanceFromSource = 0;
    this.queue = new TinyQueue([start], (a, b) => {
      return a.metadata.distanceFromSource - b.metadata.distanceFromSource;
    });
  }

  tick = () => {
    if (this.queue.length) {
      this.updatedThisTick = [];
      const next = this.queue.pop() as Cell;
      if (next === this.destination) {
        return true;
      }

      const unexploredNeighbors = next.getUnexploredNeighbors();
      unexploredNeighbors.forEach((neighbor) => {
        neighbor.setExploring();

        const distanceFromSourceToNeighbor = next.distanceTo(neighbor) + next.metadata.distanceFromSource;
        if (neighbor.metadata.distanceFromSource === undefined || distanceFromSourceToNeighbor < neighbor.metadata.distanceFromSource) {
          neighbor.metadata.distanceFromSource = distanceFromSourceToNeighbor;
          neighbor.metadata.prev = next;
        }
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
