import {
  CONTRACT_ACCOUNT_BALANCE,
  ERROR
} from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case CONTRACT_ACCOUNT_BALANCE:
      return action.payload;
    case ERROR:
      return action.payload;
    default:
      return state;
  }
}
