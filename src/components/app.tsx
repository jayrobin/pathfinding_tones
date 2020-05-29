import React from 'react';
import Grid from '../model/grid';
import Dijkstra from '../util/search/dijkstra';
import BFS from '../util/search/bfs';
import Canvas from './canvas';

const ALGORITHMS = {
  'Breadth-first search': BFS,
  'Dijkstra': Dijkstra,
};

const getSearchAlgorithm = (algorithm: Algorithm, grid: Grid) => new ALGORITHMS[algorithm](grid, grid.start, grid.destination);

type Algorithm = keyof typeof ALGORITHMS;

const App = () => {
  const [playing, setPlaying] = React.useState(false);
  const [algorithm, setAlgorithm] = React.useState<Algorithm>('Dijkstra');
  const [grid, setGrid] = React.useState(new Grid(20, 20, 20));

  React.useEffect(() => {
    grid.reset();
    grid.setSearch(getSearchAlgorithm(algorithm, grid));
  }, [algorithm, grid]);

  const reset = () => {
    setGrid(new Grid(20, 20, 20));
  };

  const onFinished = () => {
    setPlaying(false);
  };

  const onChangeAlgorithm = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAlgorithm(e.currentTarget.value as Algorithm);
  }

  return (
    <div style={styles.container}>
      <h1>Pathfinding tones</h1>
      <div style={styles.canvasContainer}>
        <Canvas grid={grid} playing={playing} tickDelay={25} onFinished={onFinished} />
      </div>
      <select value={algorithm} onChange={onChangeAlgorithm}>
        {Object.keys(ALGORITHMS).map((algorithmName) => {
          return <option key={algorithmName} value={algorithmName}>{algorithmName}</option>
        })}
      </select>
      <button onClick={() => setPlaying(!playing)}>{playing ? 'Pause' : 'Play'}</button>
      <button onClick={reset}>Reset</button>
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
