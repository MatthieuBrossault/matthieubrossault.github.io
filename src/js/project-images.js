import taskTrackerImg from '../images/task_tracker.webp';
import ticTacToeImg from '../images/tic_tac_toe.webp';
import handsOnReactImg from '../images/hands_on_react.webp';
import netCoreAngularImg from '../images/net_core_and_angular.webp';
import react18Img from '../images/react_18.webp';

/** Project id (from src/data/*.json) → bundled image URL */
export const projectImageById = {
  'angular-task-tracker': taskTrackerImg,
  'angular-tic-tac-toe': ticTacToeImg,
  'hands-on-react-labs': handsOnReactImg,
  'netcore-angular-exemple': netCoreAngularImg,
  'traversy-react-18': react18Img,
};

export function projectImageUrl(projectId) {
  return projectImageById[projectId] ?? null;
}
