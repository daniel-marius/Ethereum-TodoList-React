import React from 'react';

class TodoItem extends React.Component {
  render() {
    const { id, content, completed, completeTask } = this.props;
    const customStyle = {
      textDecoration: completed ? 'line-through': 'none'
    };

    return (
      <tr style={ customStyle }>
        <td>{ id }</td>
        <td>{ content}</td>
        <td>{ completed ? 'True' : 'False' }</td>
        <td>
          <p>
          <label>
            <input
              type="checkbox"
              defaultChecked={completed}
              onChange={() => completeTask(parseInt(id))}
            />
            <span>{ completed ? 'Checked' : 'Check' }</span>
          </label>
          </p>
        </td>
      </tr>
    );
  };
}

export default TodoItem;
