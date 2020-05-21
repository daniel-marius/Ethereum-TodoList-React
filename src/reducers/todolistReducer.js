import _ from 'lodash';
import {
  BLOCKCHAIN_ITEMS,
  CREATE_ITEM,
  EDIT_ITEM,
  ERROR
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case BLOCKCHAIN_ITEMS:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case CREATE_ITEM:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_ITEM:
      return { ...state, [action.payload.id]: action.payload };
    case ERROR:
      return action.payload;
    default:
      return state;
  }
}
