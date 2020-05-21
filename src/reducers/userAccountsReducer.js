import {
  USER_ACCOUNT,
  ERROR
} from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case USER_ACCOUNT:
      return action.payload;
    case ERROR:
      return action.payload;
    default:
      return state;
  }
}
