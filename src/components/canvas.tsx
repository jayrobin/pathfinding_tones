import React from 'react';
import Grid from '../model/grid';

type Props = {
  grid: Grid;
  playing: boolean;
  tickDelay: number;
  onFinished: () => void;
}

const Canvas = ({ grid, playing, tickDelay, onFinished }: Props) => {
  const canvasWidth = grid.width * grid.cellSize;
  const canvasHeight = grid.height * grid.cellSize;
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const renderGrid = React.useCallback((initialRender: boolean = false) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      grid.render(ctx, initialRender);
    }
  }, [grid])

  React.useEffect(() => renderGrid(true), [canvasHeight, canvasWidth, grid, renderGrid]);
  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    const tick = () => {
      if (playing) {
        if (grid.tick()) {
          onFinished();
        }
        renderGrid();
        timer = setTimeout(tick, tickDelay);
      }
    }

    if (playing) {
      tick();
    }

    return () => clearTimeout(timer);
  }, [grid, onFinished, playing, renderGrid, tickDelay]);

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
