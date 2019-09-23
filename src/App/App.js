import React, { PureComponent } from '../../node_modules/react';
import { TodoList } from '../TodoList/TodoList';
import { TodoInput } from '../TodoInput/TodoInput';
import { TodoControls } from '../TodoControls/TodoControls';
import logo from './../logo.svg';
import './App.scss';
import axios from '../../node_modules/axios';

// export default function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      todoArray: [],
      listId: 1
    };
  }

  componentDidMount() {
    this.getAllTodos();
  }

  getAllTodos = () => {
    axios.get('http://localhost:3334/todo/')
      .then(response => {
        console.log(response.data);
        this.setState({
          todoArray: response.data.sort((t1, t2) => t1.date - t2.date)
        })
      })
      .catch(e => this.handleError(e));
  }

  handleDelete = (todoItem) => () => {
    console.log('handleDelete', todoItem)
    axios.delete(`http://localhost:3334/todo/${todoItem.id}`)
      .then(data => this.setState(({ todoArray }) => ({ todoArray: todoArray.filter(ti => ti.id !== todoItem.id) })))
      .catch(e => this.handleError(e));
  }

  handleUpdate = (todoItem) => () => {
    console.log(todoItem);
    this.doUpdate(todoItem);
  }

  doUpdate = (todoItem) => {
    axios.patch(`http://localhost:3334/todo/${todoItem.id}`, todoItem)
      .then(response => this.setState(prevState => {
        return {
          todoArray: [...prevState.todoArray], //push new element updates
        }
      }))
      .catch(e => this.handleError(e))
  }

  handleComplete = (todoItem) => () => {
    todoItem.completed = !todoItem.completed;
    this.doUpdate(todoItem);
  }

  handleError = (e) => {
    console.log(`BREDOR MLYA NU BREDOR TEXTY PISHET NAM NIXTO ${e}`)
  }

  addNewTodo = (value) => {
    const newTodo = {
      name: value,
      date: Date.now(),
      listId: this.state.listId
    }
    return axios.post('http://localhost:3334/todo/', newTodo)
      .then(response => {
        this.setState((prevState) => (
          {
            todoArray: [...prevState.todoArray, response.data]
          }
        ))
      })
      .catch(e => this.handleError(e));
  }

  setAll = (param) => () => {
    this.state.todoArray.forEach(todoItem => {
      todoItem.completed = param;
      this.doUpdate(todoItem);
    });
  }

  getInputValue = (value) => {
    this.setState({ inputValue: value });
    console.log('inputValue = ', this.state.inputValue)
  }

  render() {
    // return todoArray.length && this.todoArray.map(t )
    return (
      <div>
        <img width="75" src={logo} />
        <TodoInput
          // getInputValue={this.getInputValue}
          addNewTodo={this.addNewTodo}
        // handleInputChange={this.handleInputChange}
        />

        <TodoList
          handleDelete={this.handleDelete}
          handleComplete={this.handleComplete}
          handleUpdate={this.handleUpdate}
          todoArray={this.state.todoArray}
        />
        <TodoControls todoArray={this.state.todoArray} />
        <span onClick={this.setAll(true)}>>SET ALL ACTIVE</span>
        <br />
        <span onClick={this.setAll(false)}>>SET ALL INACTIVE</span>
      </div>
    )
  }
};

//TODO: add prop types
