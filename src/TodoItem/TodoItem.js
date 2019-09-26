import React from 'react';
import PropTypes from 'prop-types';
import "./TodoItem.scss"

export const TodoItem = ({ todoItem, handleDelete, handleCompleteToggle }) => {
    const hiddenIconForCopiedText = <span className="todo-item__hidden-copy-icon">{todoItem.completed ? '[x]':'[ ]'}&nbsp;</span>;
    return (
        <div className={`todo-item ${todoItem.completed ? 'todo-item--completed' : ''}`}>
            <button className="todo-item__toggle" onClick={handleCompleteToggle}>✓</button>
            <span>{hiddenIconForCopiedText}{todoItem.name}</span>
            <button className="todo-item__delete" onClick={handleDelete}>✕</button>
        </div>
    )
}

TodoItem.propTypes = {
    todoItem: PropTypes.exact({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        date: PropTypes.number.isRequired,
        completed: PropTypes.bool.isRequired,
    }),
    handleDelete: PropTypes.func.isRequired,
    handleCompleteToggle: PropTypes.func.isRequired,
}