import { ISearch } from '../util/search/search';
import { playTone } from '../util/tone';
import Cell from './cell';

export default class Grid {
  currentTick: number;
  width: number;
  height: number;
  cellSize: number;
  cols: Cell[][];
  start: Cell;
  destination: Cell;
  search?: ISearch;
  finished: boolean;

  constructor(width: number, height: number, cellSize: number) {
    this.currentTick = 0;
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
    this.cols = Grid.createGrid(width, height);

    this.start = this.get(0, 0);
    this.start.setUnexplored();

    this.destination = this.get(width - 1, height - 1);
    this.destination.setUnexplored();

    this.finished = false;
  }

  get = (x: number, y: number) => {
    return this.cols[y][x];
  }

  setSearch = (search: ISearch) => {
    this.search = search;
  }

  reset = () => {
    this.cols.forEach((row) => {
      row.forEach((cell) => {
        cell.reset();
      })
    });
    this.currentTick = 0;
    this.finished = false;
  }

  tick = () => {
    if (this.search && !this.finished) {
      this.currentTick++;
      this.finished = this.search.tick();
    }

    return this.finished;
  }

  onClick = (screenX: number, screenY: number) => {
    const x = Math.floor(screenX / this.cellSize);
    const y = Math.floor(screenY / this.cellSize);
    this.get(x, y).state = 1;
    this.get(x, y).neighbors.forEach(c => c.state = 1)
  }

  getCurrentPath = () => {
    if (!this.search) {
      return [];
    }

    return this.finished ?
      this.search.getShortestPath() :
      this.search.getPathFromStartToCell(this.search.getUpdatedThisTick()[0] as Cell);
  }

  getNumExplored = () => {
    return this.cols.reduce((sum, row) => {
      return sum + row.reduce((rowSum, cell) => {
        return rowSum + (cell.isExplored() ? 1 : 0)
      },0)
    }, 0);
  }

  getUpdatedCells = () => {
    if (!this.search) {
      return [];
    }

    return this.search.getUpdatedThisTick();
  }

  playTones = () => {
    if (!this.search) {
      return;
    }

    const MAX_FREQUENCY = 1200;
    const maxDistance = this.start.distanceTo(this.destination);
    this.search.getUpdatedThisTick().forEach((cell) => {
      const normalizedFrequency = Math.floor(((maxDistance - cell.distanceTo(this.destination)) / maxDistance) * MAX_FREQUENCY);
      playTone(normalizedFrequency, 10);
    });
  }

  getDebugOutput = () => {
    return this.search?.getDebugOutput() || '';
  }

  static createGrid(width: number, height: number) {
    const cols = [];
    for (let y = 0; y < height; y++) {
      const row = [];
      for (let x = 0; x < width; x++) {
        row.push(new Cell(x, y));
      }
      cols.push(row);
    }
    return Grid.initializeNeighbors(cols);
  }

  static initializeNeighbors(cols: Cell[][]) {
    const width = cols.length;
    const height = cols[0].length;
    cols.forEach((row, x) => {
      row.forEach((cell, y) => {
        if (x > 0) {
          cell.addNeighbor(cols[x - 1][y]);
        }
        if (x < width - 1) {
          cell.addNeighbor(cols[x + 1][y]);
        }
        if (y > 0) {
          cell.addNeighbor(cols[x][y - 1]);
        }
        if (y < height - 1) {
          cell.addNeighbor(cols[x][y + 1]);
        }
      })
    });
    return cols;
  }
}
