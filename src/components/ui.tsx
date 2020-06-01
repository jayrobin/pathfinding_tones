import React from 'react';
import { ALGORITHMS } from '../util/search';
import Grid from '../model/grid';
import Canvas from './canvas';

type Props = {
  grid: Grid;
  algorithm: string;
  playing: boolean;
  showDebugOutput?: boolean;
  onClickPlay: () => void;
  onClickNewGrid: () => void;
  onChangeAlgorithm: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const UI = ({
  grid,
  algorithm,
  playing,
  showDebugOutput,
  onClickPlay,
  onClickNewGrid,
  onChangeAlgorithm,
  }: Props) => {

  return (
    <>
      <div style={styles.canvasContainer}>
        <Canvas grid={grid} />
      </div>
      <select value={algorithm} onChange={onChangeAlgorithm}>
        {Object.keys(ALGORITHMS).map((algorithmName) => {
          return <option key={algorithmName} value={algorithmName}>{algorithmName}</option>
        })}
      </select>
      {showDebugOutput && <textarea defaultValue={grid.getDebugOutput()} disabled />}
      <button onClick={onClickPlay}>{playing ? 'Pause' : 'Play'}</button>
      <button onClick={onClickNewGrid}>New grid</button>
    </>
  )
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

export default UI;
