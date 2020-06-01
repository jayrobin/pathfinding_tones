import Cell from '../../model/cell';
import Search from './search';

export default class DFS extends Search {
  stack: Cell[];

  constructor(start: Cell, destination: Cell) {
    super(start, destination);

    this.stack = [start];
  }

  tick = () => {
    if (this.stack.length) {
      this.updatedThisTick = [];
      const next = this.stack.pop() as Cell;
      if (next === this.destination) {
        return true;
      }

      const unexploredNeighbors = next.getUnexploredNeighbors();
      unexploredNeighbors.forEach((neighbor) => {
        neighbor.setExploring();
        neighbor.metadata.prev = next;
        this.stack.push(neighbor);
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
    let debugOutput = 'Stack\n';
    debugOutput += this.stack.map(({ x, y }) => `(${x}, ${y})`).join('\n');
    return debugOutput;
  }
}
