import web3 from './web3';
import TodoList from './abis/TodoList.json';

const networkID = 5777;
const contractABI = TodoList.abi;
const contractAddress = TodoList.networks[networkID].address;

// Create an instance of the contract
const instance = new web3.eth.Contract(contractABI, contractAddress);

export default instance;
