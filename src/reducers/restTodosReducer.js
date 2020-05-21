import _ from 'lodash';
import {
  REST_TODOS,
  REST_TODO,
  COMPLETE_REST_TODO,
  DELETE_REST_TODO,
  ERROR
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case REST_TODOS:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case REST_TODO:
      return action.payload;
    case COMPLETE_REST_TODO:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case DELETE_REST_TODO:
      return _.omit(state, action.payload);
    case ERROR:
      return action.payload;
    default:
      return state;
  }
}
