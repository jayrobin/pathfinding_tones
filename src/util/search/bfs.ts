import Cell from '../../model/cell';
import Search from './search';

export default class BFS extends Search {
  queue: Cell[];

  constructor(start: Cell, destination: Cell) {
    super(start, destination);

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

  getDebugOutput = () => {
    let debugOutput = 'Queue\n';
    debugOutput += this.queue.map(({ x, y }) => `(${x}, ${y})`).join('\n');
    return debugOutput;
  }
}
