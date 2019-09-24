import axios from 'axios';
import React, { PureComponent } from 'react';
import { BASE_URL } from './constants';
import { TodoList } from '../TodoList/TodoList';
import { TodoInput } from '../TodoInput/TodoInput';
import { TodoControls } from '../TodoControls/TodoControls';
import logo from './../logo.svg';
import { ProgressIndicator } from '../ProgressIndicator/ProgressIndicator';
import './TodoApp.scss';
import { TodoError } from '../TodoError/TodoError';

export class TodoApp extends PureComponent {
  state = {
    todoArray: [],
    listId: 1,
  }

  componentDidMount() {
    this.httpGetAllTodos().then(todos => this.setState(
      {
        todoArray: todos.sort((t1, t2) => t1.date - t2.date),
      }
    ));
  }

  httpGetAllTodos = () => {
    return axios.get(`${BASE_URL}/todo/`)
      .then(({ data }) => data)
      .catch(e => this.httpHandleError(e));
  }

  handleDelete = (todoItem) => () => {
    this.httpDeleteTodoItem(todoItem)
      .then(data => this.setState(({ todoArray }) => (
        {
          todoArray: todoArray.filter(ti => ti.id !== todoItem.id)
        }
      )))
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
        this.setState({ todoArray: this.state.todoArray.map(todoItem => todoItem.id === updatedTodoItem.id ? updatedTodoItem : todoItem) })
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
        this.setState(({ todoArray }) => (
          {
            todoArray: [...todoArray, newTodo]
          }
        ))
      })
      .catch(e => this.httpHandleError(e));
  }

  setAllCompleted = (isCompleted) => () => {
    Promise.all(
      this.state.todoArray.map(todoItem => this.httpPatchTodoItem(
        {
          ...todoItem,
          completed: isCompleted
        }
      )))
      .then(
        newTodoArray => {
          this.setState({
            todoArray: newTodoArray
          })
        }
      )
  }

  handleShowAll = () => {
    this.httpGetAllTodos()
      .then(
        todos => this.setState({
          todoArray: todos
        })
      )
  }
  handleShowCompleted = () => {
    this.httpGetAllTodos()
      .then(
        todos => this.setState({
          todoArray: todos.filter(t => t.completed)
        })
      )
  }
  handleShowIncomplete = () => {
    this.httpGetAllTodos()
      .then(
        todos => this.setState({
          todoArray: todos.filter(t => !t.completed)
        })
      )
  }
  render() {
    // return todoArray.length && this.todoArray.map(t )
    const { todoArray } = this.state;

    return (
      <div className="todo-react-app">
        {this.state.hasError ? <TodoError hasError={this.state.hasError} /> : ''}
        <div className="todo-react-app__header">
          <img width="75" alt="logo" src={logo} />
        </div>
        <TodoInput
          addNewTodo={this.addNewTodo}
        />
        <TodoList
          handleDelete={this.handleDelete}
          handleUpdate={this.handleUpdate}
          handleCompleteToggle={this.handleCompleteToggle}
          todoArray={todoArray}
        />
        <div className="todo-react-app__controls">
          <TodoControls
            todoArray={todoArray}
            handleShowAll={this.handleShowAll}
            handleShowCompleted={this.handleShowCompleted}
            handleShowIncomplete={this.handleShowIncomplete}
            setAllCompleted={this.setAllCompleted}
          />
        </div>
        <div className="todo-react-app__footer">
          <ProgressIndicator
            todoArray={todoArray}
          />
        </div>

      </div>
    )
  }
};

//TODO: add prop types
