import React from 'react';
import Grid from '../model/grid';
import BFS from '../util/search/bfs';
import Canvas from './canvas';

const grid = new Grid(20, 20, 20);
const bfs = new BFS(grid, grid.start, grid.destination);
grid.setSearch(bfs);

const App = () => {
  const [playing, setPlaying] = React.useState(false);
  const reset = () => {
    setPlaying(false);
    grid.reset();
    const bfs = new BFS(grid, grid.start, grid.destination);
    grid.setSearch(bfs);
  }

  return (
    <div style={styles.container}>
      <h1>Pathfinding tones</h1>
      <div style={styles.canvasContainer}>
        <Canvas grid={grid} playing={playing} tickDelay={100} />
      </div>
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
