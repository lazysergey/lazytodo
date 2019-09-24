import React from 'react';
import "./TodoItem.scss"

export const TodoItem = ({ todoItem, handleDelete, handleCompleteToggle }) => (
    <div className={`todo-item ${todoItem.completed ? 'todo-item--completed' : ''}`}>
        <button className="todo-item__toggle" onClick={handleCompleteToggle}>✓</button>
        {todoItem.name}
        <button className="todo-item__delete" onClick={handleDelete}>✕</button>
    </div>
)