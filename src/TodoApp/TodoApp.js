import React, { Component } from 'react';
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
    todos: [],
    todosInitial: [],
    listId: 1,
  }

  componentDidMount() {
    http.getAll()
      .then(todos => {
        this.setState({
          todosInitial: todos.sort((t1, t2) => t1.date - t2.date)
        }, this.cloneInitialTodosToState)
      })
      .catch(e => this.httpHandleError(e));
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
      listId: this.state.listId,
      completed: false
    })
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
      this.state.todos.map(todoItem => http.patchItem({
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
      todos: todosInitial.filter(todo => todo.completed)
    }))
  }

  handleShowIncomplete = () => {
    this.setState(({ todosInitial }) => ({
      todos: todosInitial.filter(todo => !todo.completed)
    }))
  }

  render() {
    const { todos, todosInitial: { length: todosInitialLength } } = this.state;
    return (
      <div className="todo-react-app">
        {this.state.hasError ? <TodoError hasError={this.state.hasError} /> : ''}
        <a href="https://www.npmjs.com/package/json-server" className="todo-react-app__delay-info">api_delay: <strong>1100ms</strong></a>
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
          loaded={!!todosInitialLength}
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
