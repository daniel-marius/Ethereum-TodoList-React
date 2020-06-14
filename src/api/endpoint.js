import axios from 'axios';

export default axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/todos',
  headers: {
    'Content-Type': 'application/json'
  }
});
