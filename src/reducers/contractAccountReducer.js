import {
  CONTRACT_ACCOUNT,
  ERROR
} from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case CONTRACT_ACCOUNT:
      return action.payload;
    case ERROR:
      return action.payload;
    default:
      return state;
  }
}
