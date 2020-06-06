import React from 'react';
import Grid from '../model/grid';
import { ALGORITHMS } from '../util/search';
import UI from './ui';

const getSearchAlgorithm = (algorithm: Algorithm, grid: Grid) => new ALGORITHMS[algorithm](grid.start, grid.destination);

type Algorithm = keyof typeof ALGORITHMS;

const App = () => {
  const [playing, setPlaying] = React.useState(false);
  const [algorithm, setAlgorithm] = React.useState<Algorithm>('A*');
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
          timer = setTimeout(nextTick, 25);
        }
      }
    }
    if (playing) {
      nextTick();
    }

    return () => clearTimeout(timer);
  }, [playing, grid]);

  return (
    <div style={styles.container}>
      <h1>Pathfinding tones</h1>
      <UI
        grid={grid}
        playing={playing}
        algorithm={algorithm}
        onClickNewGrid={onClickNewGrid}
        onClickPlay={onClickPlay}
        onChangeAlgorithm={onChangeAlgorithm}
        onDraw={onDraw}
      />
    </div>
  );
}

const styles = {
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column' as 'column',
  },
  canvasContainer: {
    margin: '25px'
  }
};

export default App;
