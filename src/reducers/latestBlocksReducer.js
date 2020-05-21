import {
  LATEST_BLOCKS,
  ERROR
} from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case LATEST_BLOCKS:
      return action.payload;
    case ERROR:
      return action.payload;
    default:
      return state;
  }
}
