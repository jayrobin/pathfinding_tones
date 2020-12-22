import React from 'react';
import Grid from '../model/grid';
import { ALGORITHMS } from '../util/search';
import UI from './ui';

const getSearchAlgorithm = (algorithm: Algorithm, grid: Grid) => new ALGORITHMS[algorithm](grid.start, grid.destination);

type Algorithm = keyof typeof ALGORITHMS;

const App = () => {
  const [playing, setPlaying] = React.useState(false);
  const [algorithm, setAlgorithm] = React.useState<Algorithm>('A*');
  const [delay, setDelay] = React.useState<number>(25);
  const [grid, setGrid] = React.useState(new Grid(30, 30, 15));
  const [_, setTick] = React.useState(0);

  const onClickNewGrid = () => {
    setPlaying(false);
    setTick(0);
    setGrid(new Grid(30, 30, 15));
  };

  const resetGrid = React.useCallback(() => {
    setTick(0);
    grid.reset();
    grid.setSearch(getSearchAlgorithm(algorithm, grid));
  }, [algorithm, grid]);

  const onChangeAlgorithm = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAlgorithm(e.currentTarget.value as Algorithm);
  };

  const onChangeDelay = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDelay(Number(e.currentTarget.value));
  };

  const onClickPlay = () => {
    if (grid.finished) {
      resetGrid();
    }
    setPlaying(!playing);
  }

  const onDraw = () => {
    resetGrid();
    setPlaying(false);
  }

  React.useEffect(() => {
    resetGrid();
    setPlaying(false);
  }, [algorithm, grid, resetGrid]);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    const nextTick = () => {
      if (playing) {
        if (grid.tick()) {
          grid.playTonesForCurrentPath();
          setPlaying(false);
        } else {
          setTick(tick => tick + 1);
          grid.playTonesForUpdatedCells();
          timer = setTimeout(nextTick, delay);
        }
      }
    }
    if (playing) {
      nextTick();
    }

    return () => clearTimeout(timer);
  }, [playing, grid, delay]);

  return (
    <div style={styles.container}>
      <h2>The sound of pathfinding <a href="https://github.com/jayrobin/pathfinding_tones" target="_blank" rel="noopener noreferrer nofollow">(source)</a></h2>
      <p>
        <strong>Why I built this:</strong>
        Inspired by the classic <a href="https://www.youtube.com/watch?v=kPRA0W1kECg" target="_blank" rel="noopener noreferrer nofollow">15 Sorting Algorithms in 6 minutes</a> I
        wanted to know what different pathfinding algorithms <em>sound</em> like.
      </p>
      <p>A note is played every time a node is explored, with a pitch relative to the Manhattan distance between the node and the goal.</p>
      <div style={styles.canvasContainer}>
        <UI
          grid={grid}
          playing={playing}
          algorithm={algorithm}
          delay={delay}
          onClickNewGrid={onClickNewGrid}
          onClickPlay={onClickPlay}
          onChangeAlgorithm={onChangeAlgorithm}
          onChangeDelay={onChangeDelay}
          onDraw={onDraw}
        />
      </div>
    </div>
  );
}

const styles = {
  container: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column' as 'column',
  },
  canvasContainer: {
    alignSelf: 'center',
  }
};

export default App;
