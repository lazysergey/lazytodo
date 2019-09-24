import axios from 'axios';
import React, { Component } from 'react';
import { BASE_URL } from './constants';
import { TodoList } from '../TodoList/TodoList';
import { TodoInput } from '../TodoInput/TodoInput';
import { TodoControls } from '../TodoControls/TodoControls';
import { ProgressIndicator } from '../ProgressIndicator/ProgressIndicator';
import './TodoApp.scss';
import { TodoError } from '../TodoError/TodoError';
import { TodoLogo } from '../TodoLogo/TodoLogo';

export class TodoApp extends Component {
  state = {
    todos: [],
    todosInitial: [],
    listId: 1,
  }

  componentDidMount() {
    this.httpGetAllTodos().then(todos => {
      this.setState({
        todosInitial: todos.sort((t1, t2) => t1.date - t2.date)
      }, this.cloneInitialTodosToState)
    });
  }

  httpGetAllTodos = () => {
    return axios.get(`${BASE_URL}/todo/`)
      .then(({ data }) => data)
      .catch(e => this.httpHandleError(e));
  }

  handleDelete = (todoItem) => () => {
    this.httpDeleteTodoItem(todoItem)
      .then(data => {
        this.setState(({ todos }) => ({
          todosInitial: todos.filter(ti => ti.id !== todoItem.id)
        }), this.cloneInitialTodosToState);
      })
      .catch(e => this.httpHandleError(e));
  }

  httpDeleteTodoItem = (todoItem) => {
    return axios.delete(`${BASE_URL}/todo/${todoItem.id}`)
      .catch(e => this.httpHandleError(e));
  }

  handleUpdate = (todoItem) => () => {
    return this.httpPatchTodoItem(todoItem);
  }

  httpPatchTodoItem = (todoItem) => {
    return axios.patch(`${BASE_URL}/todo/${todoItem.id}`, todoItem)
      .then(({ data }) => data)
      .catch(e => this.httpHandleError(e))
  }

  handleCompleteToggle = (todoItem) => () => {
    todoItem.completed = !todoItem.completed;
    return this.httpPatchTodoItem(todoItem)
      .then(updatedTodoItem => {
        this.setState(({ todos }) => ({ odosInitial: todos.map(todoItem => todoItem.id === updatedTodoItem.id ? updatedTodoItem : todoItem) }), this.cloneInitialTodosToState)
      });
  }

  httpHandleError = (error) => {
    this.setState({ hasError: error })
  }

  addNewTodo = (value) => {
    return axios.post(
      `${BASE_URL}/todo/`,
      {
        name: value,
        date: Date.now(),
        listId: this.state.listId
      }
    )
      .then(({ data: newTodo }) => {
        this.setState(({ todos }) => ({
          todosInitial: [...todos, newTodo]
        }), this.cloneInitialTodosToState)
      })
      .catch(e => this.httpHandleError(e));
  }

  cloneInitialTodosToState = () => {
    this.setState(({ todosInitial }) => ({
      todos: [...todosInitial]
    }))
  }

  setAllCompleted = (isCompleted) => () => {
    Promise.all(
      this.state.todos.map(todoItem => this.httpPatchTodoItem(
        {
          ...todoItem,
          completed: isCompleted
        }
      )))
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
      todos: todosInitial.filter(todo => todo.completed)
    }))
  }

  handleShowIncomplete = () => {
    this.setState(({ todosInitial }) => ({
      todos: todosInitial.filter(todo => !todo.completed)
    }))
  }

  render() {
    const { todos } = this.state;
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
          handleUpdate={this.handleUpdate}
          handleCompleteToggle={this.handleCompleteToggle}
          todos={todos}
        />
        <div className="todo-react-app__controls">
          <TodoControls
            todos={todos}
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

//TODO: add prop types
