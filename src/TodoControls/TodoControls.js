import React from 'react';

export const TodoControls = ({ handleShowAll, handleShowCompleted, handleShowIncomplete, setAllCompleted }) => <div className="d-flex justify-content-center">
    <button onClick={handleShowAll}>all</button>
    <button onClick={handleShowCompleted}>completed</button>
    <button onClick={handleShowIncomplete}>incomplete</button>
    <button onClick={setAllCompleted(true)}>compl</button>
    <button onClick={setAllCompleted(false)}>incompl</button>
</div>