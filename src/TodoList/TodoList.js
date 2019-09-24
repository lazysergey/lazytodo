import { TodoItem } from './../TodoItem/TodoItem';
import React from 'react';

export const TodoList = ({ todoArray, handleDelete, handleCompleteToggle }) => {
    if (!todoArray.length) {
        return <div>Loading...</div>;
    }
    return <div className="todo-list">
        {
            todoArray.map((todoItem) =>
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