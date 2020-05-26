import { drawLine } from '../util/draw';
import { ISearch } from '../util/search';
import { playTone } from '../util/tone';
import Cell from './cell';

type Pos = {
  x: number;
  y: number;
}

export default class Grid {
  width: number;
  height: number;
  cellSize: number;
  cols: Cell[][];
  start: Cell;
  destination: Cell;
  search?: ISearch;
  finished: boolean;

  constructor(width: number, height: number, cellSize: number) {
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
    this.cols = Grid.createGrid(width, height);

    this.start = this.get(0, 0);
    this.start.setUnexplored();

    this.destination = this.get(19, 19);
    this.destination.setUnexplored();

    this.finished = false;
  }

  get = (x: number, y: number) => {
    return this.cols[y][x];
  }

  setSearch = (search: ISearch) => {
    this.search = search;
  }

  tick = () => {
    if (this.search && !this.finished) {
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

  render = (ctx: CanvasRenderingContext2D, renderAll: boolean = false) => {
    if (renderAll) {
      this.drawAllCells(ctx);
      this.drawGridLines(ctx);
    } else {
      this.drawUpdatedCells(ctx);
    }

    if (this.search && this.finished) {
      this.drawPath(ctx, this.search.getShortestPath());
    }
  }

  drawUpdatedCells = (ctx: CanvasRenderingContext2D) => {
    if (!this.search) {
      return;
    }

    this.search.getUpdatedThisTick().forEach((cell) => {
      let overrideColor;
      if (cell === this.start) {
        overrideColor = '#00adb5';
      } else if (cell === this.destination) {
        overrideColor = '#bb596b';
      }

      cell.render(ctx, cell.x * this.cellSize, cell.y * this.cellSize, this.cellSize, overrideColor);

      const maxDistance = this.start.distanceTo(this.destination);
      playTone((maxDistance - cell.distanceTo(this.destination)) * 30, 10);
    });
  }

  drawAllCells = (ctx: CanvasRenderingContext2D) => {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const cell = this.get(x, y);

        let overrideColor;
        if (cell === this.start) {
          overrideColor = '#00adb5';
        } else if (cell === this.destination) {
          overrideColor = '#bb596b';
        }

        cell.render(ctx, x * this.cellSize, y * this.cellSize, this.cellSize, overrideColor);
      }
    }
  }

  drawGridLines = (ctx: CanvasRenderingContext2D) => {
    for (let y = 0; y < this.height; y++) {
      drawLine(ctx, 0, y * this.cellSize, this.width * this.cellSize, y * this.cellSize, 'black', 0.3);
    }

    for (let x = 0; x < this.height; x++) {
      drawLine(ctx, x * this.cellSize, 0, x * this.cellSize, this.height * this.cellSize, 'black', 0.3);
    }
  }

  drawPath = (ctx: CanvasRenderingContext2D, path: Cell[]) => {
    for (let i = 0; i < path.length - 1; i++) {
      const { x: x1, y: y1 } = path[i];
      const { x: x2, y: y2 } = path[i + 1];

      const offset = Math.floor(this.cellSize / 2);
      drawLine(ctx, x1 * this.cellSize + offset, y1 * this.cellSize + offset, x2 * this.cellSize + offset, y2 * this.cellSize + offset);
    }
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
