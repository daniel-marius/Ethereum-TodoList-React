import React from 'react';
import { connect } from 'react-redux';

import {
  loadTodos,
  completeTodo,
  delTodo
} from '../../actions';
import TodoItemREST from './TodoItemREST';
import Spinner from '../utils/Spinner';

import { customStyle, customStyle2 } from '../utils/style';

class TodoListREST extends React.Component {
  componentDidMount() {
    this.props.loadTodos();
  }

  renderTodoList() {
    const { restTodos } = this.props;
    if (restTodos) {
      return restTodos.map(todo => {
        return (
          <TodoItemREST
            key={todo.id}
            userId={todo.userId}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            completeTodo={this.props.completeTodo}
            delTodo={this.props.delTodo}
          />
        )
      });
    } else {
      return <Spinner />;
    }
  }

  render() {
    return (
      <div style={ customStyle }>
        <h1>
          REST TodoList!
        </h1>
        <table className="responsive-table highlight striped centered" style={ customStyle2 }>
          <thead>
            <tr>
              <th>userID</th>
              <th>ID</th>
              <th>Title</th>
              <th>Completed</th>
              <th>Checkbox</th>
              <th>Delete Todo</th>
              <th>Add to Blockchain</th>
            </tr>
          </thead>
          <tbody>
            { this.renderTodoList() }
          </tbody>
        </table>
      </div>
    );
  };
}

const mapStateToProps = ({ restTodos }) => {
  return { restTodos: Object.values(restTodos) };
};

export default connect(mapStateToProps,
  { loadTodos,
    completeTodo,
    delTodo
  })(TodoListREST);
