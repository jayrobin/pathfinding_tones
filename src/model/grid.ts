import { drawLine } from '../util/draw';
import Cell from './cell';

export default class Grid {
  width: number;
  height: number;
  cellSize: number;
  cols: Cell[][];

  constructor(width: number, height: number, cellSize: number) {
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
    this.cols = Grid.createGrid(width, height);
  }

  get = (x: number, y: number) => {
    return this.cols[y][x];
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
        this.get(x, y).render(ctx, x * this.cellSize, y * this.cellSize, this.cellSize);
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
        row.push(new Cell(x, y, 0));
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
