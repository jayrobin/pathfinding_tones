import Cell from '../model/cell';
import Grid from '../model/grid';

export const drawSquare = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, size, size);
}

export const drawLine = (ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color = 'black', alpha = 1.0) => {
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.closePath();
  ctx.globalAlpha = 1.0;
}

export const drawPathFromGridCoords = (ctx: CanvasRenderingContext2D, path: Cell[], cellSize: number) => {
  for (let i = 0; i < path.length - 1; i++) {
    const { x: x1, y: y1 } = path[i];
    const { x: x2, y: y2 } = path[i + 1];

    const offset = Math.floor(cellSize / 2);
    drawLine(ctx, x1 * cellSize + offset, y1 * cellSize + offset, x2 * cellSize + offset, y2 * cellSize + offset);
  }
}

export const drawGrid = (ctx: CanvasRenderingContext2D, grid: Grid) => {
  for (let y = 0; y < grid.height; y++) {
    for (let x = 0; x < grid.width; x++) {
      const cell = grid.get(x, y);

      let overrideColor;
      if (cell === grid.start) {
        overrideColor = '#00adb5';
      } else if (cell === grid.destination) {
        overrideColor = '#bb596b';
      }

      cell.render(ctx, x * grid.cellSize, y * grid.cellSize, grid.cellSize, overrideColor);
    }
  }
}


export const drawGridLines = (ctx: CanvasRenderingContext2D, grid: Grid) => {
  for (let y = 0; y < grid.height; y++) {
    drawLine(ctx, 0, y * grid.cellSize, grid.width * grid.cellSize, y * grid.cellSize, 'black', 0.3);
  }

  for (let x = 0; x < grid.height; x++) {
    drawLine(ctx, x * grid.cellSize, 0, x * grid.cellSize, grid.height * grid.cellSize, 'black', 0.3);
  }
}


export const drawCells = (ctx: CanvasRenderingContext2D, cells: Cell[], cellSize: number, start: Cell, destination: Cell) => {
  cells.forEach((cell) => {
    let overrideColor;
    if (cell === start) {
      overrideColor = '#00adb5';
    } else if (cell === destination) {
      overrideColor = '#bb596b';
    }

    cell.render(ctx, cell.x * cellSize, cell.y * cellSize, cellSize, overrideColor);
  });
}
