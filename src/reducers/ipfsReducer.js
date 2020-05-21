import {
  IPFS_UPLOAD,
  ERROR
} from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case IPFS_UPLOAD:
      return action.payload;
    case ERROR:
      return action.payload;
    default:
      return state;
  }
}
