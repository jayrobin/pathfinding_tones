import React from 'react';
import { ALGORITHMS } from '../util/search';
import Grid from '../model/grid';
import Canvas from './canvas';
import Dropdown from './dropdown';

type Props = {
  grid: Grid;
  algorithm: string;
  playing: boolean;
  delay: number;
  onClickPlay: () => void;
  onClickNewGrid: () => void;
  onChangeAlgorithm: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeDelay: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDraw: () => void;
}

const UI = ({
  grid,
  algorithm,
  playing,
  delay,
  onClickPlay,
  onClickNewGrid,
  onChangeAlgorithm,
  onChangeDelay,
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
        <div style={styles.buttonsContainer}>
          <button style={{...styles.button, ...styles.playButton}} onClick={onClickPlay}>{playing ? 'Pause' : 'Play'}</button>
          <button style={styles.button} onClick={onClickNewGrid}>Reset</button>
        </div>
      </div>
      <p onClick={() => setShowDebugOutput(!showDebugOutput)} style={styles.debugControl}>
        [{showDebugOutput ? '-] Hide' : '+] Show'} debug controls
      </p>
      {showDebugOutput && (
        <>
          <label>Step delay (ms)<input type="number" style={styles.delay} value={delay} min="10" max="500" step="25" onChange={onChangeDelay} /></label>
          {/* <textarea defaultValue={grid.getDebugOutput()} disabled /> */}
          <p>Explored: {grid.getNumExplored()} &middot; Current path length: {grid.getCurrentPath().length}</p>
          <p></p>
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
    justifyContent: 'center',
    width: '100%',
    marginBottom: '15px',
  },
  debugControl: {
    cursor: 'pointer',
    userSelect: 'none' as 'none',
  },
  playButton: {
    marginBottom: '10px',
  },
  button: {
    padding: '5px',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    marginLeft: '10px',
    width: '120px',
  },
  delay: {
    marginLeft: '10px',
    textAlign: 'center' as 'center',
    padding: '5px',
  },
};

export default UI;
