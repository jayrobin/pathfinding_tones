import TinyQueue from 'tinyqueue';
import Cell from '../../model/cell';
import Grid from '../../model/grid';

export default class Dijkstra {
  grid: Grid;
  destination: Cell;
  queue: TinyQueue<Cell>;
  updatedThisTick: Cell[];

  constructor(grid: Grid, start: Cell, destination: Cell) {
    this.grid = grid;
    this.destination = destination;

    start.metadata.distanceFromSource = 0;
    this.queue = new TinyQueue([start], (a, b) => {
      return a.metadata.distanceFromSource - b.metadata.distanceFromSource;
    });
    this.updatedThisTick = [];
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
