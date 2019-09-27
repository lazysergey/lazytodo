import { TodoItem } from './../TodoItem/TodoItem';
import PropTypes from 'prop-types';
import React from 'react';
import './TodoList.scss';

export const TodoList = ({ todos, handleDelete, handleCompleteToggle, handleEdit }) => {
    if (!todos.length) {
        return <div className="todo-list--empty">Nothing here yet...</div>;
    }
    return (
        <div className="todo-list">
            {
                todos.map((todoItem) =>
                    <TodoItem
                        key={todoItem.id}
                        todoItem={todoItem}
                        handleEdit={handleEdit}
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
    ).isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleCompleteToggle: PropTypes.func.isRequired,
    loaded: PropTypes.bool
}