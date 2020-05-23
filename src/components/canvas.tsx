import React from 'react';
import Grid from '../model/grid';

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
      ctx.clearRect(0, 0, canvasHeight, canvasWidth);
      grid.render(ctx);
    }
  }, [canvasHeight, canvasWidth, grid])

  return (
    <canvas
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      onClick={({ clientX, clientY }) => {
        const canvas = canvasRef.current;
        if (canvas) {
          const { left, top } = canvas.getBoundingClientRect();
          grid.onClick(clientX - left, clientY - top);
          const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
          ctx.clearRect(0, 0, canvasHeight, canvasWidth);
          grid.render(ctx);
        }
      }}
    />
  )
}

export default Canvas;
