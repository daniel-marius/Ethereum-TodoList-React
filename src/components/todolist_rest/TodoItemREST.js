import React from 'react';
import { Link } from 'react-router-dom';

class TodoItemREST extends React.Component {

  render() {
    const { userId, id, title, completed, completeTodo, delTodo } = this.props;
    const customStyle = {
      textDecoration: completed ? 'line-through': 'none'
    };
    return (
      <tr style={ customStyle }>
        <td>{ userId }</td>
        <td>{ id }</td>
        <td>{ title }</td>
        <td>{ completed ? 'True' : 'False' }</td>
        <td>
          <p>
          <label>
            <input
              type="checkbox"
              defaultChecked={completed}
              onChange={() => completeTodo(parseInt(id))}
            />
            <span>{ completed ? 'Checked' : 'Check' }</span>
          </label>
          </p>
        </td>
        <td>
          <button
            className="btn waves-effect waves-light red"
            onClick={() => delTodo( id )}
          >
          Delete Todo
          </button>
        </td>
        <td>{ completed ? '' : <Link to={`/todolist/rest/${id}` }>Add to Blockchain</Link>}</td>
      </tr>
    );
  }
};

export default TodoItemREST;
