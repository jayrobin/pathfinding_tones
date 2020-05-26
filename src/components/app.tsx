import React from 'react';
import Grid from '../model/grid';
import Dijkstra from '../util/search/dijkstra';
import Canvas from './canvas';

const App = () => {
  const initGrid = () => {
    const grid = new Grid(20, 20, 20);
    const dijkstra = new Dijkstra(grid, grid.start, grid.destination);
    grid.setSearch(dijkstra);
    return grid;
  }

  const [playing, setPlaying] = React.useState(false);
  const [grid, setGrid] = React.useState(initGrid());
  const reset = () => {
    setGrid(initGrid());
    setPlaying(false);
    const dijkstra = new Dijkstra(grid, grid.start, grid.destination);
    grid.setSearch(dijkstra);
  }

  const onFinished = () => {
    setPlaying(false);
  }

  return (
    <div style={styles.container}>
      <h1>Pathfinding tones</h1>
      <div style={styles.canvasContainer}>
        <Canvas grid={grid} playing={playing} tickDelay={25} onFinished={onFinished} />
      </div>
      <button onClick={() => setPlaying(!playing)} disabled={grid.finished}>{playing ? 'Pause' : 'Play'}</button>
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
