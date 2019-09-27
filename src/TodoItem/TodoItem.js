import React, { useState } from 'react';
import PropTypes from 'prop-types';
import "./TodoItem.scss"

export const TodoItem = ({ todoItem, handleDelete, handleCompleteToggle, handleEdit }) => {
    const [isEditable, setEditable] = useState(false);
    const [inputValue, setInputValue] = useState(todoItem.name);
    const hiddenIconForCopiedText = <span className="todo-item__hidden-copy-icon">{todoItem.completed ? '[x]' : '[ ]'}&nbsp;</span>;
    const textEl = <span>{hiddenIconForCopiedText}{todoItem.name}</span>;
    const input = <input spellCheck="false" autoFocus type='text' value={inputValue} onChange={(e) => { setInputValue(e.target.value) }} />;
    const handleDoubleClick = () => {
        setEditable(true);
        window.getSelection().empty();
    };
    const handleUpdate = () => {
        handleEdit({ ...todoItem, name: inputValue })
            .then(newTodoItem => {
                setEditable(false);
                setInputValue(newTodoItem.name);
            })
    };

    const handleBlur = () => {
        if (!inputValue.trim() && inputValue !== todoItem.name) {
            setInputValue(todoItem.name);
            setEditable(false);
            return;
        }
        handleUpdate();
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            if (!inputValue.trim()) {
                return;
            }
            handleUpdate();
        }
        if (e.key === "Escape") {
            setInputValue(todoItem.name);
            setEditable(false);
        }
    }

    return (
        <div className={`todo-item ${todoItem.completed ? 'todo-item--completed' : ''}`}>
            <button className="todo-item__toggle"
                onClick={handleCompleteToggle}>✓</button>
            <div className="todo-item__content-container"
                onClick={handleDoubleClick}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}>
                {isEditable ? input : textEl}
            </div>
            <button className="todo-item__delete"
                onClick={handleDelete}>✕</button>
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