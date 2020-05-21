import axios from 'axios';

import {
  USER_ACCOUNT,
  USER_ACCOUNT_BALANCE,
  CONTRACT_ACCOUNT,
  CONTRACT_ACCOUNT_BALANCE,
  BLOCKCHAIN_ITEMS,
  CREATE_ITEM,
  EDIT_ITEM,
  GAS_PRICE,
  LATEST_BLOCK,
  LATEST_BLOCKS,
  REST_TODOS,
  REST_TODO,
  COMPLETE_REST_TODO,
  DELETE_REST_TODO,
  IPFS_UPLOAD,
  ERROR
} from './types';
import ipfs from '../ipfs/ipfs';
import web3 from '../ethereum/web3';
import todolist from '../ethereum/todolist';
import history from '../history';

export const loadUserAccounts = () => async dispatch => {
  try {
    const accounts = await web3.eth.getAccounts();
    dispatch({ type: USER_ACCOUNT, payload: accounts });
  } catch (error) {
    dispatch({ type: ERROR, payload: error });
  }
};

export const loadUserAccountsBalances = () => async dispatch => {
  try {
    const accounts = await web3.eth.getAccounts();
    const balances = await Promise.all(
      Array.from({ length: accounts.length })
      .map((element, index) => {
        return web3.eth.getBalance(accounts[index])
      })
    );
    dispatch({ type: USER_ACCOUNT_BALANCE, payload: balances });
  } catch (error) {
    dispatch({ type: ERROR, payload: error });
  }
};

export const loadContractAccount = () => {
  return {
    type: CONTRACT_ACCOUNT,
    payload: todolist.address
  };
};

export const loadContractAccountBalance = () => async dispatch => {
  try {
    const balance = await web3.eth.getBalance(todolist.address);
    dispatch({ type: CONTRACT_ACCOUNT_BALANCE, payload: balance });
  } catch (error) {
    dispatch({ type: ERROR, payload: error });
  }
};

export const loadBlockchainData = () => async dispatch => {
  try {
    const getTaskCount = await todolist.methods.getTaskCount().call();
    const tasks = await Promise.all(
      Array.from({ length: parseInt(web3.utils.hexToNumber(getTaskCount._hex)) + 1 })
      .map((element, index) => {
        return todolist.methods.tasks(index).call()
      })
    );
    dispatch({ type: BLOCKCHAIN_ITEMS, payload: tasks });
  } catch (error) {
    dispatch({ type: ERROR, payload: error });
  }
};

export const loadGasPrice = () => async dispatch => {
  try {
    const gasPrice = await web3.eth.getGasPrice();
    dispatch({ type: GAS_PRICE, payload: gasPrice });
  } catch (error) {
    dispatch({ type: ERROR, payload: error });
  }
};

export const loadLatestBlock = () => async dispatch => {
  try {
    const latestBlock = await web3.eth.getBlock('latest');
    dispatch({ type: LATEST_BLOCK, payload: latestBlock });
  } catch (error) {
    dispatch({ type: ERROR, payload: error });
  }
};

export const loadLatestBlocks = () => async dispatch => {
  try {
    const customSize = 10;
    const latestBlock = await web3.eth.getBlock('latest');
    const latestBlocks = await Promise.all(
      Array.from({ length: customSize })
      .map((element, index) => {
          return web3.eth.getBlock(latestBlock.number - index)
        }
      )
    );
    dispatch({ type: LATEST_BLOCKS, payload: latestBlocks });
  } catch (error) {
    dispatch({ type: ERROR, payload: error });
  }
};

export const createTask = (values) => async dispatch => {
  try {
    const convertedValues = values.title.toString();
    const accounts = await web3.eth.getAccounts();
    await todolist.methods.createTask(convertedValues).send({ from: accounts[0] });
    history.push('/todolist/chain');
    dispatch({ type: CREATE_ITEM, payload: convertedValues });
  } catch (error) {
    dispatch({ type: ERROR, payload: error });
  }
};

export const completeTask = (id) => async dispatch => {
  try {
    const accounts = await web3.eth.getAccounts();
    // const uint256ID = await web3.eth.abi.encodeParameter('uint256', id);
    await todolist.methods.completeTask(id).send({ from: accounts[0] });
    history.push('/todolist/chain');
    dispatch({ type: EDIT_ITEM, payload: id });
  } catch (error) {
    dispatch({ type: ERROR, payload: error });
  }
};

export const loadTodos = () => async dispatch => {
  try {
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    };
    const res = await axios.get('https://jsonplaceholder.typicode.com/todos', config);
    dispatch({ type: REST_TODOS, payload: res.data });
  } catch (error) {
    dispatch({ type: ERROR, payload: error });
  }
};

export const loadTodo = (id) => async dispatch => {
  try {
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    };
    const res = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`, config);
    dispatch({ type: REST_TODO, payload: res.data });
  } catch (error) {
    dispatch({ type: ERROR, payload: error });
  }
};

export const completeTodo = (id) => async dispatch => {
  try {
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    };
    const res = await axios.get('https://jsonplaceholder.typicode.com/todos', config);
    res.data.forEach(item => {
      if (item.id === id) {
        item.completed = !item.completed
      }
      return item;
    });
    history.push('/todolist/rest');
    dispatch({ type: COMPLETE_REST_TODO, payload: res.data });
  } catch (error) {
    dispatch({ type: ERROR, payload: error });
  }
};

export const delTodo = (id) => async dispatch => {
  try {
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    };
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`, config);
    history.push('/todolist/rest');
    dispatch({ type: DELETE_REST_TODO, payload: id });
  } catch (error) {
    dispatch({ type: ERROR, payload: error });
  }
};

export const ipfsFileUpload = (file) => async dispatch => {
  try {
    const accounts = await web3.eth.getAccounts();
    let fileHash = null;
    for await (const result of ipfs.add(file)) {
      fileHash = result.path;
    }
    await todolist.methods.setHash(fileHash).send({ from: accounts[0] });
    dispatch({ type: IPFS_UPLOAD, payload: fileHash });
  } catch (error) {
    dispatch({ type: ERROR, payload: error });
  }
};
