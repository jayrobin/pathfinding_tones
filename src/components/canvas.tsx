import React from 'react';
import Grid from '../model/grid';
import { drawPathFromGridCoords, drawGrid, drawGridLines } from '../util/draw';

type Props = {
  grid: Grid;
}

const Canvas = ({ grid }: Props) => {
  const canvasWidth = grid.width * grid.cellSize;
  const canvasHeight = grid.height * grid.cellSize;
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      drawGrid(ctx, grid);
      drawGridLines(ctx, grid);
      drawPathFromGridCoords(ctx, grid.getCurrentPath(), grid.cellSize)
    }
  }, [grid, grid.currentTick]);

  return (
    <>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
      />
    </>
  )
}

export default Canvas;
