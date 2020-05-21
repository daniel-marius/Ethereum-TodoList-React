import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import userAccountsReducer from './userAccountsReducer';
import userAccountsBalancesReducer from './userAccountsBalancesReducer';
import contractAccountReducer from './contractAccountReducer';
import contractAccountBalanceReducer from './contractAccountBalanceReducer';
import todolistReducer from './todolistReducer';
import gasPriceReducer from './gasPriceReducer';
import latestBlockReducer from './latestBlockReducer';
import latestBlocksReducer from './latestBlocksReducer';
import restTodosReducer from './restTodosReducer';
import ipfsReducer from './ipfsReducer';

export default combineReducers({
  userAccounts: userAccountsReducer,
  userAccountsBalances: userAccountsBalancesReducer,
  contractAccount: contractAccountReducer,
  contractAccountBalance: contractAccountBalanceReducer,
  form: formReducer,
  tasks: todolistReducer,
  gasPrice: gasPriceReducer,
  latestBlock: latestBlockReducer,
  latestBlocks: latestBlocksReducer,
  restTodos: restTodosReducer,
  ipfsFileHash: ipfsReducer
});
