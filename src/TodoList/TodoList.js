import { TodoItem } from './../TodoItem/TodoItem';
import React from 'react';

export const TodoList = ({ todos, handleDelete, handleCompleteToggle, loaded }) => {
    if (!todos.length && !loaded) {
        return <div>Loading...</div>;
    }
    if (!todos.length && loaded) {
        return <div>No results...</div>;
    }
    return (
        <div className="todo-list">
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
    )

}