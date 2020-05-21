import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { loadBlockchainData, completeTask } from '../../actions';
import TodoItem from './TodoItem';
import web3 from '../../ethereum/web3';
import Spinner from '../utils/Spinner';
import { customStyle, customStyle2 } from '../utils/style';

class TodoList extends React.Component {
  componentDidMount() {
    this.props.loadBlockchainData();
  }

  renderTodoList() {
    // return this.props.tasks.map(task => {
    //   return task.content ? (
    //     <div className="card darken-1" key={task.id}>
    //       <div className="card-content">
    //         <span className="card-title">{task.content}</span>
    //       </div>
    //       <div className="card-action">
    //         <p>Completed: {task.completed ? 'True' : 'False'}</p>
    //       </div>
    //     </div>
    //   ) : null;
    // });
    const { tasks } = this.props;
    if (tasks) {
      return tasks.map(task => {
        return (
          <TodoItem
            key={parseInt(web3.utils.hexToNumber(task.id._hex))}
            id={parseInt(web3.utils.hexToNumber(task.id._hex))}
            content={task.content}
            completed={task.completed}
            completeTask={this.props.completeTask}
          />
        );
      });
    } else {
      return (
        <Spinner />
      );
    }
  }

  render() {
    return (
      <div style={ customStyle }>
        <h1>
          Ethereum Blockchain TodoList!
        </h1>
        <table className="responsive-table highlight striped centered" style={ customStyle2 }>
          <thead>
            <tr>
              <th>ID</th>
              <th>Content</th>
              <th>Completed</th>
              <th>Checkbox</th>
            </tr>
          </thead>
          <tbody>
            { this.renderTodoList() }
          </tbody>
        </table>
        <div className="fixed-action-btn">
          <Link to="/todolist/chain/new" className="btn-floating btn-large red">
            <i className="material-icons">add</i>
          </Link>
        </div>
      </div>
    );
  };
}

const mapStateToProps = ({ tasks }) => {
  return { tasks: Object.values(tasks) };
}

export default connect(mapStateToProps, { loadBlockchainData, completeTask })(TodoList);
