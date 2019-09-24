import { TodoItem } from './../TodoItem/TodoItem';
import React from 'react';

export const TodoList = ({ todos, handleDelete, handleCompleteToggle }) => {
    if (!todos.length) {
        return <div>Loading...</div>;
    }
    return <div className="todo-list">
        {
            todos.map((todoItem) =>
                <TodoItem
                    key={todoItem.id}
                    todoItem={todoItem}
                    handleDelete={handleDelete(todoItem)}
                    handleCompleteToggle={handleCompleteToggle(todoItem)}
                />
            )
        }
    </div>

}