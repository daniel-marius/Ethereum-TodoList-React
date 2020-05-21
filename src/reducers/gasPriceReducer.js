import {
  GAS_PRICE,
  ERROR
} from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case GAS_PRICE:
      return action.payload;
    case ERROR:
      return action.payload;
    default:
      return state;
  }
}
