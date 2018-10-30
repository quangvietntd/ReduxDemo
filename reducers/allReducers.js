import {combineReducers} from 'redux';
import movieReducers from './movieReducers.js';

const allReducers = combineReducers({
  movieReducers,
  // You can add more reducers here, separate by , !
});
export default allReducers;
