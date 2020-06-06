import React from 'react';
import Grid from '../model/grid';
import { CellState } from '../model/cell';
import { drawPathFromGridCoords, drawGrid, drawGridLines } from '../util/draw';

type Props = {
  grid: Grid;
  onMouseDown: () => void;
}

const Canvas = ({ onMouseDown, grid }: Props) => {
  const canvasWidth = grid.width * grid.cellSize;
  const canvasHeight = grid.height * grid.cellSize;
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const [drawType, setDrawType] = React.useState<CellState | null>(null);

  const renderGrid = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      drawGrid(ctx, grid);
      drawGridLines(ctx, grid);
      drawPathFromGridCoords(ctx, grid.getCurrentPath(), grid.cellSize)
    }
  }, [grid]);

  React.useEffect(() => {
    renderGrid();
  }, [grid, grid.currentTick, renderGrid]);

  const getCanvasCoordinatesFromScreen = (screenX: number, screenY: number) => {
    const canvas = canvasRef.current;
    let x = 0;
    let y = 0;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      x = Math.max(0, Math.floor(screenX - rect.left));
      y = Math.max(0, Math.floor(screenY - rect.top));
    }

    return { x, y };
  }

  const onCanvasMouseDown = ({ clientX, clientY }: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const { x, y } = getCanvasCoordinatesFromScreen(clientX, clientY);
    const { state } = grid.getCellAtScreen(x, y);
    const nextDrawType = state === CellState.OBSTACLE ? CellState.UNEXPLORED : CellState.OBSTACLE;
    setDrawType(nextDrawType);
    grid.setCellStateAtScreen(x, y, nextDrawType);
    renderGrid();
    onMouseDown();
  }

  const onCanvasMouseUp = () => {
    setDrawType(null);
  }

  const onCanvasMouseMove = ({ clientX, clientY }: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (drawType !== null) {
      const { x, y } = getCanvasCoordinatesFromScreen(clientX, clientY);
      grid.setCellStateAtScreen(x, y, drawType);
      renderGrid();
    }
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        onMouseDown={onCanvasMouseDown}
        onMouseUp={onCanvasMouseUp}
        onMouseMove={onCanvasMouseMove}
      />
    </>
  )
}

export default Canvas;
