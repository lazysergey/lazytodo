import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TodoList } from '../TodoList/TodoList';
import { TodoInput } from '../TodoInput/TodoInput';
import { TodoControls } from '../TodoControls/TodoControls';
import { ProgressIndicator } from '../ProgressIndicator/ProgressIndicator';
import { TodoError } from '../TodoError/TodoError';
import { TodoLogo } from '../TodoLogo/TodoLogo';
import { http } from './httpService';
import './TodoApp.scss';
import { FILTER_OPTIONS } from './constants';

export class TodoApp extends Component {
  state = {
    todos: this.props.todos,
    todosInitial: this.props.todos,
    filteredBy: FILTER_OPTIONS.All
  }

  static propTypes = {
    todos: PropTypes.arrayOf(
      PropTypes.exact({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        date: PropTypes.number.isRequired,
        completed: PropTypes.bool.isRequired,
      })
    )
  }

  static async getInitialProps() {
    return http.getAll()
      .then(todos => ({ todos: todos.sort((t1, t2) => t1.date - t2.date) }));
  }

  handleDelete = (todoItem) => () => {
    http.deleteItem(todoItem)
      .then(data => {
        this.setState(({ todos }) => ({
          todosInitial: todos.filter(ti => ti.id !== todoItem.id)
        }), this.doFiltering);
      })
      .catch(e => this.httpHandleError(e));
  }

  handleCompleteToggle = (todoItem) => () => {
    todoItem.completed = !todoItem.completed;
    return http.patchItem(todoItem)
      .then(updatedTodoItem => {
        this.setState(({ todosInitial }) => ({
          todosInitial: todosInitial.map(todoItem =>
            todoItem.id === updatedTodoItem.id
              ? updatedTodoItem
              : todoItem)
        }), this.doFiltering)
      });
  }

  doFiltering = () => {
    switch (this.state.filteredBy) {
      case FILTER_OPTIONS.All: {
        return this.handleFilterReset();
      }
      case FILTER_OPTIONS.Completed: {
        return this.handleFilterByCompleted();
      }
      case FILTER_OPTIONS.Incomplete: {
        return this.handleFilterByIncomplete();
      }
      default: {
        return null;
      }
    }
  }

  httpHandleError = (error) => {
    this.setState({ hasError: error })
  }

  addNewTodo = (value) => {
    return http.addItem({
      name: value,
      date: Date.now(),
      completed: false
    }).then(({ data: newTodo }) => {
      this.setState(({ todosInitial }) => ({
        todosInitial: [...todosInitial, newTodo]
      }), this.doFiltering)
    })
      .catch(e => this.httpHandleError(e));
  }

  handleFilterReset = () => {
    this.setState(({ todosInitial }) => ({
      todos: [...todosInitial],
      filteredBy: FILTER_OPTIONS.All
    }));
  }

  setAllCompleted = (isCompleted) => () => {
    Promise.all(
      this.state.todosInitial.map(todoItem => http.patchItem({
        ...todoItem,
        completed: isCompleted
      })))
      .then(
        newtodos => {
          this.setState({
            todosInitial: newtodos
          }, this.doFiltering)
        }
      )
  }

  handleFilterByCompleted = () => {
    this.setState(({ todosInitial }) => ({
      todos: todosInitial.filter(todo => todo.completed),
      filteredBy: FILTER_OPTIONS.Completed
    }))
  }

  handleFilterByIncomplete = () => {
    this.setState(({ todosInitial }) => ({
      todos: todosInitial.filter(todo => !todo.completed),
      filteredBy: FILTER_OPTIONS.Incomplete
    }))
  }

  render() {
    const { todos, todosInitial, filteredBy } = this.state;
    return (
      <div className="todo-react-app">
        {this.state.hasError ? <TodoError hasError={this.state.hasError} /> : ''}
        <div className="todo-react-app__header">
          <TodoLogo todos={this.state.todos} />
        </div>
        <TodoInput
          addNewTodo={this.addNewTodo}
        />
        <TodoList
          handleDelete={this.handleDelete}
          handleCompleteToggle={this.handleCompleteToggle}
          todos={todos}
          todosInitial={todosInitial}
        />
        <div className="todo-react-app__controls">
          <TodoControls
            todos={todos}
            filteredBy={filteredBy}
            handleShowAll={this.handleFilterReset}
            handleShowCompleted={this.handleFilterByCompleted}
            handleShowIncomplete={this.handleFilterByIncomplete}
            setAllCompleted={this.setAllCompleted}
          />
        </div>
        <div className="todo-react-app__footer">
          <ProgressIndicator
            todosInitial={todosInitial}
          />
        </div>
      </div>
    )
  }
};
