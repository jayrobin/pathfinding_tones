import React from 'react';
import Grid from '../model/grid';
import Canvas from './canvas';

const App = () => {
  const grid = new Grid(20, 20, 20);
  return (
    <div style={styles.container}>
      <h1>Pathfinding tones</h1>
      <Canvas grid={grid} />
    </div>
  );
}

const styles = {
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column' as 'column',
  },
};

export default App;
