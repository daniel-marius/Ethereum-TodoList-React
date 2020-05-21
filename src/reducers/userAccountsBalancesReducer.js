import {
  USER_ACCOUNT_BALANCE,
  ERROR
} from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case USER_ACCOUNT_BALANCE:
      return action.payload;
    case ERROR:
      return action.payload;
    default:
      return state;
  }
}
