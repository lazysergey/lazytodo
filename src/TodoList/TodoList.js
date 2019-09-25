import { TodoItem } from './../TodoItem/TodoItem';
import PropTypes from 'prop-types';
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

TodoList.propTypes = {
    todos: PropTypes.arrayOf(
        PropTypes.exact({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            date: PropTypes.number.isRequired,
            completed: PropTypes.bool.isRequired,
        })
    ),
    handleDelete: PropTypes.func.isRequired,
    handleCompleteToggle: PropTypes.func.isRequired,
    loaded: PropTypes.bool
}