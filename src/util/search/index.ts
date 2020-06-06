import Dijkstra from './dijkstra';
import AStar from './aStar';
import BFS from './bfs';
import DFS from './dfs';
import Random from './random';

export const ALGORITHMS = {
  'Dijkstra': Dijkstra,
  'A*': AStar,
  'Breadth-first search': BFS,
  'Depth-first search': DFS,
  'Random': Random,
};
