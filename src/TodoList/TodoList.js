import { TodoItem } from './../TodoItem/TodoItem';
import React, { PureComponent } from './../../node_modules/react';

export class TodoList extends PureComponent {

    // constructor(props) {
    //     super(props);
    // }

    render() {
        // this.setState({todoArray: {...this.state.todoArray}.map(t => t.active = true)})
        if (!this.props.todoArray.length) {
            return <div>Loading...</div>;
        }
        return this.props.todoArray.map((todoItem) =>
            <TodoItem
                key={todoItem.id}
                todoItem={todoItem}
                handleDelete={this.props.handleDelete(todoItem)}
                handleComplete={this.props.handleComplete(todoItem)}
                handleUpdate={this.props.handleUpdate(todoItem)}
                // handleComplete={() => { this.props.handleComplete(todoItem) }}
            />
        )//TODO: define prop types
    }

}