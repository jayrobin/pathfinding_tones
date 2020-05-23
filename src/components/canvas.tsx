import React from 'react';
import Grid from '../model/grid';

type Props = {
  grid: Grid;
  playing: boolean;
  tickDelay: number;
}

const Canvas = ({ grid, playing, tickDelay }: Props) => {
  const canvasWidth = grid.width * grid.cellSize;
  const canvasHeight = grid.height * grid.cellSize;
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const renderGrid = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      ctx.clearRect(0, 0, canvasHeight, canvasWidth);
      grid.render(ctx);
    }
  }, [canvasHeight, canvasWidth, grid])

  React.useEffect(renderGrid, [canvasHeight, canvasWidth, grid]);
  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    const tick = () => {
      if (playing) {
        grid.tick();
        renderGrid();
        timer = setTimeout(tick, tickDelay);
      }
    }

    if (playing) {
      tick();
    }

    return () => clearTimeout(timer);
  }, [grid, playing, renderGrid, tickDelay]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
    />
  )
}

export default Canvas;
