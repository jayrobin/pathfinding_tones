import Cell from '../../model/cell';

export default interface Search {
  tick: () => boolean;
  getUpdatedThisTick: () => Cell[];
  getShortestPath: () => Cell[];
}
