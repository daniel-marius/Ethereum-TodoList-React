import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import { loadTodo, createTask } from '../../actions';
import TaskForm from '../todolist_chain/TaskForm';

class EditTodo extends React.Component {
  state = {
    prevUrl: ''
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.loadTodo(id);
    // Compute the prevUrl by removing the last / and everything after it
    const prevUrl = this.props.history.location.pathname.split(`/${id}`)[0];
    this.setState({ prevUrl });
  }

  onSubmit = (values) => {
    this.props.createTask(values);
  };

  render() {
    return (
      <div>
        <h3>Add REST Todo to Blockchain</h3>
        <TaskForm
          initialValues={_.pick(this.props.restTodo, 'title')}
          onSubmit={this.onSubmit}
          prevUrl={this.state.prevUrl}
        />
      </div>
    );
  };
}

const mapStateToProps = (state, ownProps) => {
  return { restTodo: state.restTodos[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { loadTodo, createTask })(EditTodo);
