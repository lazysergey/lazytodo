import React from 'react';
import PropTypes from 'prop-types';
import './TodoControls.scss';
import { FILTER_OPTIONS } from '../TodoApp/constants';

export const TodoControls = ({ handleShowAll, handleShowCompleted, handleShowIncomplete, setAllCompleted, filteredBy }) => (
    <div className="todo-controls d-flex justify-content-center">
        <button
            className={filteredBy === FILTER_OPTIONS.All ? 'active' : null}
            onClick={handleShowAll}>
            all
        </button>
        <button
            className={filteredBy === FILTER_OPTIONS.Completed ? 'active' : null}
            onClick={handleShowCompleted}>
            done
        </button>
        <button
            className={filteredBy === FILTER_OPTIONS.Incomplete ? 'active' : null}
            onClick={handleShowIncomplete}>
            incomplete
        </button>
        <button onClick={setAllCompleted(true)}>
            set all done
        </button>
        <button onClick={setAllCompleted(false)}>
            set all incomplete
        </button>
    </div>
)

TodoControls.propTypes = {
    filteredBy: PropTypes.oneOf(Object.keys(FILTER_OPTIONS).map(key => FILTER_OPTIONS[key])),
    handleShowAll: PropTypes.func.isRequired,
    handleShowCompleted: PropTypes.func.isRequired,
    handleShowIncomplete: PropTypes.func.isRequired,
    setAllCompleted: PropTypes.func.isRequired
}