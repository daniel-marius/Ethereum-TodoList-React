import {
  LATEST_BLOCK,
  ERROR
} from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case LATEST_BLOCK:
      return action.payload;
    case ERROR:
      return action.payload;
    default:
      return state;
  }
}
