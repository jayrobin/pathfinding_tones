import React from 'react';
import { ALGORITHMS } from '../util/search';
import Grid from '../model/grid';
import Canvas from './canvas';
import Dropdown from './dropdown';

type Props = {
  grid: Grid;
  algorithm: string;
  playing: boolean;
  onClickPlay: () => void;
  onClickNewGrid: () => void;
  onChangeAlgorithm: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onDraw: () => void;
}

const UI = ({
  grid,
  algorithm,
  playing,
  onClickPlay,
  onClickNewGrid,
  onChangeAlgorithm,
  onDraw,
  }: Props) => {
  const [showDebugOutput, setShowDebugOutput] = React.useState(false);

  return (
    <div style={styles.container}>
      <div style={styles.canvasContainer}>
        <Canvas onMouseDown={onDraw} grid={grid} />
      </div>
      <div style={styles.controlsContainer}>
        <Dropdown
          value={algorithm}
          options={Object.keys(ALGORITHMS)}
          onChange={onChangeAlgorithm}
        />
        <div>
          <button onClick={onClickPlay}>{playing ? 'Pause' : 'Play'}</button>
          <button onClick={onClickNewGrid}>Reset</button>
        </div>
      </div>
      <p onClick={() => setShowDebugOutput(!showDebugOutput)} style={styles.debugControl}>
        [{showDebugOutput ? '-] Hide' : '+] Show'} debug controls
      </p>
      {showDebugOutput && (
        <>
          <textarea defaultValue={grid.getDebugOutput()} disabled />
          <p>Explored: {grid.getNumExplored()}</p>
          <p>Current path length: {grid.getCurrentPath().length}</p>
        </>
      )}
    </div>
  )
}

const styles = {
  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column' as 'column',
  },
  canvasContainer: {
    margin: '25px',
  },
  controlsContainer: {
    display: 'flex',
    width: '100%',
  },
  debugControl: {
    cursor: 'pointer',
    userSelect: 'none' as 'none',
  }
};

export default UI;
