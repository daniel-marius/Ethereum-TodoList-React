import React from 'react';
import { connect } from 'react-redux';

import { createTask } from '../../actions';
import TaskForm from './TaskForm';

class AddTodo extends React.Component {
  state = {
    prevUrl: ''
  };

  componentDidMount() {
    const currentUrl = this.props.history.location.pathname;
    const splitURL = currentUrl.split('/');

    // Number of slashes in the url
    // console.log((currentUrl.split('/').length - 1) - (currentUrl[currentUrl.length - 1] === '/' ? 1 : 0));

    // Compute the prevUrl by removing the last / and everything after it
    const prevUrl = currentUrl.split('/' + splitURL[splitURL.length - 1])[0];
    this.setState({ prevUrl });
  }

  onSubmit = (values) => {
    this.props.createTask(values);
  };

  render() {
    return (
      <div>
        <h4>Create a Task</h4>
        <TaskForm onSubmit={ this.onSubmit } prevUrl={ this.state.prevUrl } />
      </div>
    );
  };
}

export default connect(null, { createTask })(AddTodo);
