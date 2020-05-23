import { drawLine } from '../util/draw';
import Search from '../util/search';
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
  search?: Search;
  finished: boolean;

  constructor(width: number, height: number, cellSize: number) {
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
    this.cols = Grid.createGrid(width, height);
    this.start = this.get(0, 0);
    this.finished = false;
    this.destination = this.get(5, 5);
  }

  get = (x: number, y: number) => {
    return this.cols[y][x];
  }

  setStart = (x: number, y: number) => {
    this.start = this.get(x, y);
  }

  setDestination = (x: number, y: number) => {
    this.destination = this.get(x, y);
  }

  setSearch = (search: Search) => {
    this.search = search;
  }

  tick = () => {
    if (this.search && !this.finished) {
      this.finished = this.search.tick();
    }
  }

  onClick = (screenX: number, screenY: number) => {
    const x = Math.floor(screenX / this.cellSize);
    const y = Math.floor(screenY / this.cellSize);
    this.get(x, y).state = 1;
    this.get(x, y).neighbors.forEach(c => c.state = 1)
  }

  render = (ctx: CanvasRenderingContext2D) => {
    this.drawCells(ctx);
    this.drawGridLines(ctx);
  }

  drawCells = (ctx: CanvasRenderingContext2D) => {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const cell = this.get(x, y);

        let overrideColor;
        if (cell === this.start) {
          overrideColor = 'white';
        } else if (cell === this.destination) {
          overrideColor = 'black';
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
