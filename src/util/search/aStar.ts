import TinyQueue from 'tinyqueue';
import Cell from '../../model/cell';
import Search from './search';

export default class AStar extends Search {
  openSet: TinyQueue<Cell>;

  constructor(start: Cell, destination: Cell) {
    super(start, destination);

    start.metadata.fScore = start.euclideanDistanceTo(destination);
    start.metadata.gScore = 0;
    this.openSet = new TinyQueue([start], (a, b) => {
      return a.metadata.fScore - b.metadata.fScore;
    });
  }

  tick = () => {
    if (this.openSet.length) {
      this.updatedThisTick = [];
      const current = this.openSet.pop() as Cell;
      if (current === this.destination) {
        return true;
      }

      const neighbors = current.getNeighbors();
      neighbors.forEach((neighbor) => {
        const tentativeGScore = current.metadata.gScore + current.distanceTo(neighbor);
        if (neighbor.metadata.gScore === undefined || tentativeGScore < neighbor.metadata.gScore) {
          neighbor.metadata.prev = current;
          neighbor.metadata.gScore = tentativeGScore;
          neighbor.metadata.fScore = neighbor.metadata.gScore + neighbor.euclideanDistanceTo(this.destination);

          if (!this.openSet.data.includes(neighbor)) {
            this.openSet.push(neighbor);
          }
          neighbor.setExploring();
          this.updatedThisTick.push(neighbor);
        }
      });
      current.setExplored();
      this.updatedThisTick.push(current);

      return false;
    } else {
      return true;
    }
  }

  getDebugOutput = () => {
    let debugOutput = 'Queue\n';
    debugOutput += this.openSet.data.map(({ x, y, metadata }) => `(${x}, ${y}) ${metadata.fScore.toFixed(3)}`).join('\n');
    return debugOutput;
  }
}
