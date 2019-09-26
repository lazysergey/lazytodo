import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TodoList } from '../TodoList/TodoList';
import { TodoInput } from '../TodoInput/TodoInput';
import { TodoControls } from '../TodoControls/TodoControls';
import { ProgressIndicator } from '../ProgressIndicator/ProgressIndicator';
import './TodoApp.scss';
import { TodoError } from '../TodoError/TodoError';
import { TodoLogo } from '../TodoLogo/TodoLogo';
import { http } from './httpService';

export class TodoApp extends Component {
  state = {
    todos: this.props.todos,
    todosInitial: this.props.todos,
    filteredBy: 'all'
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
        }), this.cloneInitialTodosToState);
      })
      .catch(e => this.httpHandleError(e));
  }

  handleCompleteToggle = (todoItem) => () => {
    todoItem.completed = !todoItem.completed;
    return http.patchItem(todoItem)
      .then(updatedTodoItem => {
        this.setState(({ todos }) => ({ todosInitial: todos.map(todoItem => todoItem.id === updatedTodoItem.id ? updatedTodoItem : todoItem) }), this.cloneInitialTodosToState)
      });
  }

  httpHandleError = (error) => {
    this.setState({ hasError: error })
  }

  addNewTodo = (value) => {
    return http.addItem({
      name: value,
      date: Date.now(),
      completed: false
    })
      .then(({ data: newTodo }) => {
        this.setState(({ todosInitial }) => ({
          todosInitial: [...todosInitial, newTodo]
        }), this.cloneInitialTodosToState)
      })
      .catch(e => this.httpHandleError(e));
  }

  cloneInitialTodosToState = () => {
    this.setState(({ todosInitial }) => ({
      todos: [...todosInitial],
      filteredBy: 'all'
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
          }, this.cloneInitialTodosToState)
        }
      )
  }

  handleShowCompleted = () => {
    this.setState(({ todosInitial }) => ({
      todos: todosInitial.filter(todo => todo.completed),
      filteredBy: 'completed'
    }))
  }

  handleShowIncomplete = () => {
    this.setState(({ todosInitial }) => ({
      todos: todosInitial.filter(todo => !todo.completed),
      filteredBy: 'incomplete'
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
            handleShowAll={this.cloneInitialTodosToState}
            handleShowCompleted={this.handleShowCompleted}
            handleShowIncomplete={this.handleShowIncomplete}
            setAllCompleted={this.setAllCompleted}
          />
        </div>
        <div className="todo-react-app__footer">
          <ProgressIndicator
            todos={todos}
          />
        </div>
      </div>
    )
  }
};
