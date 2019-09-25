import React from 'react';
import PropTypes from 'prop-types';
import "./TodoItem.scss"

export const TodoItem = ({ todoItem, handleDelete, handleCompleteToggle }) => (
    <div className={`todo-item ${todoItem.completed ? 'todo-item--completed' : ''}`}>
        <button className="todo-item__toggle" onClick={handleCompleteToggle}>✓</button>
        {todoItem.name}
        <button className="todo-item__delete" onClick={handleDelete}>✕</button>
    </div>
)

TodoItem.propTypes = {
    todoItem: PropTypes.exact({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        date: PropTypes.number.isRequired,
        listId: PropTypes.number.isRequired,
        completed: PropTypes.bool.isRequired,
    }),
    handleDelete: PropTypes.func.isRequired,
    handleCompleteToggle: PropTypes.func.isRequired,
}