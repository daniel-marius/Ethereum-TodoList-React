import _ from 'lodash';
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

import TaskField from './TaskField';
import formFields from './formFields';

class TaskForm extends React.Component {
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field
          key={ name }
          component={ TaskField }
          type="text"
          label={ label }
          name={ name }
        />
      );
    });
  }

  onSubmit = (values) => {
    this.props.onSubmit(values);
    // window.location = 'http://localhost:3000/todolist/chain';
  };

  render() {
    return (
      <div>
      <form onSubmit={ this.props.handleSubmit(this.onSubmit) }>
        { this.renderFields() }
        <Link to={`${this.props.prevUrl}`} className="yellow darken-3 white-text btn-flat">Back</Link>
        <button type="submit" className="teal btn-flat right white-text">
          Submit
          <i className="material-icons right">done</i>
        </button>
      </form>
      </div>
    );
  };
}

const validate = (values) => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Enter a title!';
  }

  return errors;
};

export default reduxForm({
  validate,
  form: 'taskForm'
})(TaskForm);
