import React from 'react';
import { ALGORITHMS } from '../util/search';
import Grid from '../model/grid';
import Canvas from './canvas';

type Props = {
  grid: Grid;
  playing: boolean;
  algorithm: string;
  onClickPlay: () => void;
  onClickNewGrid: () => void;
  onChangeAlgorithm: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const UI = ({
  grid,
  playing,
  algorithm,
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
