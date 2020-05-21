import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import Header from './layout/Header';
import MiddlePage from './MiddlePage';
import TodoList from './todolist_chain/TodoList';
import BlockExplorer from './BlockExplorer';
import AddTodo from './todolist_chain/AddTodo';
import TodoListREST from './todolist_rest/TodoListREST';
import AddTodoREST from './todolist_rest/AddTodoREST';
import IPFSUpload from './ipfs_upload/IPFSUpload';

import history from '../history';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Router history={ history }>
          <div>
            <Header />
            <Switch>
              <Route exact path="/" component={ MiddlePage } />
              <Route exact path="/todolist/rest" component={ TodoListREST } />
              <Route exact path="/todolist/chain" component={ TodoList } />
              <Route exact path="/blockexplorer" component={ BlockExplorer } />
              <Route exact path="/todolist/chain/new" component={ AddTodo } />
              <Route exact path="/todolist/rest/:id" component={ AddTodoREST } />
              <Route exact path="/ipfs/upload" component={ IPFSUpload } />
            </Switch>
          </div>
        </Router>
      </div>
    );
  };
}

export default App;
