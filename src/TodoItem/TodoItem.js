import React from './../../node_modules/react';
import "./TodoItem.scss"

export const TodoItem = ({ todoItem, handleDelete, handleComplete, handleUpdate }) => (
    <div className={todoItem.completed ? 'todo-item--completed' : 'todo-item'}>
        <button onClick={handleComplete}>V</button>
        {/* <span onClick={handleUpdate}>{todoItem.name}</span> */}
        <span>{todoItem.name}</span>
        <button onClick={handleDelete}>x</button>
    </div>
)