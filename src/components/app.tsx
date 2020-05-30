import React from 'react';
import Grid from '../model/grid';
import Dijkstra from '../util/search/dijkstra';
import BFS from '../util/search/bfs';
import DFS from '../util/search/dfs';
import Canvas from './canvas';

const ALGORITHMS = {
  'Dijkstra': Dijkstra,
  'Breadth-first search': BFS,
  'Depth-first search': DFS,
};

const getSearchAlgorithm = (algorithm: Algorithm, grid: Grid) => new ALGORITHMS[algorithm](grid.start, grid.destination);

type Algorithm = keyof typeof ALGORITHMS;

const App = () => {
  const [playing, setPlaying] = React.useState(false);
  const [algorithm, setAlgorithm] = React.useState<Algorithm>('Dijkstra');
  const [grid, setGrid] = React.useState(new Grid(20, 20, 20));
  const [_, setTick] = React.useState(0);

  const onClickNewGrid = () => {
    setPlaying(false);
    setTick(0);
    setGrid(new Grid(20, 20, 20));
  };

  const resetGrid = React.useCallback(() => {
    grid.reset();
    grid.setSearch(getSearchAlgorithm(algorithm, grid));
  }, [algorithm, grid]);

  const onChangeAlgorithm = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAlgorithm(e.currentTarget.value as Algorithm);
  };

  const onClickPlay = () => {
    if (grid.finished) {
      setTick(0);
      resetGrid();
    }
    setPlaying(!playing);
  }

  React.useEffect(() => {
    setPlaying(false);
    setTick(0);
    resetGrid();
  }, [algorithm, grid, resetGrid]);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    const nextTick = () => {
      if (playing) {
        if (grid.tick()) {
          setPlaying(false);
        } else {
          setTick(tick => tick + 1);
          grid.playTones();
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
      <div style={styles.canvasContainer}>
        <Canvas grid={grid} />
      </div>
      <select value={algorithm} onChange={onChangeAlgorithm}>
        {Object.keys(ALGORITHMS).map((algorithmName) => {
          return <option key={algorithmName} value={algorithmName}>{algorithmName}</option>
        })}
      </select>
      <button onClick={onClickPlay}>{playing ? 'Pause' : 'Play'}</button>
      <button onClick={onClickNewGrid}>New grid</button>
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
